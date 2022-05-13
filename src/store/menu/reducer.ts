import {ReduxAction} from "../../type";
import { AccessPoint, Gauge, Icon, Radio, Search } from "tabler-icons-react";
import React from "react";
import Inici from '../../components/Inici/Inici'
import ArticleList from "../../components/ArticleList";
import NotImplemented from "../../components/NotImplemented";
import { SearchModal } from "../../components/Search/SearchModal";

const menuList: Array<IMenuItem> = [
    {
        label: 'Dashboard',
        icon: Gauge,
        link: '/',
        element: Inici
    },
    {
        label: 'Podcasts',
        icon: AccessPoint,
        link: '/podcasts',
        element: ArticleList
    },
    {
        label: 'Emissores',
        icon: Radio,
        link: '/emissores',
        element: NotImplemented
    },
    {
        label: 'Cercar',
        icon: Search,
        link: '/search',
        element: SearchModal
    },
  ]

export interface IMenuItem {
    label: string;
    icon: Icon;
    link: string;
    submenus?: Array<IMenuItem>;
    element: React.FC;
}

export interface IMenuState {
    menuList: Array<IMenuItem>;
    selectedLabel: string;
}

const initialState: IMenuState = {
    selectedLabel: menuList[0].label,
    menuList: menuList
}

export type UpdateMenuSelectedAction = {
    type: string,
    selectedMenu: IMenuItem
}

const reducer = (
    state: IMenuState = initialState,
    action: ReduxAction
): IMenuState => {
    switch (action.type) {
        
    }
    return state
}

export default reducer