import style from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
    return (
        <div className={style.CompletedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>5</span>
        </div>
    )
}