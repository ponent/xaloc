import * as actionTypes from "./actionTypes"
import {IBreadcrumbItem, IBreadcrumbState, ReduxAction} from "../../type";
import { Reducer } from "redux";

const initialState: IBreadcrumbState = {
    items: []
}

export type UpdateBreadcrumbsAction = {
    type: string
    breadcrumbs: IBreadcrumbItem[]
}

const reducer: Reducer<IBreadcrumbState> = (
    state: IBreadcrumbState = initialState,
    action: ReduxAction
): IBreadcrumbState => {
    switch (action.type) {
        case actionTypes.UPDATE_BREADCRUMBS:
            const UpdateBreadcrumbs = action as UpdateBreadcrumbsAction;
            return {
                ...state,
                items: UpdateBreadcrumbs.breadcrumbs
            }
    }
    return state
}

export default reducer