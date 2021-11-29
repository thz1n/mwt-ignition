import styles from './styles.module.scss';
import Link from 'next/link'


export function GuildLogo( props ) {

  let guildName = props.name;
  let guildLogo = props.logo;
  const makeGuildMark = (gmark : any) => {
    
    const logo = gmark.map((item: any) => {
      item = item.toString(16).split("");
      return item;
    }).join();

    const pixel = logo.toString().split(",");

    const GuildLogo = pixel.map((item: string) => {
      if (item == '0') { item = '' }
      if (item == '1') { item = '#000000' }
      if (item == '2') { item = '#8c8a8d' }
      if (item == '3') { item = '#ffff00' }
      if (item == '4') { item = '#fe0000' }
      if (item == '5') { item = '#ff8a00' }
      if (item == '6') { item = '#ffffff' }
      if (item == '7') { item = '#8cff01' }
      if (item == '8') { item = '#00ff00' }
      if (item == '9') { item = '#01ff8d' }
      if (item == 'a') { item = '#00ffff' }
      if (item == 'b') { item = '#008aff' }
      if (item == 'c') { item = '#0000fe' }
      if (item == 'd') { item = '#8c00ff' }
      if (item == 'e') { item = '#ff00fe' }
      if (item == 'f') { item = '#ff008c' }
      
      return item;
    });

    return GuildLogo.map((item, index) => {
      return (
          <div key={index} className={styles.pixel}>
            <style jsx>{`background-color: ${item}`}</style>
          </div>
          
      )
    });

 }
 return !!guildName ? (
   <Link href={`/guild/${guildName}`}>
    <a className={styles.guildWrapper}>
        <span>{ guildName }</span>
        <div className={styles.guildMarkWrapper}>{ makeGuildMark(guildLogo)}</div>
    </a>
   </Link>
  ) : (
    <div>
      <div>{makeGuildMark(guildLogo)}</div>
    </div>
  )
}