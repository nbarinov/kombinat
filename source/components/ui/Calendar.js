import PropTypes from 'prop-types';
import { zeroBegining, getDay, months } from '../../libs/date-helper';

import '../../style/calendar.css';

const Calendar = ({ className, calendar, setDate, menus, history }) => {
    let calendarArray = null;

    const initialCalendar = () => {
        let date = new Date(calendar.year, calendar.month);

        calendarArray = new Array(6);
        calendarArray[0] = new Array(7);
        let index = 0;

        const monthString = zeroBegining(calendar.month + 1);
    
        // заполняем первый ряд до первого дня месяца
        for (let i = 0; i < getDay(date); i++) {
            calendarArray[index].push({
                value: '',
                date: null,
                className: 'calendar__cell calendar__cell--empty',
                action: false,
            });
        }

        // заполняем ячейки дат
        while (date.getMonth() === calendar.month) {
            let className = 'calendar__cell';
            let menuId = null;

            if (date.getDate() === calendar.date && calendar.date !== null) {
                className += ' celendar__cell--selected';
            }

            const dateNow = `${date.getFullYear()}-${monthString}-${zeroBegining(date.getDate())}`;

            if (menus) {
                for (let i = 0; i < menus.length; i++) {
                    let dateUse = new Date(menus[i].dateUse);
                    dateUse = `${dateUse.getFullYear()}-${zeroBegining(dateUse.getMonth() + 1)}-${zeroBegining(dateUse.getDate())}`;
                    if (dateNow === dateUse) {
                        className += ' calendar__cell--menu';
                        menuId = menus[i].menuId;
                        break;
                    }
                }
            }

            if (history) {
                for (let i = 0; i < history.length; i++) {
                    let dateUse = new Date(menus[i].dateUse);
                    dateUse = `${dateUse.getFullYear()}-${zeroBegining(dateUse.getMonth() + 1)}-${zeroBegining(dateUse.getDate())}`;
                    if (dateNow === history[i].dateUse.slice(0, 10)) {
                        className += ' calendar__cell--history';
                        break;
                    }
                }
            }

            calendarArray[index].push({
                value: date.getDate(),
                date: {
                    date: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear()
                },
                className,
                menuId,
                action: true,
            });

            if (getDay(date) % 7 === 6) {
                calendarArray[++index] = new Array(7);
            }

            date.setDate(date.getDate() + 1);
        }

        // добить таблицу пустыми ячейками, если нужно
        if (getDay(date) !== 0) {
            for (let i = getDay(date); i < 7; i++) {
                calendarArray[index].push({
                    value: '',
                    day: -1,
                    className: 'calendar__cell calendar__cell--empty',
                    action: false,
                });
            }
        }
    };

    initialCalendar();

    const onSetDate = date => {
        if(date) {
            setDate(date);
        }
    };

    const onSetYear = year => {
        setDate({
            ...calendar,
            date: null,
            year
        });
    };

    const onSetMonth = month => {
        setDate({
            ...calendar,
            date: null,
            month
        });
    };

    return <section className={(className) ? `${className} calendar` : 'calendar'}>
        <header className="calendar__header">
            <div className="calendar__navigation">
                <button className="calendar__nav-button  calendar__nav-button--prev2" type="button" onClick={() => onSetYear(calendar.year - 1)}>«</button>
                <button className="calendar__nav-button  calendar__nav-button--prev" type="button" onClick={() => onSetMonth(calendar.month - 1)}>‹</button>
                <span className="calendar__title">{months[calendar.month]} {calendar.year}</span>
                <button className="calendar__nav-button  calendar__nav-button--next2" type="button" onClick={() => onSetMonth(calendar.month + 1)}>›</button>
                <button className="calendar__nav-button  calendar__nav-button--next" type="button" onClick={() => onSetYear(calendar.year + 1)}>»</button>
            </div>
            <ul className="calendar__week-days-list">
                {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day, i) =>
                    <li className="calendar__week-days-item" key={i}>{day}</li>
                )}
            </ul>
        </header>
        <div className="calendar__dates">
            {calendarArray.map((row, rowIndex) =>
                <div className="calendar__row" key={rowIndex}>
                    {calendarArray[rowIndex].map((cell, cellIndex) =>
                        <div className={cell.className} key={cellIndex} onClick={() => onSetDate(cell.date)}>{cell.value}</div>
                    )}
                </div>
            )}
        </div>
    </section>;
};

Calendar.defaultProps = {
    className: '',
    calendar: {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    },
    setDate: f => f,
    menus: [],
    history: [],
};

Calendar.propTypes = {
    className: PropTypes.string,
    calendar: PropTypes.object,
    setDate: PropTypes.func,
    menus: PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.arrayOf(PropTypes.object),
};

export default Calendar;
