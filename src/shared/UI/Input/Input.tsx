interface IInput {
    placeholder?: string;
    type?: string;
}

export const Input = ({ placeholder, type = 'text' }: IInput) => {
    return (
        <input
            className="px-3.5 py-3
         bg-gray-light border rounded-lg border-gray-blue"
            type={type}
            placeholder={placeholder}
        />
    );
};
