import { object, string } from 'yup'

export const authValidationScheme = object({
  email: string().required(),
  password: string().required(),
})
