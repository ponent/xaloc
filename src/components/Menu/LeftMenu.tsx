import React from 'react';
import { Badge, createStyles, Group, Indicator, Navbar, Text, useMantineTheme } from '@mantine/core';
import { Player } from '../Player/Player';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../type';
import { shallowEqual } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import NotImplemented from '../NotImplemented';
import { PodcastsIndex } from '../Podcasts/PodcastsIndex';
import { MyPodcasts } from '../Podcasts/MyPodcasts';
import { PodcastDetail } from '../Podcasts/PodcastDetail';
import { Search } from '../Search/Search';
import { SearchResults } from '../Search/SearchResults';
import { SearchResultDetail } from '../Search/SearchResultDetail';
import { SettingsIndex } from '../Settings/SettingsIndex';

interface IMenuItem {
  label: any;
  icon: string;
  link: string;
  submenus?: Array<IMenuItem>;
  element: any;
}

const menuList: Array<IMenuItem> = [
  {
    label: 'Dashboard',
    icon: 'Radio',
    link: '/',
    element: NotImplemented
  },
  {
    label: 'Els meus Podcasts',
    icon: 'AccessPoint',
    link: '/podcasts',
    element: PodcastsIndex,
    submenus: [
      {
        label: 'My Podcasts',
        icon: 'Search',
        link: '',
        element: MyPodcasts
      },
      {
        label: 'Podcast Detail',
        icon: 'Search',
        link: ':platform/:podcastId',
        element: PodcastDetail
      },
    ]
  },
  {
    label: 'Emissores',
    icon: 'Radio',
    link: '/emissores',
    element: NotImplemented
  },
  {
    label: 'Cercar',
    icon: 'Search',
    link: '/cercar',
    element: Search,
    submenus: [
      {
        label: 'Resultats',
        icon: 'Search',
        link: '',
        element: SearchResults
      },
      {
        label: 'Resultat de cerca',
        icon: 'Search',
        link: ':podcastId',
        element: SearchResultDetail
      },
    ]
  },
  {
    label: 'Ajustos',
    icon: 'Settings',
    link: '/ajustos',
    element: SettingsIndex
  },
]

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      paddingBottom: 10
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.pink[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.pink[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.pink[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors.pink[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors.pink[7],
        [`& .${icon}`]: {
          color: theme.colors.pink[7]
        },
      },
    },
  };
});



export const LeftMenu = () => {

  const { classes, cx } = useStyles();

  const links = menuList.map((item: IMenuItem) => {
    const Icon = require("tabler-icons-react")[item.icon]
    return <NavLink
      className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive })}
      key={item.label}
      to={item.link}
    >
        <Icon className={classes.linkIcon} />
        <Text>{item.label}</Text>
    </NavLink>
  });

  return (
    <>
      <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 250, lg: 350 }} style={{ paddingTop: 10, paddingBottom: 0 }}>
        <Navbar.Section grow>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <Player />
        </Navbar.Section>
      </Navbar>
    </>
  );


}

const GenerateMenu = (menu: IMenuItem, parent?: IMenuItem) => (
  <Route key={menu.link} path={menu.link} element={<menu.element />} index={parent !== undefined && menu.link === ''}>
    {menu.submenus !== undefined ? menu.submenus.map((submenu: IMenuItem) => GenerateMenu(submenu, menu)) : <></>}
  </Route>
)

export const MainMenuRoutes = () => {
  return <Routes>
    ...{menuList !== undefined ? menuList.map((menu: IMenuItem) => GenerateMenu(menu)) : <></>}
  </Routes>
}