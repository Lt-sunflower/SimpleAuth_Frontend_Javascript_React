export const validateUsername = (username, minLength = 6, maxLength = 15) => {
  const usernameRegex = /^[a-zA-Z0-9]{6,15}$/;
  if (!username) return 'Username is required';
  if (username.length < minLength) return `Username must be at least ${minLength} characters`;
  if (username.length > maxLength) return `Username must be at most ${maxLength} characters`;
  if (!usernameRegex.test(username)) return 'Username must be alphanumeric';
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password, minLength = 8, maxLength = 15) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  if (!password) return 'Password is required';
  if (password.length < minLength) return `Password must be at least ${minLength} characters`;
  if (password.length > maxLength) return `Password must be at most ${maxLength} characters`;
  if (!passwordRegex.test(password))
    return 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character';
  return null;
};
