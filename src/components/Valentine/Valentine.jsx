import React, { useEffect, useRef, useState } from 'react';
import style from "./Valentine.module.scss";

export default function Valentine() {
    let [name, setName] = useState("");
    let [message, setMessage] = useState("");
    let [hearts, setHearts] = useState(0); // Початкове значення 0

    let inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    useEffect(() => {
        // Додав перевірку на довжину, щоб не було помилок
        setHearts(Math.floor(message.length / 10));
    }, [message]);

    return (
        <div className={style.container}>
            <div className={style.inputGroup}>
                <label>Для кого</label>
                <input 
                    type="text" 
                    ref={inputRef} 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Ім'я..."
                />
                
                <label>Повідомлення</label>
                <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Напиши щось тепле..."
                ></textarea>
            </div>

            {name && (
                <div className={style.valentinka}>
                    {/* Багатошаровий фон серця всередині валентинки */}
                    <div className={style.heartBg}>
                        <div className={`${style.layer} ${style.outer}`}></div>
                        <div className={`${style.layer} ${style.mid}`}></div>
                        <div className={`${style.layer} ${style.inner}`}></div>
                    </div>

                    {/* Контент поверх серця */}
                    <h1>{name}</h1>
                    <p>{message}</p>
                    <p className={style.heartsRow}>{"❤".repeat(hearts)}</p>
                </div>
            )}
        </div>
    );
}