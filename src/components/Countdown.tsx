import { useContext, useEffect, useState } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import style from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export function Countdown() {

    const { minutes, seconds, hasFinished, isActive, startCount, resetCountdown } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')


    return (
        <div>
            <div className={style.CountdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={style.startCountdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        {
                            isActive ? (
                                <button
                                    type="button"
                                    className={`${style.startCountdownButton} ${style.countdownButtonActive}`}
                                    onClick={resetCountdown}
                                >
                                    Abandonar ciclo
                                </button>) : (
                                    <button
                                        type="button"
                                        className={style.startCountdownButton}
                                        onClick={startCount}
                                    >
                                        Iniciar um ciclo
                                    </button>
                                )
                        }
                    </>
                )}



        </div>
    )
}