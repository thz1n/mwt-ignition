import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { CharacterView } from '../../components/CharacterView';
import { LoginBox } from '../../components/LoginBox';
import { MyAccount } from '../../components/MyAccount';
import { AuthContext } from '../../contexts/AuthContext';
import { apiCharacter } from "../../services/api";
import styles from './styles.module.scss';

type GuildResponse = {
  G_Name: string;
  G_Mark: {
    data: number[];
  };
  G_Score: number;
  G_Master: string;
}

type CharacterBannerResponse = {
  Name: string;
  banner?: string;
}

type CharacterResponse = {
  Name: string;
  cLevel: number;
  Class: number;
  Strength: number;
  Dexterity: number;
  Vitality: number;
  Energy: number;
  Leadership: number;
  Life: number;
  MaxLife: number;
  Mana: number;
  MaxMana: number;
}

type CharacterPositionResponse = {
  position: number
}

export default function Character({ character, charPosition, guild, CharacterBanner}) {
  const { auth } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>{character.Name} | TOP {charPosition.position} </title>
      </Head>
      <main className={ styles.contentWrapper }>
        <CharacterView
          name={character.Name}
          cLevel={+character.cLevel}
          class={+character.Class}
          str={+character.Strength}
          agi={+character.Dexterity}
          vit={+character.Vitality}
          ene={+character.Energy}
          cmd={+character.Leadership}
          life={character.Life}
          maxLife={character.MaxLife}
          mana={character.Mana}
          maxMana={character.MaxMana}
          position={+charPosition.position}
          guildName={guild.G_Name}
          guildMark={guild.G_Mark.data}
          banner={CharacterBanner.banner}
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
  
  const { characterName } = context.query;
  
  const characterGuild = await apiCharacter.get<GuildResponse>(`/${characterName}/guild/`);
  const { G_Name, G_Mark } = characterGuild.data;

  const guild = {
    G_Name,
    G_Mark
  }

  const characterBanner = await apiCharacter.get<CharacterBannerResponse>(`/banner/${characterName}`);
  const { banner } = characterBanner.data;

  const CharacterBanner = {
    banner
  }

  const characterRankPosition = await apiCharacter.get<CharacterPositionResponse>(`rankposition/${characterName}`);

  const  position  = characterRankPosition.data

  const charPosition = {
    position
  }

  const getCharacterByName = await apiCharacter.get<CharacterResponse>(`character/${characterName}`);

  const {
    Name,
    cLevel,
    Class,
    Strength,
    Dexterity,
    Vitality,
    Energy,
    Leadership,
    Life,
    MaxLife,
    Mana,
    MaxMana
  } = getCharacterByName.data;

  const character = {
    Name,
    cLevel,
    Class,
    Strength,
    Dexterity,
    Vitality,
    Energy,
    Leadership,
    Life,
    MaxLife,
    Mana,
    MaxMana
  }

  return {
    props: {
      character,
      CharacterBanner,
      charPosition,
      guild
    }
  }
}
