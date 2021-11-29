import Link from 'next/link';
import { VscClose } from 'react-icons/vsc';
import { CharacterRankPosition } from '../CharacterRankPosition';
import { CharacterStatus } from '../CharacterStatus';
import { GuildLogo } from '../GuildLogo';
import { ManaBar, LifeBar } from '../LifeAndManaBar/';
import styles from './styles.module.scss'


export function CharacterView( props ) {

  console.log(`banner: ${props.banner}`)
  const generateAvatar = () => {
    return `/images/classes/${props.class}.png`
  };

  const generateBanner = (banner: string) => {
    return `/images/wallpapers/${banner}.jpg`
  };

  const verifyIfCharHaveGuild = (guildName: string) => {

    if(guildName === "NOGUILD") {
      return false
    }
    return true
  }

  return (
    <div className={styles.characterViewWrapper}>
      <div className={styles.characterBanner}>

        <div className={styles.characterBannerImage}>
          <img src={ !!props.banner ? generateBanner(props.banner) : generateBanner('default') } alt={props.name} />
        </div>

        <div className={styles.characterNameBox}>
          <h3>Level: {props.cLevel}</h3>
          <h1>{props.name}</h1>
        </div>
        { !!verifyIfCharHaveGuild(props.guildName) ? <GuildLogo name={props.guildName} logo={props.guildMark} />  : '' }
        <LifeBar life={props.life} maxLife={props.maxLife} />
        <ManaBar mana={props.mana} maxMana={props.maxMana} />
        <CharacterRankPosition position={props.position} />
        <CharacterStatus str={props.str} agi={props.agi} vit={props.vit} ene={props.ene} cmd={props.cmd} />
        <Link href={`/`} passHref>
          <div className={styles.closeButton}>
            <VscClose size={24} />
          </div>
        </Link>
      </div>
      <img src={ generateAvatar() } alt={props.name} />
    </div>
  )
}