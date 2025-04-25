const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware to protect routes using JWT and optional role-based access.
 * @param {Array} roles - Array of allowed roles. If empty, allows all.
 */
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or invalid format.' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Role-based access control
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: Insufficient role permissions.' });
      }

      req.user = decoded; // Attach decoded token to request object
      next(); // Proceed to next middleware/route

    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  };
};

module.exports = authMiddleware;
