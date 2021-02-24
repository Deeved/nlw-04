import Head from 'next/head'
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExpirienceBar } from "../components/ExpirienceBar";
import { Profile } from '../components/Profile';
import style from '../styles/components/Home.module.css'

export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExpirienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>

        <div>

        </div>
      </section>
    </div>
  )
}
