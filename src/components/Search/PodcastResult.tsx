import React from 'react';
import { createStyles, Card, Text, Group, RingProgress, Button, ActionIcon } from '@mantine/core';
import { Heart } from 'tabler-icons-react';
import { PodcastEpisode } from '../../store/search/reducer';
import { useAppDispatch } from '../../hooks';
import { playAudio } from '../../store/player/actionCreators';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  like: {
    color: theme.colors.red[6],
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface CardWithStatsProps {
  episode: PodcastEpisode;
}

export function PodcastResult({episode} : CardWithStatsProps) {
  const { classes } = useStyles();

  const dispatch = useAppDispatch()

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

  return (
    <Card withBorder p="lg" className={classes.card}>
      <Group position="apart">
        <Text size="sm" weight={700} className={classes.title}>
          {episode.trackName}
        </Text>
        <Group spacing={5}>
          <Text size="xs" color="dimmed">
            {renderHHMMSSGivenSeconds(episode.trackTimeMillis/1000)}
          </Text>
          <RingProgress size={18} sections={[{ value: 80, color: 'blue' }]} />
        </Group>
      </Group>
      <Text mt="sm" mb="md" color="dimmed" size="xs">
        {episode.description}
      </Text>

      <Group>
        <Button radius="md" style={{ flex: 1 }} onClick={() => dispatch(playAudio(episode.episodeUrl, episode.trackName, episode.artworkUrl600))}>
          Reproduïr
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <Heart size={18} className={classes.like} />
        </ActionIcon>
      </Group>
    </Card>
  );
}