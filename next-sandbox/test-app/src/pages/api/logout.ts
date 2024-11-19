import type {NextApiRequest, NextApiResponse} from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Clear the 'auth_token' cookie by setting its expiration date in the past
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      path: '/',
      expires: new Date(0), // Expire the cookie immediately
      sameSite: 'strict',
    }),
  );

  res.status(200).json({message: 'Logout successful'});
}
