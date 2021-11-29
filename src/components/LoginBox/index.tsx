import { VscSignIn } from 'react-icons/vsc'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

type SignInType = {
  memb___id: string;
  memb__pwd: string;
}
export function LoginBox() {

  const { register, handleSubmit } = useForm();

  const { signIn } = useContext(AuthContext)

  const handleSignIn = async (data: SignInType) => {
    await signIn(data)
  }


  return (
    <div className={styles.loginBoxWrapper}>
      <h2>Painel do Usuário</h2>
        <form onSubmit={ handleSubmit(handleSignIn) }>
          <div className={styles.imputGroup}>
            <input
              {...register('memb___id')}
              name='memb___id'
              type="text"
              className={styles.inputUser}
              placeholder="Your Account" 
              autoComplete="off"
              required
            />
            <input
              {...register('memb__pwd')}
              name='memb__pwd'
              type="password"
              className={styles.inputUser}
              placeholder="Your Password"
              autoComplete="off"
              required
            />
          </div>
          <button type='submit' className={styles.signIn}>
            <VscSignIn size={24}/>
            Entrar
          </button>
      </form>
    </div>
  )
}