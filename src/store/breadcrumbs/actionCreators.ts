import * as actionTypes from "./actionTypes"
import {IBreadcrumbItem} from "../../type";

export function updateBreadcrumbs(breadcrumbs: IBreadcrumbItem[]) {
    return {
        type: actionTypes.UPDATE_BREADCRUMBS,
        breadcrumbs
    }
}