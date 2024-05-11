import * as Yup from "yup";

export const createOrderSchema = Yup.object({
    deliveryAddress: Yup.string().required("Моля въведете адрес за доставка"),

    customerTelephone: Yup.string()
        .matches(/^\+359\d{9}$/, {
            message:
                "Телефонният номер трябва да започва с +359 и да съдържа точно 12 цифри",
            excludeEmptyString: true
        })
        .required("Моля въведете телефонен номер")
});
