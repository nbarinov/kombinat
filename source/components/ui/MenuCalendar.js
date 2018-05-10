import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import { zeroBegining, months } from '../../libs/date-helper';

import '../../style/menu-calendar.css';

class MenuCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendar: {
                date: new Date().getDate(),
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
            },
        };

        this.onSetDate = this.onSetDate.bind(this);
    }

    onSetDate(calendar) {
        this.setState({
            calendar,
        });
    }

    render() {
        const { calendar } = this.state;
        const { className, user } = this.props;
        const { onSetDate } = this;

        return (
            <div className={(className) ? `${className} menu-calendar` : 'menu-calendar'}>
                <div className="menu-calendar__sidebar">
                    {(calendar.date === null) ?
                        <span>Выберите дату</span> :
                        <span>Меню на
                            <br />
                            <Link
                                to={`/menus/${user.tin_school}/${calendar.year}-${zeroBegining(calendar.month + 1)}-${zeroBegining(calendar.date)}`}>
                                {calendar.date} {months[calendar.month]}</Link>
                        </span>}
                </div>
                <Calendar className="menu-calendar__calendar" calendar={calendar} menus={user.menus || []} history={user.history || []} setDate={onSetDate} />
            </div>
        );
    }
}

MenuCalendar.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,
};

export default MenuCalendar;





// import { Component } from 'react';
// import PropTypes from 'prop-types';

// import { zeroBegining, getDay, months } from '../../libs/date-helper';

// import '../../style/calendar.css';

// class Calendar extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             calendar: {
//                 date: new Date().getDate(),
//                 month: new Date().getMonth(),
//                 year: new Date().getFullYear(),
//             }
//         };

//         this.calendarArray = null;
//         this.onSetDate = this.onSetDate.bind(this);
//         this.onSetYear = this.onSetYear.bind(this);
//         this.onSetMonth = this.onSetMonth.bind(this);
//     }

//     componentWillMount() {
//         this.initialCalendar();
//     }

//     componentWillUpdate(nextProps, nextState) {
//         this.initialCalendar(nextState.calendar);
//     }

//     initialCalendar(inititalCalendar = null) {
//         const calendar = inititalCalendar || this.state.calendar;
//         const { menus, history } = this.props;

//         let date = new Date(calendar.year, calendar.month);

//         this.calendarArray = new Array(6);
//         this.calendarArray[0] = new Array(7);
//         let index = 0;

//         const monthString = zeroBegining(calendar.month + 1);

//         // заполняем первый ряд до первого дня месяца
//         for (let i = 0; i < getDay(date); i++) {
//             this.calendarArray[index].push({
//                 value: '',
//                 date: null,
//                 className: 'calendar__cell calendar__cell--empty',
//                 action: false,
//             });
//         }

//         // заполняем ячейки дат
//         while (date.getMonth() === calendar.month) {
//             let className = 'calendar__cell';
//             let menuId = null;

//             if (date.getDate() === calendar.date && calendar.date !== null) {
//                 className += ' celendar__cell--selected';
//             }

//             const dateNow = `${date.getFullYear()}-${monthString}-${zeroBegining(date.getDate())}`;

//             if (menus) {
//                 for (let i = 0; i < menus.length; i++) {
//                     let dateUse = new Date(menus[i].dateUse);
//                     dateUse = `${dateUse.getFullYear()}-${zeroBegining(dateUse.getMonth() + 1)}-${zeroBegining(dateUse.getDate())}`;
//                     if (dateNow === dateUse) {
//                         className += ' calendar__cell--menu';
//                         menuId = menus[i].menuId;
//                         break;
//                     }
//                 }
//             }

//             if (history) {
//                 for (let i = 0; i < history.length; i++) {
//                     let dateUse = new Date(menus[i].dateUse);
//                     dateUse = `${dateUse.getFullYear()}-${zeroBegining(dateUse.getMonth() + 1)}-${zeroBegining(dateUse.getDate())}`;
//                     if (dateNow === history[i].dateUse.slice(0, 10)) {
//                         className += ' calendar__cell--history';
//                         menuId = history[i].menuId;
//                         break;
//                     }
//                 }
//             }

//             this.calendarArray[index].push({
//                 value: date.getDate(),
//                 date: {
//                     date: date.getDate(),
//                     month: date.getMonth(),
//                     year: date.getFullYear()
//                 },
//                 className,
//                 menuId,
//                 action: true,
//             });

//             if (getDay(date) % 7 === 6) {
//                 this.calendarArray[++index] = new Array(7);
//             }

//             date.setDate(date.getDate() + 1);
//         }

//         // добить таблицу пустыми ячейками, если нужно
//         if (getDay(date) !== 0) {
//             for (let i = getDay(date); i < 7; i++) {
//                 this.calendarArray[index].push({
//                     value: '',
//                     day: -1,
//                     className: 'calendar__cell calendar__cell--empty',
//                     action: false,
//                 });
//             }
//         }
//     }

//     onSetDate(calendar) {
//         if (calendar) {
//             this.props.handler(calendar);

//             this.setState({
//                 calendar,
//             });
//         }
//     }

//     onSetYear(year) {
//         const { calendar } = this.state;

//         this.onSetDate({
//             ...calendar,
//             date: null,
//             year
//         });
//     }

//     onSetMonth(month) {
//         const { calendar } = this.state;

//         this.onSetDate({
//             ...calendar,
//             date: null,
//             month
//         });
//     }

//     render() {
//         const { className } = this.props;
//         const { calendar } = this.state;
//         const { calendarArray, onSetDate, onSetMonth, onSetYear } = this;

//         return <section className={(className) ? `${className} calendar` : 'calendar'}>
//             <header className="calendar__header">
//                 <div className="calendar__navigation">
//                     <button className="calendar__nav-button  calendar__nav-button--prev2" type="button" onClick={() => onSetYear(calendar.year - 1)}>«</button>
//                     <button className="calendar__nav-button  calendar__nav-button--prev" type="button" onClick={() => onSetMonth(calendar.month - 1)}>‹</button>
//                     <span className="calendar__title">{months[calendar.month]} {calendar.year}</span>
//                     <button className="calendar__nav-button  calendar__nav-button--next2" type="button" onClick={() => onSetMonth(calendar.month + 1)}>›</button>
//                     <button className="calendar__nav-button  calendar__nav-button--next" type="button" onClick={() => onSetYear(calendar.year + 1)}>»</button>
//                 </div>
//                 <ul className="calendar__week-days-list">
//                     {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day, i) =>
//                         <li className="calendar__week-days-item" key={i}>{day}</li>
//                     )}
//                 </ul>
//             </header>
//             <div className="calendar__dates">
//                 {calendarArray.map((row, rowIndex) =>
//                     <div className="calendar__row" key={rowIndex}>
//                         {calendarArray[rowIndex].map((cell, cellIndex) =>
//                             <div className={cell.className} key={cellIndex} onClick={() => onSetDate(cell.date)}>{cell.value}</div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </section>;
//     }
// }

// Calendar.defaultProps = {
//     className: '',
//     menus: null,
//     history: null,
//     handler: f => f,
// };

// Calendar.propTypes = {
//     className: PropTypes.string,
//     menus: PropTypes.array,
//     history: PropTypes.array,
//     handler: PropTypes.func,
// };

// export default Calendar;
