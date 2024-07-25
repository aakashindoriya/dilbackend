const validateUser = (req, res, next) => {
    const { email} = req.body;

    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ msg: 'Please provide a valid email address' });
    }

    next();
};

module.exports = validateUser;