import {ReduxAction} from "../../type";
import Inici from '../../components/Inici/Inici'
import NotImplemented from "../../components/NotImplemented";
import { Search } from "../../components/Search/Search";
import { SearchResultDetail } from "../../components/Search/SearchResultDetail";
import { SearchResults } from "../../components/Search/SearchResults";

const menuList: Array<IMenuItem> = [
    {
        label: 'Dashboard',
        icon: 'Gauge',
        link: '/',
        element: Inici
    },
    {
        label: 'Podcasts',
        icon: 'AccessPoint',
        link: '/podcasts',
        element: NotImplemented
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
        link: '/search',
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
  ]

export interface IMenuItem {
    label: string;
    icon: string;
    link: string;
    submenus?: Array<IMenuItem>;
    element: any;
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