import yup from "./utils";

const label = yup.string().min(1).max(100).required();
const description = yup.string().max(255);
const pressCounter = yup.number().min(0).required();

export const buttonSchema = yup
  .object({
    label,
    description,
    press_counter: pressCounter,
  })
  .required();
