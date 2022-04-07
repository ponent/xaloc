import * as actionTypes from "./actionTypes"
import { v5 as uuid } from 'uuid'
import {AddArticleAction, ArticleState, IArticle, ReduxAction, RemoveArticleAction} from "../type";

const initialState: ArticleState = {
    selected: {
        value: uuid("https://api.audioteca.rac1.cat/embed/a8a146eb-f355-4b4e-852f-7590c1e534a8", "1b671a64-40d5-491e-99b0-da01ff1f3341"),
    },
    list: [
        {
            id: {value: uuid("https://25453.live.streamtheworld.com/RAC_1.mp3", "1b671a64-40d5-491e-99b0-da01ff1f3341")},
            title: "Rac1 - Directe",
            body: "-",
            url: "https://25453.live.streamtheworld.com/RAC_1.mp3",
            icon: "https://www.rac1.cat/rsc/images/logo.jpg?v=604da13b1432ea8d9661a007d8e683ee1aec9cda"
        },
        {
            id: {value: uuid("https://audioserver.rac1.cat/get/0f57fa52-aa4f-4627-bc2c-9332e3f5b4f3/1/2022-03-22-versio-rac1-entrevista-jordi-bosch.mp3", "1b671a64-40d5-491e-99b0-da01ff1f3341")},
            title: "Versió Rac1 - Entrevista",
            body: "Jordi Bosch",
            url: "https://audioserver.rac1.cat/get/0f57fa52-aa4f-4627-bc2c-9332e3f5b4f3/1/2022-03-22-versio-rac1-entrevista-jordi-bosch.mp3",
            icon: "https://www.rac1.cat/rsc/images/logo.jpg?v=604da13b1432ea8d9661a007d8e683ee1aec9cda"
        },
        {
            id: {value: uuid("https://audioserver.rac1.cat/get/6a4f04f5-aec4-4159-b9b4-7634b1d99924/1/2022-03-22-versio-rac1-economia-economia-amb-xavier-sala-i-martin.mp3", "1b671a64-40d5-491e-99b0-da01ff1f3341")},
            title: "Versió Rac1 - Economia",
            body: "Economia amb Xavier Sala i Martin",
            url: "https://audioserver.rac1.cat/get/6a4f04f5-aec4-4159-b9b4-7634b1d99924/1/2022-03-22-versio-rac1-economia-economia-amb-xavier-sala-i-martin.mp3",
            icon: "https://www.rac1.cat/rsc/images/logo.jpg?v=604da13b1432ea8d9661a007d8e683ee1aec9cda"
        },
        {
            id: {value: uuid("https://audioserver.rac1.cat/get/c703cdfe-68ad-402d-bfcd-c7f0a0040fba/1/2022-03-22-islandia-xavi-bosch-xavi-bosch.mp3", "1b671a64-40d5-491e-99b0-da01ff1f3341")},
            title: "Islandia - Xavier Bosch",
            body: "Xavier Bosch",
            url: "https://audioserver.rac1.cat/get/c703cdfe-68ad-402d-bfcd-c7f0a0040fba/1/2022-03-22-islandia-xavi-bosch-xavi-bosch.mp3",
            icon: "https://www.rac1.cat/rsc/images/logo.jpg?v=604da13b1432ea8d9661a007d8e683ee1aec9cda"
        },
        {
            id: {value: uuid("https://www.ivoox.com/sotana-252_mf_83832782_feed_1.mp3", "1b671a64-40d5-491e-99b0-da01ff1f3341")},
            title: "La Sotana 255",
            body: "La Sotana 255",
            url: "https://www.ivoox.com/sotana-252_mf_83832782_feed_1.mp3",
            icon: "https://yt3.ggpht.com/ytc/AKedOLT3TSHWmlXY25pa5n1aniSLp7N-4yU0FPcfjuQQgg=s900-c-k-c0x00ffffff-no-rj"
        },
    ],
}

const reducer = (
    state: ArticleState = initialState,
    action: ReduxAction
): ArticleState => {
    switch (action.type) {
        case actionTypes.ADD_ARTICLE:
            const AddArticle = action as AddArticleAction;
            const newArticle: IArticle = {
                id: {value: uuid("#","1b671a64-40d5-491e-99b0-da01ff1f3341")},
                title: AddArticle.article.title,
                body: AddArticle.article.body,
                url: "#",
                icon: "#"
            }
            return {
                ...state,
                list: state.list.concat(newArticle),
            }
        case actionTypes.REMOVE_ARTICLE:
            const RemoveArticle = action as RemoveArticleAction;
            const updatedArticles: IArticle[] = state.list.filter(
                article => article.id !== RemoveArticle.id
            )
            return {
                ...state,
                list: updatedArticles,
            }
    }
    return state
}

export default reducer