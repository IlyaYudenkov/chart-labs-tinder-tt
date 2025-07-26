/**
 * Объединение нескольких классов в один
 * @param classes
 * @returns
 */
export const cls = (...classes: (string | undefined | null)[]) => {
    return classes.filter((it) => it !== undefined && it !== null).join(' ');
};
