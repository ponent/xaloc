import * as React from "react";
import {Suspense} from "react";
import ArticleIndex from "../ArticleIndex";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import ArticleDetail from "../ArticleDetail";
import ArticleList from "../ArticleList";
import Inici from "../Inici/Inici";

const NotImplemented = React.lazy(() => import("../NotImplemented"));

interface IMenuItem {
    name: string,
    url: string,
    element: any,
    icon: any,
    submenus: IMenuItem[]
}

const MenuItems: IMenuItem[] = [
    {
        name: "Inici",
        url: "/",
        element: <Inici/>,
        icon: <></>,
        submenus: []
    },
    {
        name: "Podcasts",
        url: "/podcasts",
        element: <ArticleIndex/>,
        icon: <></>,
        submenus: [
            {
                name: "Podcast List",
                url: "",
                element: <ArticleList/>,
                icon: null,
                submenus: []
            },
            {
                name: "Podcast Detail",
                url: ":articleId",
                element: <ArticleDetail/>,
                icon: null,
                submenus: []
            }
        ]
    },
    {
        name: "Autors",
        url: "/autors",
        element: <Suspense fallback={<span>Carregant..</span>}><NotImplemented></NotImplemented></Suspense>,
        icon: <></>,
        submenus: []
    },
    {
        name: "Emissores",
        url: "/emissores",
        element: <Suspense fallback={<span>Carregant..</span>}><NotImplemented></NotImplemented></Suspense>,
        icon: <></>,
        submenus: []
    },
]

export const MainMenu: React.FC = () => {

    const {pathname} = useLocation();

    return (
        <></>
    )

}

const GenerateMenu = (menu: any) => {
    return (
        <Route key={`${menu.url}`} path={`${menu.url}`} element={menu.element}>
            {menu.submenus.map((submenu: IMenuItem) => GenerateMenu(submenu))}
        </Route>
    )
}

export const MainMenuRoutes: React.FC = () => (
    <Routes>{MenuItems.map((menu: IMenuItem) => GenerateMenu(menu))}</Routes>
)