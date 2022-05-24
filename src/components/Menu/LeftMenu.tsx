import React from 'react';
import { createStyles, Navbar } from '@mantine/core';
import { Player } from '../Player/Player';
import { IMenuItem, IMenuState } from '../../store/menu/reducer';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../type';
import { shallowEqual } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
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
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
  
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  
          [`& .${icon}`]: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
          },
        },
      },
  
      linkIcon: {
        ref: icon,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
      },
  
      linkActive: {
        '&, &:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
              : theme.colors[theme.primaryColor][0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
          [`& .${icon}`]: {
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
          },
        },
      },
    };
  });



export const LeftMenu = () => {
    
    const { classes, cx } = useStyles();


    const menu: IMenuState = useSelector(
        (state: ApplicationState) => state.menu,
        shallowEqual
    )
    
    
    const links = menu.menuList.map((item: IMenuItem) => {
      const Icon = require("tabler-icons-react")[item.icon]
        return <NavLink
            className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive }) }
            key={item.label}
            to={item.link}
          >
            <Icon className={classes.linkIcon} />
            <span>{item.label}</span>
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

const GenerateMenu = (menu: IMenuItem) => {
    return (
        <Route key={`${menu.link}`} path={`${menu.link}`} element={<menu.element />}>
            {menu.submenus !== undefined ? menu.submenus.map((submenu: IMenuItem) => GenerateMenu(submenu)) : <></>}
        </Route>
    )
}

export const MainMenuRoutes = () => {

    const menu: IMenuState = useSelector(
        (state: ApplicationState) => state.menu,
        shallowEqual
    )

    return <Routes>{menu !== undefined ? menu.menuList.map((menu: IMenuItem) => GenerateMenu(menu)) : <></>}</Routes>
}