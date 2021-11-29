import Link from 'next/link'
import { apiCharacter } from '../../services/api';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss'

type Character = {
  Name: string;
  cLevel: Number;
  Class: Number;
}

export function CharacterList() {

  const [characters, setCharacters] = useState<Character[]>([])
  
  useEffect(() => {
    apiCharacter.get<Character[]>('characters').then(response => {
      setCharacters(response.data)
    })
  }, []);

  const Generateavatar = ( charClass: string ) => {
    return `/images/classes/${charClass}.jpg`
  };

  return (
    <div className={ styles.characterListWrapper }>
      <section>
      <h2>Character List</h2>
        <ul className={styles.characterList}>

        { characters.map(char => {
          return (
            <li key={char.Name} className={styles.character}>
              <Link href={`/character/${char.Name}`} passHref>
                <div className={styles.characterUser} >
                  <div className={styles.userImage}>
                    <img src={ Generateavatar(char.Class.toString()) } alt={char.Name} />
                  </div>
                  <span>{char.Name} - [ {char.cLevel} ]</span>
                </div>
              </Link>
            </li>
          )
        })}
        </ul>
      </section>
    </div>
  )
}