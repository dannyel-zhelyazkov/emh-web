import { object, string } from 'yup'

export const passwordValidator =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/

export const wrongPasswordMsg =
  'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'

export const createUserValidationScheme = object({
  email: string().email().required(),
  password: string().matches(passwordValidator, wrongPasswordMsg).required(),
  role_id: string().required(),
})
