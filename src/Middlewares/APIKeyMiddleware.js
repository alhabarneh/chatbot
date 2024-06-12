const validApiKeys = new Set([process.env.API_KEY]);

module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || !validApiKeys.has(apiKey)) {
        return res.status(403).json({ error: 'Forbidden: Invalid API key' });
    }

    next();
};