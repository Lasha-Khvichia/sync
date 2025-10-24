import { object, string, ref } from 'yup';

export const userSchema = object({
  email: string()
    .email('Please enter a valid email')
    .matches(/@gmail\.com$/, 'Email must be a Gmail address')
    .required('Email is required'),
  password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  passwordConfirm: string().required('Please confirm your password').oneOf([ref('password')], 'Passwords must match'),
});