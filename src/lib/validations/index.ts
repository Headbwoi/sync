import { z } from "zod"

const emailSchema = z.string().email()

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])(?!.*\s).{7,}$/

const passwordSchema = z.string().min(7).regex(passwordRegex)

export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email)
    return true
  } catch (error) {
    return false
  }
}

export const validatePassword = (password: string) => {
  try {
    passwordSchema.parse(password)
    return true
  } catch (error) {
    return false
  }
}
