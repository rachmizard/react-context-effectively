import { useFormContext } from "src/context/FormContext";
import { useFormControlContext } from "src/context/FormControlContext";

const TextInput = ({ type = "text", onChange, ...rest }) => {
    const formContext = useFormContext();
    const formControlContext = useFormControlContext();

    const textInputType = type !== "text" ? "password" : "text";

    const onChangeInputHandler = (e) => {
        if (typeof formControlContext !== "undefined") {
            formControlContext.setInputValue(e.target.value);
            formContext.setFieldValue(formControlContext.name, e.target.value);
        }

        if (onChange) {
            onChange(e.target.value);
        }
    };

    const textValue = formControlContext
        ? formControlContext.inputValue
        : rest?.value
        ? rest?.value
        : "";

    const defaultValue = formContext.fields[formControlContext.name] || "";
    const isError = formContext.getFieldError(formControlContext.name);

    return (
        <input
            className={`p-2 px-4 rounded-lg border ${
                isError ? "border-red-600" : "border-gray-300"
            }   focus:outline-none focus:border-gray-700 transition duration-500`}
            type={textInputType}
            onChange={onChangeInputHandler}
            onFocus={() =>
                formControlContext.validateOnBlur(formControlContext.inputValue)
            }
            onBlur={() =>
                formControlContext.validateOnBlur(formControlContext.inputValue)
            }
            value={textValue || defaultValue}
            {...rest}
        />
    );
};

export default TextInput;
