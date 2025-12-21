import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';
import { ENV } from '../config/env';


const SALT_ROUNDS = 10;


export async function registerUser(
  email: string,
  password: string,
  displayName: string
) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      displayName
    }
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

 const token = jwt.sign(
  { userId: user.id },
  ENV.JWT_SECRET,
  { expiresIn: ENV.JWT_EXPIRES_IN }
);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName
    }
  };
}
