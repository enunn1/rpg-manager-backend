import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';

export async function register(req: Request, res: Response) {
  const { email, password, displayName } = req.body;

  try {
    const user = await registerUser(email, password, displayName);
    res.status(201).json({ id: user.id });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    res.json(result);
  } catch {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
