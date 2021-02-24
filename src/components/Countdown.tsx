import { useEffect, useState } from 'react'
import style from '../styles/components/Countdown.module.css'

export function Countdown() {
    const [time, setTime] = useState(25 * 60)
    const [active, setActive] = useState(false)

    const minutos = Math.floor(time / 60)
    const segundos = time % 60

    const [minuteLeft, minuteRight] = String(minutos).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(segundos).padStart(2, '0').split('')

    function startCount() {
        setActive(true)
    }

    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }
    }, [active, time])
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
            <button
                type="button"
                className={style.startCountdownButton}
                onClick={startCount}
            >
                Iniciar um ciclo
            </button>
        </div>
    )
}