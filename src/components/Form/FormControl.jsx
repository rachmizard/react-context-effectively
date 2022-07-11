import FormControlProvider, {
    useFormControlContext,
} from "src/context/FormControlContext";

const FormControl = ({ children, name, label, required, ...rest }) => {
    if (children.length > 1) {
        throw new Error("FormControl can only have one child");
    }

    return (
        <FormControlProvider
            name={name}
            label={label}
            required={required}
            {...rest}
        >
            <FormControlContainer>{children}</FormControlContainer>
        </FormControlProvider>
    );
};

const FormControlContainer = ({ children }) => {
    const { label, name } = useFormControlContext();

    const renderLabel = () => {
        if (typeof label !== "string") {
            return label;
        }

        return (
            <label htmlFor={name} className="text-gray-500">
                {label}
            </label>
        );
    };

    return (
        <div className="flex flex-col space-y-2">
            {renderLabel()}
            {children}
        </div>
    );
};

export default FormControl;
