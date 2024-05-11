import * as Yup from "yup";

export const updateProfileSchema = Yup.object({
    firstName: Yup.string()
        .test(
            "min-length",
            "Моля въведете име с поне 3 символа",
            (value) => value.length >= 3
        )
        .test(
            "max-length",
            "Моля въведете име с не повече от 15 символа",
            (value) => value.length <= 15
        )
        .required("Моля въведете име"),

    lastName: Yup.string()
        .test(
            "min-length",
            "Моля въведете фамилия с поне 3 символа",
            (value) => value.length >= 3
        )
        .test(
            "max-length",
            "Моля въведете фамилия с не повече от 15 символа",
            (value) => value.length <= 15
        )
        .required("Моля въведете фамилия"),

    email: Yup.string()
        .email("Моля въведете валиден имейл")
        .required("Моля въведете имейл"),

    currentPassword: Yup.string()
        .min(6, "Моля въведете парола с поне 6 символа")
        .required("Моля въведете парола"),
    newPassword: Yup.string()
        .min(6, "Моля въведете нова парола с поне 6 символа")
        .required("Моля въведете нова парола"),

    confirm_newPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Паролите не съвпадат")
        .required("Моля повторете новата си парола")
});
