import { useContext, useEffect, useRef, useState } from "react";
import style from "./Modal.module.scss";
import { IoIosClose } from "react-icons/io";
import { ContextStore } from "../../store/ContextStore";

export default function Modal(props) {
    let { addEvent } = useContext(ContextStore)

    const handleSubmit = (e) => {
        if (!correct) return
        addEvent({title, date, time, color})
        props.open(false)
    }

    return (
        <div className={style.wrapper} 
            onClick={(e)=>{
                if(e.target === e.currentTarget) props.open(false)
            }}
        >
            <div className={style.inner}>
                <button className={style.closeButton} onClick={()=>props.open(false)}>
                    <IoIosClose />
                </button>
                <h1>Додати подію</h1>
                <section>
                    <label htmlFor="title">Назва події</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                    />
                </section>
                <section>
                    <label htmlFor="date">Дата події</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                    />
                </section>
                <section>
                    <label htmlFor="time">Час події</label>
                    <input
                        type="time"
                        name="time"
                        id="time"
                    />
                </section>
                <section>
                    <label htmlFor="color">Колір події</label>
                    <input
                        type="color"
                        name="color"
                        id="color"
                    />
                </section>
                <button>Додати подію</button>
            </div>
        </div>
    );
}
