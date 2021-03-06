import React, { useState } from "react"
import "./App.css"
import { Group, createStyles, UnstyledButton, Center } from '@mantine/core';
import { BrandGithub, } from 'tabler-icons-react';
import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme, } from '@mantine/core';
import { LeftMenu, MainMenuRoutes } from "./components/Menu/LeftMenu";
import { useAppDispatch } from "./hooks";
import { loadSubscriptions } from "./store/subscriptions/reducer";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    links: {
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xs,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        //borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
    control: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 1000,
        paddingLeft: theme.spacing.sm,
        paddingRight: 4,
        width: 136,
        height: 36,
    },

    iconWrapper: {
        height: 28,
        width: 28,
        borderRadius: 28,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.dark[4],
        color: theme.colorScheme === 'dark' ? theme.black : theme.colors.blue[2],
    },

    value: {
        lineHeight: 1,
    },
}));

const App: React.FC = () => {

    const theme = useMantineTheme();
    //const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const [opened, setOpened] = useState(false);
    const { classes } = useStyles();

    const dispatch = useAppDispatch()
    dispatch(loadSubscriptions())

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={<LeftMenu />}
            /*aside={
              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                  <Text>Application sidebar</Text>
                </Aside>
              </MediaQuery>
            }*/
            /*footer={
              <Footer height={60} p="md">
                Application footer
              </Footer>
            }*/
            header={
                <Header height={70} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Group position={"apart"} style={{ width: "100%" }}>
                            <div>
                                <Text component={Link} to={'/'} size={'xl'} weight={700} sx={{ lineHeight: 1 }} color={theme.colors.pink[7]}>
                                    Xaloc
                                </Text>
                                <Text size="sm" color={theme.colors.pink[4]} weight={500} sx={{ lineHeight: 1 }} mt={3}>
                                    R??dio en directe i podcasts
                                </Text>
                            </div>
                            <div>
                                <Group position="center" my="xl">
                                    <UnstyledButton
                                        aria-label="Toggle theme"
                                        className={classes.control}
                                        title="Go to GitHub repository"
                                    >
                                        <Text size="sm" className={classes.value}>
                                            Codi Font
                                        </Text>

                                        <Center className={classes.iconWrapper}>
                                            <BrandGithub size={18} />
                                        </Center>
                                    </UnstyledButton>
                                </Group>
                            </div>
                        </Group>
                    </div>
                </Header>
            }
        >
            <MainMenuRoutes />
        </AppShell>

    )
}

export default App