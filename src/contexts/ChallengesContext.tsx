import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

interface ChallengeProviderProps {
    children: ReactNode
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesData {
    level: number;
    currentExpirience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    expirienceNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesData)


export function ChallengesProvider({ children }: ChallengeProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExpirience, setCurrentExpirience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    const expirienceNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completedChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge

        let finalExpirience = currentExpirience + amount

        if (finalExpirience >= expirienceNextLevel) {
            finalExpirience = finalExpirience - expirienceNextLevel
            levelUp()
        }

        setCurrentExpirience(finalExpirience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)

    }
    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExpirience,
                challengesCompleted,
                activeChallenge,
                expirienceNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completedChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}

