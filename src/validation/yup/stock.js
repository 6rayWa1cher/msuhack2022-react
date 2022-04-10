import yup from "./utils";

export const addStockSchema = yup
  .object({
    name: yup
      .string()
      .min(1)
      .max(15)
      .test("name", "Не может содержать эту акцию", function (value) {
        return !(this.options.context.arr || []).includes(value);
      })
      .required(),
  })
  .required();
