const zeroBegining = number => (number < 10) ? `0${number}` : number;

export const dateFormatDote = (date) => {
    date = new Date(date);

    return `${zeroBegining(date.getDate())}.${zeroBegining(date.getMonth())}.${date.getFullYear()}`;
};