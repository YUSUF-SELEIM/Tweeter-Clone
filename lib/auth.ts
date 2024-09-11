import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'tweeter';

export function generateToken(userId: string) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY) as { userId: number };
  } catch (err) {
    return null;
  }
}
