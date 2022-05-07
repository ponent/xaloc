import React, { useState } from "react"
import "./App.css"
import { MainMenuRoutes } from "./components/Menu/MainMenu";

import { Group, ScrollArea, createStyles, ColorScheme, UnstyledButton, Center } from '@mantine/core';


import {
    Gauge,
    BrandGithub,
    Radio,
    AccessPoint,
    User
} from 'tabler-icons-react';

import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
} from '@mantine/core';
import { LinksGroup } from "./components/Menu/NavBarLinksGroup";
import { NewPlayer } from "./components/Player/NewPlayer";

const mockdata = [
    /*{
        label: 'Dashboard', 
        icon: Gauge
    },*/
    {
        label: 'Podcasts',
        icon: AccessPoint,
        initiallyOpened: true,
        links: [
            { label: 'Visió General', link: '/podcasts', isSelected: true },
            { label: 'Economia', link: '/' },
            { label: 'Ciència', link: '/' },
        ],
    },
    {
        label: 'Emissores', 
        icon: Radio
    },
    {
        label: 'Autors', 
        icon: User
    },
    /*{
        label: 'Market news',
        icon: Notes,
        initiallyOpened: true,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Forecasts', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
    {
        label: 'Releases',
        icon: CalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: PresentationAnalytics },
    { label: 'Contracts', icon: FileAnalytics },
    { label: 'Settings', icon: Adjustments },
    {
        label: 'Security',
        icon: Lock,
        links: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },*/
];

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

    /* const dispatch: Dispatch<any> = useDispatch()
     const updatePlayerProgress = () : NodeJS.Timeout => {
         dispatch(updateProgressAudio())
         return setTimeout(updatePlayerProgress, 1000)
     }

     useEffect(() => {
         updatePlayerProgress()
     }) */

    const theme = useMantineTheme();
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const [opened, setOpened] = useState(false);
    const { classes } = useStyles();
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    const navv = <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} style={{ paddingTop: 0, paddingBottom: 0 }}>
        {/*<Navbar.Section className={classes.header}>
            <Group position="apart">
                <Image src="https://media-exp1.licdn.com/dms/image/C4D0BAQHIru0M5qLD1w/company-logo_200_200/0/1638778603913?e=2147483647&v=beta&t=8se_hQ8RBBNiSuq0fhv6QMSMReDiKvOgWEjXQEe8mS8" height={40} />
                <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
            </Group>
    </Navbar.Section>*/}

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer} style={{ padding: 10 }}>
            <NewPlayer
                image="https://images.unsplash.com/photo-1639148604826-8c8afc2aefe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                author={{
                    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIbMzLfzlSGzVHTGSHqMfBDc6Gq5MnqkPq-iujmxn1OKylRtrPGMkFqOP_Lwu8fzxQb2E&usqp=CAU",
                    name: "Versió Rac1"
                }}
                category="Live Radio"
                date={"10-10-2022"}
                title="Economia | Xavier Sala Martín"
            />
        </Navbar.Section>
    </Navbar>

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
            navbar={navv}
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

                        <Group position={"apart"} style={{width: "100%"}}>
                            <div>
                                <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                                    Xaloc
                                </Text>
                                <Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
                                    Ràdio en directe i podcasts
                                </Text>
                            </div>
                            <div>
                            <Group position="center" my="xl">
                                <UnstyledButton
                                    aria-label="Toggle theme"
                                    className={classes.control}
                                    //onClick={() => toggleColorScheme()}
                                    title="Ctrl + J"
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
                            {/*<div>
                                <Group spacing={10}>
                                    <span>Source Code</span>
                                    <Link to="https://github.com/ponent/xaloc">
                                        <ThemeIcon variant="filled" size={30}>
                                            <BrandGithub size={18} />
                                        </ThemeIcon>
                                    </Link>
                                </Group>
                            </div>*/}
                        </Group>
                    </div>
                </Header>
            }
        >
            <MainMenuRoutes/>
        </AppShell>
        /*<main>
            <Layout style={{height: "100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    <div className="logo"/>
                    <MainMenu/>
                </Header>
                <Content className="site-layout" style={{marginTop: 64}}>

                    <Player/>

                    <div style={{padding: '0 50px'}}>
                        <Breadcrumbs/>
                        <MainMenuRoutes/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}><span></span></Footer>
            </Layout>
        </main>*/
    )
}

export default App