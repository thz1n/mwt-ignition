import styles from './styles.module.scss'
import Link from 'next/link';
import { LogOutButton } from "../LoginBox/LogOutButton"
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export const MyAccount = () => {
  
  const { user } = useContext(AuthContext)
  
  return (
    <section className={styles.myAccountWrapper}>
      <div className={styles.accountAvatar}>
        <img src="/images/classes/1.jpg" alt="" />  
      </div>
      <span>Hello! <b>{ user.memb___id }</b> </span>
      <ul>
        <li>
          <Link href={`/security`}>
            <a>Central de Segurança</a>
          </Link>
        </li>
      </ul>
      <LogOutButton />
    </section>
  )
}