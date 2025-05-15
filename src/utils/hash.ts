import bcrypt from 'bcrypt';

export const comparePasswords = (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};
