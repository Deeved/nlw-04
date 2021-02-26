import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import style from '../styles/components/Profile.module.css'

export function Profile() {

    const { level } = useContext(ChallengesContext)

    return (
        <div className={style.profileContainer}>
            <img src="https://github.com/deeved.png" alt="Deeved Hiuston" />
            <div>
                <strong>Deeved Hiuston</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}