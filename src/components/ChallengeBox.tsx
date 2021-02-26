import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import style from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext)

    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceed() {
        completedChallenge()
        resetCountdown()
    }

    function handleChallengeFailed() {
        resetChallenge()
        resetCountdown()
    }

    return (
        <div className={style.challengeBoxContainer}>
            { activeChallenge ?
                (
                    <div className={style.challengeBoxActive}>
                        <header>Ganhe {activeChallenge.amount}xp</header>

                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`} />
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>

                        <footer>
                            <button
                                className={style.challengeBoxFailedButton}
                                type="button"
                                onClick={handleChallengeFailed}
                            >
                                Falhei
                            </button>

                            <button
                                className={style.challengeBoxSucceededButton}
                                type="button"
                                onClick={handleChallengeSucceed}
                            >
                                Completei
                            </button>
                        </footer>
                    </div>
                ) : (
                    <div className={style.challengeBoxNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="level up" />
                        Avance de level completando desafios.
                        </p>
                    </div>
                )
            }

        </div>
    )
}