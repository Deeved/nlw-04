import style from '../styles/components/ExperienceBar.module.css'

export function ExpirienceBar() {
    return (
        <header className={style.expirienceBar}>
            <span>0 xp</span>
            <div >
                <div style={{ width: "50%" }} />
                <span className={style.currentExperience} style={{ left: '50%' }}>300 xp</span>
            </div>
            <span>600 xp</span>
        </header>
    )
}