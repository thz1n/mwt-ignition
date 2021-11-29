import Head from 'next/head';
import { useRouter } from "next/router"
import { useContext } from "react";
import { LoginBox } from "../../components/LoginBox";
import { NewAccount } from "../../components/NewAccount";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "../home.module.scss"

const Create = () => {

  const { auth } = useContext(AuthContext);
  const router = useRouter();

  return !auth ? (
    <>
    <Head>
      <title>MU Ignition | Central de Segurança</title>
    </Head>
    <main className={styles.contentWrapper}>
      <NewAccount />
      <div>
        <LoginBox />
      </div>
    </main>
    </>
  ) : router.push('/').then(() => router.reload());
}

export default Create;
