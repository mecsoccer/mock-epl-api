import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Verify {
  static verifyLogin(req, res, next) {
    const { authorization } = req.headers;

    if (authorization) {
      jwt.verify(authorization.split(' ')[2], process.env.JWT_SECRET, (err, authData) => {
        if (err || !authData.user_id) {
          res.status(401).json({ error: 'invalid or expired token' });
        } else {
          req.authData = authData;
          next();
        }
      });
    } else {
      res.status(401).json({ error: 'you are not signed in' });
    }
  }

  static verifyAdmin(req, res, next) {
    const { role } = req.authData;

    if (role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Sorry, accessible to admin only' });
    }
  }
}

export default Verify;
