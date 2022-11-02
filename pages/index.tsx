import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Projects from '../components/Projects'
import Socials from '../components/Socials'
import styles from '../styles/Home.module.css'
import { Inter } from '@next/font/google'
import shape from '../public/shape.png'

const inter = Inter();

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kamil Marut</title>
        <meta name="author" content="Kamil Marut" />
        <meta name="description" content="Software engineer specializing in development of high-performance and maintainable digital products." />
        <meta name="keywords" content="kamil,marut,kamil marut,portfolio,software engineer,solutions architect,freelancer" />

        <meta property="og:title" content="Kamil Marut" />
        <meta property="og:description" content="Software engineer specializing in development of high-performance and maintainable digital products." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kamilmarut.com" />
        <meta property="og:image" content="https://kamilmarut.com/thumbnail.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Kamil Marut" />
        <meta name="twitter:description" content="Software engineer specializing in development of high-performance and maintainable digital products." />
        <meta name="twitter:url" content="https://kamilmarut.com" />
        <meta name="twitter:image" content="https://kamilmarut.com/thumbnail.png" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

      </Head>
      <div className={inter.className}>
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
            <Image src={shape} alt="" width={126} />
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
