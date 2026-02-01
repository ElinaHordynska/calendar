import React, { useState, useContext } from 'react'
import style from "./MCalendar.module.scss"
import { getCalendarDates } from '../../utils/calendar';
import {ContextStore} from "../../store/ContextStore"


export default function MCalendar(props) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDates(year, month)

    let {events} = useContext(ContextStore)
    console.log(events)

  return (
    <div className={style.wrapper}>
        <div className={style.container}>
            <table>
                <thead>
                    <tr>
                        <th>ПН</th>
                        <th>ВТ</th>
                        <th>СР</th>
                        <th>ЧТ</th>
                        <th>ПТ</th>
                        <th>СБ</th>
                        <th>НД</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({length: Math.ceil(dates.length / 7)}, (_, weekIndex)=>(
                            <tr key={weekIndex}>
                                {dates.slice(weekIndex * 7, (weekIndex * 7) + 7)
                                .map((date, index)=>(
                                    <td key={index}>
                                        <span className={style.number}>
                                            {date.getUTCDate()}
                                        </span>
                                        {
                                            events.filter((e, i) => e.date == date.toISOString().split("T")[0])
                                            .map((e, i)=>(
                                                <button key={i} className={style.event}
                                                style={{
                                                    background: e.color
                                                }}
                                                >
                                                    {e.title}
                                                </button>
                                            ))
                                        }
                                    </td>
                                ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
