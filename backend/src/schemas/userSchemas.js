const { z } = require('zod');

exports.passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(100, 'Password must not exceed 100 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^a-zA-Z0-9]/,
    'Password must contain at least one special character'
  );

exports.userObject = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: passwordSchema,
});

exports.signupObject = z.object({
  body: userObject,
});

exports.signinObject = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
  }),
});

exports.updateObject = z.object({
  body: userObject.partial.omit({ password: true }),
});

//TODO  schema for changing password (no etodoondpoints yet)
exports.changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: passwordSchema,
  }),
});
