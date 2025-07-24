interface INotificationItem {
    count: string;
}

export const NotificationItem = ({ count }: INotificationItem) => {
    if (!count) return;
    return (
        <div className="flex justify-center items-center absolute top-1.5 right-[-5px] max-h-[15px] bg-gradient-red-to-orange rounded-2xl p-1">
            <span className="text-primary text-[9px] font-semibold">{count}</span>
        </div>
    );
};
