const Trip = require('../models/Trip');
const Expense = require("../models/Expense");
const Document = require("../models/Document");
const PDFDocument = require("pdfkit");

// Create new trip
exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ startDate: 1 });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upcoming trips
exports.getUpcomingTrips = async (req, res) => {
  try {
    const today = new Date();
    const trips = await Trip.find({ startDate: { $gte: today } }).sort({ startDate: 1 });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Past trips
exports.getPastTrips = async (req, res) => {
  try {
    const today = new Date();
    const trips = await Trip.find({ endDate: { $lt: today } }).sort({ endDate: -1 });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a trip
exports.updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -----------------------------
// FR-3: Duplicate Trip
// -----------------------------
exports.duplicateTrip = async (req, res) => {
  try {
    const { id } = req.params;

    // Find original trip
    const originalTrip = await Trip.findById(id);
    if (!originalTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Create a new trip with copied fields
    const duplicatedTrip = new Trip({
      title: originalTrip.title + ' (Copy)',
      destination: originalTrip.destination,
      startDate: originalTrip.startDate,
      endDate: originalTrip.endDate,
      budget: originalTrip.budget,
      notes: originalTrip.notes,
      preferences: originalTrip.preferences,
      createdAt: new Date(),
    });

    await duplicatedTrip.save();

    res.status(201).json({
      message: 'Trip duplicated successfully',
      trip: duplicatedTrip,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error duplicating trip', error });
  }
};

// Export trip report as PDF (itinerary + budget summary + documents)
exports.exportTripReport = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Pull expenses linked to the trip and documents for the signed-in user
    const [expenses, documents] = await Promise.all([
      Expense.find({ tripId: id }),
      Document.find({ user: req.userId }).sort({ uploadedAt: -1 }),
    ]);

    const totalExpenses = expenses.reduce(
      (sum, exp) => sum + (Number(exp.amount) || 0),
      0
    );
    const budget = Number(trip.budget) || 0;
    const balance = budget - totalExpenses;

    const formatDate = (value) => {
      if (!value) return "N/A";
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? "N/A" : d.toDateString();
    };

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${(trip.title || "trip").replace(/"/g, "")}-report.pdf"`
    );

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Header
    doc.fontSize(20).text("Trip Report", { align: "center" });
    doc.moveDown();

    // Itinerary
    doc.fontSize(14).text("Itinerary", { underline: true });
    doc.moveDown(0.4);
    doc
      .fontSize(12)
      .text(`Title: ${trip.title || "-"}`)
      .text(`Destination: ${trip.destination || "-"}`)
      .text(`Dates: ${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`)
      .text(`Notes: ${trip.notes || "N/A"}`);
    doc.moveDown();

    // Budget summary
    doc.fontSize(14).text("Budget Summary", { underline: true });
    doc.moveDown(0.4);
    doc
      .fontSize(12)
      .text(`Budget: $${budget.toFixed(2)}`)
      .text(`Expenses: $${totalExpenses.toFixed(2)}`)
      .text(`Remaining: $${balance.toFixed(2)}`);

    const categoryTotals = expenses.reduce((acc, exp) => {
      const key = exp.category || "Uncategorized";
      acc[key] = (acc[key] || 0) + (Number(exp.amount) || 0);
      return acc;
    }, {});

    if (Object.keys(categoryTotals).length) {
      doc.moveDown(0.3);
      doc.text("By category:");
      Object.entries(categoryTotals).forEach(([cat, amt]) => {
        doc.text(` - ${cat}: $${amt.toFixed(2)}`);
      });
    } else {
      doc.moveDown(0.3);
      doc.text("No expenses recorded.");
    }

    doc.moveDown();

    // Documents
    doc.fontSize(14).text("Documents", { underline: true });
    doc.moveDown(0.4);
    if (!documents.length) {
      doc.fontSize(12).text("No documents uploaded for this account.");
    } else {
      documents.forEach((d, idx) => {
        const sizeKb = (d.size / 1024).toFixed(1);
        doc
          .fontSize(12)
          .text(`${idx + 1}. ${d.originalName} (${sizeKb} KB) - ${d.url}`);
      });
    }

    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Unable to generate report." });
  }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    await Trip.findByIdAndDelete(id);
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
