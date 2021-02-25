import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import style from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)

    const minutos = Math.floor(time / 60)
    const segundos = time % 60

    const [minuteLeft, minuteRight] = String(minutos).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(segundos).padStart(2, '0').split('')
    const [hasFinished, setHasFinished] = useState(false)

    function startCount() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(0.1 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        } else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])
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