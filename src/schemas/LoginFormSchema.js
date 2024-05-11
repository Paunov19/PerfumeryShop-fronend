import * as Yup from "yup";

export const loginFormSchema = Yup.object({
    email: Yup.string()
        .email("Невалиден имейл")
        .required("Моля въведете имейл"),

    password: Yup.string()
        .min(6, "Паролата трябва да бъде поне 6 символа")
        .required("Моля въведете парола")
});
