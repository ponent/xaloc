import React from 'react';
import { createStyles, Title, Text, Button, Container, useMantineTheme, Center } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: 120,
        paddingBottom: 80,

        '@media (max-width: 755px)': {
            paddingTop: 80,
            paddingBottom: 60,
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    dots: {
        position: 'absolute',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

        '@media (max-width: 755px)': {
            display: 'none',
        },
    },

    dotsLeft: {
        left: 0,
        top: 0,
    },

    title: {
        textAlign: 'center',
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        '@media (max-width: 520px)': {
            fontSize: 28,
            textAlign: 'left',
        },
    },

    description: {
        textAlign: 'center',

        '@media (max-width: 520px)': {
            textAlign: 'left',
            fontSize: theme.fontSizes.md,
        },
    },

    controls: {
        marginTop: theme.spacing.lg,
        display: 'flex',
        justifyContent: 'center',

        '@media (max-width: 520px)': {
            flexDirection: 'column',
        },
    },

    control: {
        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        '@media (max-width: 520px)': {
            height: 42,
            fontSize: theme.fontSizes.md,

            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },
}));

export const MyPodcastsEmpty = () => {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    return (
        <Container className={classes.wrapper} size={1400}>
            <div className={classes.inner}>
                <Title className={classes.title}>
                    Encara no est??s subscrit a cap <br />{' '}
                    <Text component="span" color={theme.colors.pink[5]} inherit>
                        Podcast
                    </Text>{' '}
                    o{' '}
                    <Text component="span" color={theme.colors.pink[5]} inherit>
                        Emissora de r??dio
                    </Text>
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" color="dimmed" className={classes.description}>
                        Troba els teus podcasts i emissores de r??dio
                    </Text>
                </Container>

                <Container p={0} size={600} mt={"xl"}>
                    <Center>
                        <Button
                            variant='gradient'
                            gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                            component={Link}
                            to={'/cercar'}
                            size={'xl'}
                        >
                            Cercar
                        </Button>
                    </Center>
                </Container>

            </div>
        </Container>
    );
}