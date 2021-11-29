import { VscClose } from 'react-icons/vsc'
import Link from 'next/link'
import { GuildLogo } from '../GuildLogo'
import styles from './styles.module.scss'
import { GuildScore } from '../GuildScore'
import { useEffect, useState } from 'react'
import { apiCharacter } from '../../services/api'

type Character = {
  Name: string;
  G_Level: Number;
  G_Status: Number;
}

export function GuildView(props) {

  const guildName = props.guildName;

  const [characters, setCharacters] = useState<Character[]>([])
  useEffect(() => {
    apiCharacter.get<Character[]>(`/guild/${guildName}/members/`).then(response => {
      setCharacters(response.data)
    })
  }, []);

  const Generateavatar = ( charClass: string ) => {
    return `/images/classes/${charClass}.jpg`
  };

  return (
    <div className={styles.guildViewWrapper}>
      <div className={styles.guildBanner}>
        <div className={styles.guildNameBox}>
          {/* <h3>Guild Master: {props.G_Master}</h3> */}
          <h3>MASTER: {props.guildMaster}</h3>
          <h1>{guildName}</h1>
        </div>
        <GuildScore score={props.guildScore} />
        <Link href={`/`} passHref>
          <div className={styles.closeButton}>
            <VscClose size={24} />
          </div>
        </Link>
      </div>

      <div className={styles.frameGuildLogo}>
        <GuildLogo logo={props.guildMark} />
      </div>

      <div className={ styles.characterListWrapper }>
        <section>
        <h2>Guild members</h2>
          <ul className={styles.characterList}>

          { characters.map(char => {
            return (
              <li key={char.Name} id={`status_${char.G_Status}`} className={styles.character}>
                <style jsx>
                  {`#status_128 {
                      border: 1px solid #ff008a;
                    }`}
                </style>
                <Link href={`/character/${char.Name}`} passHref>
                  <div className={styles.characterUser} >
                    <div className={styles.userImage}>
                      <img src={ Generateavatar(char.G_Level.toString()) } alt={char.Name} />
                    </div>
                    <span>{char.Name}</span>
                  </div>
                </Link>
              </li>
            )
          })}
          </ul>
        </section>
      </div>
    </div>
  )

}