import type { NextPage } from 'next'
import Image from 'next/image'
import Projects from '../components/Projects'
import Socials from '../components/Socials'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <div>
        <h3>Hi, I&apos;m Kamil.</h3>
        <div className={styles.side_by_side}>
          <div>
            <h2>Software Engineer // Solutions Architect</h2>
            <p>
              I specialize in development of <mark>high-performance</mark> and <mark>maintanable</mark> digital products,
              with expertise in <mark>pragmatic system design</mark> and <mark>rapid prototyping</mark>.
            </p>
          </div>
          <div className={styles.side_by_side_image}>
            <Image src="/shape.png" alt="" width={126} height={126} layout="fixed" />
          </div>
        </div>
      </div>
      <Socials />
      {/* 
      <hr />
      <Projects /> 
      */}
    </>
  )
}

export default Home
