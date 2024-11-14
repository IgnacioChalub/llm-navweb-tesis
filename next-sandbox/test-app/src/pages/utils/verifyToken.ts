import type {NextApiRequest, NextApiResponse} from 'next';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).json({error: 'No authentication token provided'});
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string); // Return decoded token data
  } catch (error) {
    res.status(401).json({error: 'Invalid or expired token'});
    return null;
  }
};
