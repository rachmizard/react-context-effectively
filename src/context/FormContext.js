import { createContext, useContext, useMemo, useState } from "react";
import Form from "src/components/Form/Form";

export const FormContext = createContext(undefined);

const FormProvider = ({ initialValues, children, onSubmit }) => {
    const [fields, setFields] = useState(initialValues || {});
    const [errors, setErrors] = useState({});

    const value = useMemo(
        () => ({
            errors,
            fields,
            initialValues,
            setFields,
            setErrors,
        }),
        [errors, fields, initialValues]
    );

    return (
        <FormContext.Provider value={value}>
            <Form onSubmit={onSubmit}>{children}</Form>
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = useContext(FormContext);

    if (typeof context === "undefined") {
        throw new Error("useFormContext must be used within a FormProvider");
    }

    const { fields, initialValues, errors } = context;

    const setFieldValue = (fieldName, value) => {
        const fields = context.fields;

        if (fields[fieldName]) {
            fields[fieldName] = value;

            context.setFields(fields);
        } else {
            context.setFields((prev) => {
                return {
                    ...prev,
                    [fieldName]: value,
                };
            });
        }
    };

    const setFieldError = (fieldName, error) => {
        if (error) {
            context.setErrors({
                ...errors,
                [fieldName]: error,
            });
        } else {
            const updateError = errors;
            delete updateError[fieldName];

            context.setErrors(updateError);
        }
    };

    const getFieldError = (fieldName) => {
        return errors[fieldName] || false;
    };

    const resetFields = (values = initialValues) => {
        context.setFields(values);
    };

    return {
        fields,
        getFieldError,
        resetFields,
        setFieldError,
        setFieldValue,
    };
};

export default FormProvider;
