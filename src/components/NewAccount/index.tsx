import { VscSignIn } from 'react-icons/vsc'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'
import { apiAccount } from '../../services/api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'


type AccountType = {
  memb___id: string;
  memb__pwd: string;
  memb_name: string;
  sno__numb: string;
  mail_addr: string;
}


export const NewAccount = () => {

  const { register, handleSubmit } = useForm();
  const MySwal = withReactContent(Swal)

  const handleNewAccount = async ({ memb___id, memb__pwd, memb_name, sno__numb, mail_addr }: AccountType) => {
    await apiAccount.post('/account/new', {
      memb___id,
      memb__pwd,
      memb_name,
      sno__numb: '111111111'+sno__numb,
      mail_addr
    }).then(res => {
      return MySwal.fire({
        title: 'Welcome to MUGNNX!',
        icon: 'success',
        showConfirmButton: false,
        timer: 3500
      })
    }).catch(err => {
      return MySwal.fire({
        title: err,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  return (
    <div className={styles.NewAccountWrapper}>
      <h2>New Account</h2>
      <form onSubmit={handleSubmit(handleNewAccount)}>
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
          <input
            {...register('memb_name')}
            name='memb_name'
            type="text"
            className={styles.inputUser}
            placeholder="Your Nick Name"
            autoComplete="off"
            required
          />
          <input
            {...register('sno__numb')}
            name='sno__numb'
            type="text"
            className={styles.inputUser}
            placeholder="Secret Number"
            maxLength={9}
            minLength={9}
            autoComplete="off"
            required
          />
          <input
            {...register('mail_addr')}
            name='mail_addr'
            type="email"
            className={styles.inputUser}
            placeholder="Your mail address"
            autoComplete="off"
            required
          />
        </div>
        <button type='submit' className={styles.submit}>
          <VscSignIn size={24}/>
          Entrar
        </button>
      </form>
    </div>
  )
}


