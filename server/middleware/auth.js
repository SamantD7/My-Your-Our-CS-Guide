import { getAuth } from '@clerk/express';

export const protect = (req, res, next) => {
  try {
    const auth = getAuth(req);
    if (!auth || !auth.userId) {
      return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
    req.user = { id: auth.userId };
    req.auth = auth;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token verification failed' });
  }
};
