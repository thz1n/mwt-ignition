import Head from 'next/head'
import { LoginBox } from '../components/LoginBox'
import { CharacterList } from '../components/CharacterList'
import styles from './home.module.scss'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { MyAccount } from '../components/MyAccount'

export default function Home() {
  const { auth } = useContext(AuthContext)
  return (
    <>
      <Head>
        <title>Home | Ignition</title>
      </Head>
      <main className={ styles.contentWrapper }>
        <CharacterList />
        <div>
          { !!auth ? <MyAccount /> : <LoginBox /> }
          asdasd
        </div>
      </main>
    </>
  )
}