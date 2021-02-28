import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExpirienceBar } from "../components/ExpirienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import style from '../styles/components/Home.module.css'
import { GetServerSideProps } from 'next'
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExpirience: number;
  challengesCompleted: number;
}

export default function Home(props) {

  return (
    <ChallengesProvider
      level={props.level}
      currentExpirience={props.currentExpirience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={style.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExpirienceBar />

        <CountdownProvider>

          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExpirience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level) || 1,
      currentExpirience: Number(currentExpirience) || 0,
      challengesCompleted: Number(challengesCompleted) || 0
    }
  }

}