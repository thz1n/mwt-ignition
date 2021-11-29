import { createContext, ReactChildren, useEffect, useState } from "react";
import { apiAccount } from "../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import useCountDown from "react-countdown-hook";


type User = {
  memb___id: string;
  memb_name: string;
  mail_addr: string;
  Vip: number;
  CoinVip: number;
}

type AuthResponse = {
  token: string;
  auth: boolean;
}

type SignInData = {
  memb___id: string;
  memb__pwd: string;
}

type LockPasswordResponse = {
  memb_guid: number;
  memb___id: string;
  LockPassword: number;
}

type AuthContextType = {
  user: User | null;
  auth: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  timer: number;
}

type AuthProviderType = {
  children: any
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderType) {
  
  const MySwal = withReactContent(Swal)
  const router = useRouter();
  const [ user, setUser ] = useState<User | null>(null);
  const auth = !!user;

  const signIn = async ({ memb___id, memb__pwd }: SignInData) => {
    
    await apiAccount.post<AuthResponse>('/account/login', {
      memb___id,
      memb__pwd
    }
  ).then(response => {
      const { token } = response.data
      apiAccount.defaults.headers.common['authorization'] = token;
      setCookie(undefined, '@muwebtools.token', token, {
        maxAge: 60 * 60 * 1, //1 Hour
      })
      setCookie(undefined, '@muwebtools.user', memb___id, {
        maxAge: 60 * 60 * 1, //1 Hour
      })

      MySwal.fire({
        title: "Logado com sucesso!",
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })

      setTimeout(() => {
        router.reload()
        router.push('/')
      }, 1500)

    }).catch( error => {
      return MySwal.fire({
        title: error.message,
        icon: 'error'
      })
    })
  }

  const signOut = async () => {
    destroyCookie({}, '@muwebtools.token');
    destroyCookie({}, '@muwebtools.user');

    MySwal.fire({
      title: "Deslogado com sucesso!",
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })

    setTimeout(() => {
      router.reload()
      router.push('/')
    }, 1500)

  }

  useEffect(() => {
    const { '@muwebtools.token': token } = parseCookies();
    const { '@muwebtools.user': user } = parseCookies();

    if(token) {
      apiAccount.defaults.headers.common['authorization'] = token;
      apiAccount.get<User>(`/accounts/user/${user}`)
      .then(response => {

        const user = response.data;
        setUser(user)
      }).catch(error => {
        destroyCookie({}, '@muwebtools.token');
        destroyCookie({}, '@muwebtools.user');
        router.reload()
        router.push('/')
      })
    }
  }, [])

  const [timeLeft, actions] = useCountDown(30 * 1000, 1000);
  let timer = parseInt((timeLeft).toFixed());

  useEffect(() => {

    const { ['@muwebtools.token']: token } = parseCookies();
    const { ['@muwebtools.user']: user } = parseCookies();
    if(!token) return

    async function setNewLockPass() {
      try {
        await apiAccount.get<LockPasswordResponse>(`/account/lockPassword/${user}`)
      } catch (error) {
        return
      }
    }

    const intervalId = setInterval(() => {
      actions.start()
      setNewLockPass()
    }, 30 * 1000) // in milliseconds
    return () => clearInterval(intervalId)

  }, [])

  return (
    <AuthContext.Provider value={{ user, auth, signIn, signOut, timer }}>
      {children}
    </AuthContext.Provider>
  )
}
