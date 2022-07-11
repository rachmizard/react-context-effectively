import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useFormContext } from "./FormContext";

const FormControlContext = createContext(undefined);

const FormControlProvider = ({
    name,
    label,
    children,
    getValueFromEvent,
    required,
}) => {
    const [inputValue, setInputValue] = useState("");

    const value = useMemo(
        () => ({ name, inputValue, label, required, setInputValue }),
        [name, inputValue, label, required]
    );

    useEffect(() => {
        if (getValueFromEvent) {
            getValueFromEvent(inputValue);
        }
    }, [inputValue, getValueFromEvent]);

    return (
        <FormControlContext.Provider value={value}>
            {children}
        </FormControlContext.Provider>
    );
};

export const useFormControlContext = () => {
    const context = useContext(FormControlContext);
    const formContext = useFormContext();

    const validateOnBlur = (value) => {
        let isValid = true;

        if (context.required && !value) {
            isValid = false;
        }

        if (!isValid) {
            formContext.setFieldError(context.name, {
                isError: true,
                message: "This field is required",
            });
        } else {
            formContext.setFieldError(context.name, false);
        }

        return isValid;
    };

    return {
        ...context,
        validateOnBlur,
    };
};

export default FormControlProvider;
