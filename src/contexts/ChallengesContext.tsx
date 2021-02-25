import { createContext, ReactNode, useState } from 'react'
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
}

export const ChallengesContext = createContext({} as ChallengesData)


export function ChallengesProvider({ children }: ChallengeProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExpirience, setCurrentExpirience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    const expirienceNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
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
                resetChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}

