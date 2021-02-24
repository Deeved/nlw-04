import style from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={style.profileContainer}>
            <img src="https://github.com/deeved.png" alt="Deeved Hiuston" />
            <div>
                <strong>Deeved Hiuston</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level 1
                </p>
            </div>
        </div>
    )
}