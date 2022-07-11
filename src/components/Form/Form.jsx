import React from "react";
import { useFormContext } from "src/context/FormContext";

const Form = ({ onSubmit, children }) => {
    const formContext = useFormContext();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(formContext.fields);
        }
    };

    return (
        <form className="flex flex-col space-y-5" onSubmit={onSubmitHandler}>
            {children}
        </form>
    );
};

export default Form;
