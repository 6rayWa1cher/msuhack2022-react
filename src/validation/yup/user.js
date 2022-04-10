import yup from "./utils";

const username = yup.string().min(3).max(25).required();

const password = yup.string().min(6).max(128).required();
const confirmPassword = yup
  .string()
  .oneOf([yup.ref("password")], "Пароли не одинаковы")
  .required();

const privacyPolicyAgreement = yup
  .bool()
  .default(false)
  .oneOf([true], "Должно быть отмечено");

export const emailPasswordSchema = yup
  .object({
    username,
    password,
  })
  .required();

export const registrationSchema = emailPasswordSchema
  .shape({
    username,
    password,
    confirmPassword,
    privacyPolicyAgreement,
  })
  .required();
