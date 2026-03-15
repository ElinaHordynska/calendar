import { useContext, useEffect, useRef, useState } from "react";
import style from "./Modal.module.scss";
import { IoIosClose } from "react-icons/io";
import { ContextStore } from "../../store/ContextStore";
import { useForm } from "react-hook-form";

export default function Modal(props) {
    let { addEvent } = useContext(ContextStore)

    let { register, handleSubmit, formState: { errors }, reset } = useForm()

    const submit = (data) => {
        console.log(data)
        addEvent(data)
        props.open(false)
        reset()
    }

    return (
        <div className={style.wrapper}
            onClick={(e) => {
                if (e.target === e.currentTarget) props.open(false)
            }}
        >
            <form onSubmit={handleSubmit(submit)} className={style.inner}>
                <button className={style.closeButton} onClick={() => props.open(false)}>
                    <IoIosClose />
                </button>
                <h1>Додати подію</h1>
                <section>
                    <label htmlFor="title">Назва події</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        {...register("title", {
                            required: {
                                value: true,
                                message: "pusto"
                            },
                            minLength: {
                                value: 3,
                                message: "zamalo teksty"
                            },
                            maxLength: 40,
                            pattern: {
                                value: /^[a-zA-Z0-9\s]*$/,
                                message: "Only letters or numbers"
                            },
                        })}
                    />
                </section>
                <section>
                    <label htmlFor="date">Дата події</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        {...register("date", {
                            required: {
                                value: true,
                                message: "Date is empty"
                            }
                        })}
                    />
                </section>
                <section>
                    <label htmlFor="time">Час події</label>
                    <input
                        type="time"
                        name="time"
                        id="time"
                        {...register("time", {
                            required: {
                                value: true,
                                message: "Time is empty"
                            }
                        })}
                    />
                </section>
                <section>
                    <label htmlFor="color">Колір події</label>
                    <input
                        type="color"
                        name="color"
                        id="color"
                        {...register("color", { value: "#000000" })}
                    />
                </section>
                <section>
                    {(errors.title || errors.date || errors.time) && (
                        <span className={style.error}>
                            {errors.title?.message}
                            {errors.date?.message}
                            {errors.time?.message}
                            </span>
                    )}
                </section>
                <button type="submit" disabled={errors.title || errors.date || errors.time}>Додати подію</button>
            </form>
        </div>
    );
}
