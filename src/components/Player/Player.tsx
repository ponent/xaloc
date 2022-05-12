import React from 'react';
import { createStyles, Card, Image, Avatar, Text, Group, Slider, Stack, Container, Space, Center, LoadingOverlay, Loader } from '@mantine/core';
import { IPlayerState } from '../../store/player/reducer';
import { ApplicationState } from '../../type';
import { shallowEqual } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHover } from '@mantine/hooks';
import { doResumeAudio, doStopAudio, setProgressAudio } from '../../store/player/actionCreators';

import { ThemeIcon } from '@mantine/core';
import { PlayerPlay, PlayerPause } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
    margin: 0
  },

  audio_controls: {
    cursor: 'pointer'
  },

}));

export const Player = () => {
  const { classes } = useStyles();

  const player: IPlayerState = useSelector(
    (state: ApplicationState) => state.player,
    shallowEqual
  )

  const { hovered, ref } = useHover();

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

  const onChange = (value: number) => setProgressAudio(Math.round(value))
  const pause = () => doStopAudio()
  const resume = () => doResumeAudio()

  const playerSlider = <Slider
    defaultValue={player.progress}
    value={player.progress}
    min={0}
    max={player.duration == -1 ? 0 : Math.round(player.duration)}
    ref={ref}
    label={renderHHMMSSGivenSeconds(player.progress)}
    onChange={onChange}
    styles={{

    }}
    disabled={player.duration == -1}
  />

  return (
    player.url === "" ? <></> : 
    <Card withBorder radius="md" p={0} className={classes.card}>
      <LoadingOverlay visible={player.loading} />
      <Container px={15}>
        <Stack spacing={0}>
          <Stack align={"center"} py={15}>
            <ThemeIcon radius="xl" size="xl" className={classes.audio_controls} onClick={() => player.playing ? pause() : resume()}>
              {player.playing ? <PlayerPause /> : <PlayerPlay />}
            </ThemeIcon>
          </Stack>
          <Stack>
            {playerSlider}
          </Stack>
          <Group position={"left"} py={15}>
            <Stack>
              <Avatar size={40} src={player.icon} />
            </Stack>
            <Stack spacing={0}>
              <Text className={classes.title} mt="xs">
                {player.duration == -1 ? <Loader variant="bars" size={10} color={"dark"} /> : <></>} {player.title}
              </Text>
              <Text size="xs" color="dimmed">
                {renderHHMMSSGivenSeconds(player.progress)}
                {player.duration != -1 ? " | " + renderHHMMSSGivenSeconds(player.duration) : ""}
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Container>
    </Card>
  );
}