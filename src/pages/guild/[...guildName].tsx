import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { apiCharacter } from '../../services/api'
import { GuildView } from '../../components/GuildView'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { MyAccount } from '../../components/MyAccount'
import { LoginBox } from '../../components/LoginBox'
import styles from './styles.module.scss'

type GuildResponse = {
  G_Name: string;
  G_Mark: {
    data: number[];
  };
  G_Score: number;
  G_Master: string;
}

export default function Guild({guild}) {
  const { auth } = useContext(AuthContext)
  return (
    <>
      <Head>
        <title>{guild.G_Name} </title>
      </Head>
      <main className={ styles.contentWrapper }>
        <GuildView
          guildName={guild.G_Name}
          guildMark={guild.G_Mark.data}
          guildScore={guild.G_Score}
          guildMaster={guild.G_Master}
        />
        <div>
          { !!auth ? <MyAccount /> : <LoginBox /> }
          asdasd
        </div>
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { guildName } = context.query;
  
  const getGuild = await apiCharacter.get<GuildResponse>(`/guild/${guildName}/`)

  const { G_Name, G_Mark, G_Score, G_Master } = getGuild.data

  const guild = {
    G_Name,
    G_Mark,
    G_Score,
    G_Master
  }

  return {
    props: {
      guild
    }
  }
}
