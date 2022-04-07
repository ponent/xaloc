import * as React from "react";
import {Suspense} from "react";
import {AudioOutlined, DashboardOutlined, NotificationOutlined, TeamOutlined} from "@ant-design/icons";
import ArticleIndex from "../ArticleIndex";
import {Col, Menu, Row, Space} from "antd";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import ArticleDetail from "../ArticleDetail";
import ArticleList from "../ArticleList";
import Inici from "../Inici/Inici";
import PlayerComponent from "../Player/Player";

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
        icon: <DashboardOutlined/>,
        submenus: []
    },
    {
        name: "Podcasts",
        url: "/podcasts",
        element: <ArticleIndex/>,
        icon: <AudioOutlined/>,
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
        icon: <TeamOutlined/>,
        submenus: []
    },
    {
        name: "Emissores",
        url: "/emissores",
        element: <Suspense fallback={<span>Carregant..</span>}><NotImplemented></NotImplemented></Suspense>,
        icon: <NotificationOutlined/>,
        submenus: []
    },
]

export const MainMenu: React.FC = () => {

    const {pathname} = useLocation();

    return (
        <Row>
            <Col span={24}>
                <Menu theme="dark" mode="horizontal" selectedKeys={[pathname.split('/')[1]]}>
                    {
                        MenuItems.map(
                            (menu: IMenuItem) => <Menu.Item key={`${menu.url.split('/')[1]}`}>
                                <span style={{marginRight: "10px"}}>{menu.icon}</span>
                                <Link to={`${menu.url}`}>{`${menu.name}`}</Link>
                            </Menu.Item>
                        )
                    }
                </Menu>
            </Col>
            { /* <Col span={6}>
                <PlayerComponent />
            </Col> */ }
        </Row>
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