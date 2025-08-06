interface IPassionItem {
    label: string;
}

export const PassionItem = ({ label }: IPassionItem) => {
    return (
        <span className="px-2.5 py-1 bg-dark-gray-blue border border-white rounded-full text-white font-medium text-[15px]">
            {label}
        </span>
    );
};
