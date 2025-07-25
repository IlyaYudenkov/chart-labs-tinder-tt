interface IPassionItem {
    label: string;
}

export const PassionItem = ({ label }: IPassionItem) => {
    return (
        <span className="px-2.5 py-1 bg-dark-gray-blue border border-primary rounded-full text-primary font-medium text-[15px]">
            {label}
        </span>
    );
};
