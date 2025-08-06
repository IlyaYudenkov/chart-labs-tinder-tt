import { IOptionsTab } from '../model/tabSwitcher.model';

interface ITabSwitcher {
    optionsTab: IOptionsTab[];
    selectedOption?: IOptionsTab;
    setSelectedOption: (val: IOptionsTab) => void;
}

export const TabSwitcher = ({ optionsTab, selectedOption, setSelectedOption }: ITabSwitcher) => {
    const handleSelect = (tab: IOptionsTab) => {
        setSelectedOption(tab);
    };
    return (
        <div className="flex w-full">
            {optionsTab.map((opt) => (
                <button
                    key={opt.id}
                    className={`w-full py-3 border-b border-gray-blue-muted text-[19px] font-bold
                            transition-colors duration-300
                            ${opt.id === 1 ? 'border-r' : ''}
                            ${opt.id === selectedOption.id ? 'text-bright-red' : 'text-steel-gray'}`}
                    onClick={() => handleSelect(opt)}
                >
                    <label htmlFor={String(opt.id)}>{opt.title}</label>
                </button>
            ))}
        </div>
    );
};
