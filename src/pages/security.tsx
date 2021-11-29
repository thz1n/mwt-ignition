import Head from 'next/head';
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { apiAccount } from "../services/api";
import router, { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import { MyAccount } from "../components/MyAccount";
import { LockPassword } from '../components/LockPassword';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from './home.module.scss'


type LockPasswordResponse = {
  memb_guid: number;
  memb___id: string;
  LockPassword: number;
}

export default function Security() {

  const { auth } = useContext(AuthContext);
  const [lockPass, setLockPass] = useState(null);

  useEffect(() => {
    async function getLockPass() {

      const { '@muwebtools.token': token } = parseCookies();
      const { ['@muwebtools.user']: user } = parseCookies();

      if(!token || !user) return router.push('/')

      try {
        apiAccount.defaults.headers.common['authorization'] = token;
        apiAccount.get<LockPasswordResponse>(`/account/getlockPassword/${user}`).then(res => {
          const { LockPassword } = res.data;
          setLockPass(LockPassword)
        })
      } catch (error) {
        return router.push('/')
      }
    }
    getLockPass()
    const intervalId = setInterval(() => {
      getLockPass()
    }, 500) // in milliseconds
    return () => clearInterval(intervalId)

  }, [])

   return !!auth ? (
    <>
    <Head>
      <title>MU Ignition | Central de Segurança</title>
    </Head>
    <main className={ styles.contentWrapper }>
      <LockPassword lockPassword={lockPass || 123456} />
      <div>
        <MyAccount />
      </div>
    </main>
  </>
  ) : ''
}