import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import cookie from 'js-cookie'

import { LevelUpModal } from '../components/LevelUpModal'
interface ChallengeProviderProps {
    children: ReactNode
    level: number;
    currentExpirience: number;
    challengesCompleted: number;
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
    closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesData)


export function ChallengesProvider({ children, ...rest }: ChallengeProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExpirience, setCurrentExpirience] = useState(rest.currentExpirience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    const expirienceNextLevel = Math.pow((level + 1) * 4, 2)

    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        cookie.set('level', String(level))
        cookie.set('currentExpirience', String(currentExpirience))
        cookie.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExpirience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelModalOpen(true)
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

    function closeLevelUpModal() {
        setIsLevelModalOpen(false)
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
                completedChallenge,
                closeLevelUpModal
            }}>
            {children}

            {isLevelModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}

