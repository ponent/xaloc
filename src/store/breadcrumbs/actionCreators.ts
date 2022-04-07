import * as actionTypes from "./actionTypes"
import {DispatchType, IBreadcrumbItem} from "../../type";
import {UpdateBreadcrumbsAction} from "./reducer";

export function updateBreadcrumbs(breadcrumbs: IBreadcrumbItem[]) {
    const action: UpdateBreadcrumbsAction = {
        type: actionTypes.UPDATE_BREADCRUMBS,
        breadcrumbs
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