import * as actionTypes from "./actionTypes"
import {REMOVE_ARTICLE} from "./actionTypes"
import {AddArticleAction, DispatchType, IArticle, IArticleId, RemoveArticleAction} from "../type";

export function addArticle(article: IArticle) {
    const action: AddArticleAction = {
        type: actionTypes.ADD_ARTICLE,
        article,
    }

    return simulateHttpRequest(action)
}

export function removeArticle(articleId: IArticleId) {
    const action: RemoveArticleAction = {
        type: REMOVE_ARTICLE,
        id: articleId,
    }
    return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: any) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 0)
    }
}