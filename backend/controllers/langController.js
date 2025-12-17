exports.getLanguagePack = (req, res) => {
    const { lang } = req.params;
    // In a real app, you'd save this to the database here
    res.status(200).json({
        message: `Language updated to ${lang} successfully! ✨`,
        lang: lang
    });
};