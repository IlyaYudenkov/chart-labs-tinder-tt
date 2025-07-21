interface IInput {
    placeholder?: string;
    type?: string;
    value?: string;
    setValue?: (val: string) => void;
    defaultValue?: string;
    name?: string;
}

export const Input = ({
    placeholder,
    type = 'text',
    value,
    setValue,
    name,
    defaultValue,
}: IInput) => {
    return (
        <input
            className="px-3.5 py-3
         bg-gray-light border rounded-lg border-gray-blue"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue?.(e.target.value)}
            name={name}
            defaultValue={defaultValue}
        />
    );
};
