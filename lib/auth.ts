import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'tweeter';

export function generateToken(userId: number) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY) as { userId: number };
  } catch (err) {
    return null;
  }
}
