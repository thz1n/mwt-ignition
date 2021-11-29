import Link from 'next/link';
import { VscClose } from 'react-icons/vsc';
import styles from './styles.module.scss'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const LockPassword = (props) => {
  
  const { timer } = useContext(AuthContext)
  let countDown = Math.round((timer / 100) / 3)
  return (
    <div className={styles.lockPasswordViewWrapper}>
      <div className={styles.lockPasswordBanner}>
        <div className={styles.lockPasswordNameBox}>
          <h3>SUA SENHA DE ACESSO É</h3>
          <div className={styles.circleWrapper}>
            <CircularProgressbarWithChildren
            value={ countDown }
            styles={
              buildStyles({
                pathColor: `rgb(255, 0, 138)`,
              })
            }>
              <h1>{props.lockPassword}</h1>
            </CircularProgressbarWithChildren>
          </div>
        </div>
        <Link href={`/`} passHref>
          <div className={styles.closeButton}>
            <VscClose size={24} />
          </div>
        </Link>

      </div>
    </div>
  )
}

