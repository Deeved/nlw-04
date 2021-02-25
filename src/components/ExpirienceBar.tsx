import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import style from '../styles/components/ExperienceBar.module.css'

export function ExpirienceBar() {
    const { currentExpirience, expirienceNextLevel } = useContext(ChallengesContext)

    const percentNextLevel = Math.round(currentExpirience * 100 / expirienceNextLevel)

    return (
        <header className={style.expirienceBar}>
            <span>0 xp</span>
            <div >
                <div style={{ width: `${percentNextLevel}%` }} />
                <span className={style.currentExperience} style={{ left: `${percentNextLevel}%` }}>{currentExpirience} xp</span>
            </div>
            <span>{expirienceNextLevel} xp</span>
        </header>
    )
}