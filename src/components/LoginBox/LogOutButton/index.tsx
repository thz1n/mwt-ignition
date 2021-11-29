import { VscSignOut } from 'react-icons/vsc'
import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"

export function LogOutButton() {

  const { signOut } = useContext(AuthContext)

  return (
    <button type="button" onClick={() => signOut()}>
      <VscSignOut size={24} /> Sair
    </button>
  ) 
}