const zeroBegining = number => (number < 10) ? `0${number}` : number;

export const dateFormatDote = (date) => {
    date = new Date(date);

    return `${zeroBegining(date.getDate())}.${zeroBegining(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
];