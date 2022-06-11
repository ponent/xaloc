import React from 'react';
import { Button, Loader } from '@mantine/core';
import { IPodcastResult, PodcastEpisode } from '../../store/search/reducer';
import { useAppDispatch } from '../../hooks';
import { doStopAudio, playAudio } from '../../store/player/actionCreators';
import { formatDistance } from 'date-fns';
import { PlayerPlay } from 'tabler-icons-react';
import { IPlayerState } from '../../store/player/reducer';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../type';
import { shallowEqual } from 'react-redux';
import { ca } from 'date-fns/locale'

interface CardWithStatsProps {
  episode: PodcastEpisode;
  info: IPodcastResult
}

export function PodcastResult({ episode, info }: CardWithStatsProps) {

  const dispatch = useAppDispatch()

  const player: IPlayerState = useSelector(
    (state: ApplicationState) => state.player,
    shallowEqual
  )

  const lastPublish = (dd: string) => {
    try {
      return formatDistance(new Date(dd), new Date(), { addSuffix: true, locale: ca })
    } catch {
      return dd
    }
  }

  const renderHHMMSSGivenSeconds = (seconds: number) => {
    const date = new Date(0);
    try {
      const roundedSeconds = Math.round(seconds)
      date.setSeconds(roundedSeconds);
      return date.toISOString().substr(11, 8);
    } catch (e) {
    }
    return "00:00:00"
  }

  const playButton = <Button
    type="submit"
    variant="gradient"
    fullWidth
    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
    onClick={() => dispatch(playAudio(episode.episodeUrl, episode.trackName, episode.artworkUrl600))}
  >
    <PlayerPlay size={15} />
  </Button>

  const playingButton = <Button
    variant="gradient"
    fullWidth
    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
    onClick={() => doStopAudio()}
  >
    <Loader variant="bars" size={20} color={'white'} />
  </Button>

  return <tr key={`row-${episode.trackId}`}>
    <td width={60}>
      {(player.url === episode.episodeUrl && player.playing) ? playingButton : playButton}
    </td>
    <td>
      {episode.trackName}
    </td>
    <td>
      <Button
        variant='outline'
        color='pink'
      >Més informació</Button>
    </td>
    <td>
      {lastPublish(episode.releaseDate)}
    </td>
    <td>
      {renderHHMMSSGivenSeconds(episode.trackTimeMillis / 1000)}
    </td>
  </tr>

}