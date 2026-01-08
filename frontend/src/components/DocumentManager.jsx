import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  buildDocumentUrl,
  deleteDocument,
  listDocuments,
  uploadDocument,
} from "../api/documents";

const TOKEN_KEY = "tripsync_token";

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const token = localStorage.getItem(TOKEN_KEY);

  const loadDocuments = useCallback(async () => {
    setError("");
    try {
      const docs = await listDocuments();
      setDocuments(docs);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Unable to load documents.";
      setError(message);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadDocuments();
    } else {
      setDocuments([]);
    }
  }, [token, loadDocuments]);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Choose a PDF or image to upload.");
      return;
    }

    setLoading(true);
    setStatus("");
    setError("");

    try {
      await uploadDocument(selectedFile);
      setStatus("Document uploaded successfully.");
      setSelectedFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      loadDocuments();
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Upload failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this document?")) return;
    setError("");
    try {
      await deleteDocument(id);
      loadDocuments();
    } catch (err) {
      const message =
        err?.response?.data?.message || "Unable to delete document.";
      setError(message);
    }
  };

  if (!token) {
    return (
      <div className="document-empty">
        <p>Sign in to upload and view your travel documents.</p>
      </div>
    );
  }

  return (
    <div className="document-grid">
      <div className="document-upload">
        <div className="panel-header">
          <h3>Upload</h3>
          <p>Accepted: PDF, JPG, PNG. Max 10 MB.</p>
        </div>

        <form className="document-form" onSubmit={handleUpload}>
          <label className="document-drop">
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <div>
              <strong>Choose a file</strong>
              <p>
                {selectedFile
                  ? selectedFile.name
                  : "Drag or pick a passport, visa, ticket, or PDF."}
              </p>
            </div>
          </label>

          <button className="tool-button" type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload document"}
          </button>
        </form>

        {status && <p className="document-status success">{status}</p>}
        {error && <p className="document-status error">{error}</p>}
      </div>

      <div className="document-list">
        <div className="panel-header">
          <h3>Stored documents</h3>
          <p>Only you can access files linked to your account.</p>
        </div>

        {documents.length === 0 ? (
          <p className="document-empty">No documents uploaded yet.</p>
        ) : (
          <div className="document-items">
            {documents.map((doc) => (
              <div className="document-item" key={doc._id}>
                <div>
                  <strong>{doc.originalName}</strong>
                  <div className="document-meta">
                    <span>{formatBytes(doc.size)}</span>
                    <span>
                      {new Date(doc.uploadedAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
                <div className="document-actions">
                  <a
                    href={buildDocumentUrl(doc.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                  >
                    Open
                  </a>
                  <button
                    type="button"
                    className="btn-ghost danger"
                    onClick={() => handleDelete(doc._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentManager;
