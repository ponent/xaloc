import * as React from "react"
import {shallowEqual, useSelector} from "react-redux"
import {Breadcrumb} from 'antd';
import {ApplicationState, IBreadcrumbItem} from "../../type";

export const Breadcrumbs: React.FC = () => {
    const breadcrumbs: readonly IBreadcrumbItem[] = useSelector(
        (state: ApplicationState) => state.breadcrumbs.items,
        shallowEqual
    )

    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            {
                breadcrumbs.map((breadcrumb: IBreadcrumbItem) => <Breadcrumb.Item key={breadcrumb.name}>{breadcrumb.name}</Breadcrumb.Item>)
            }
        </Breadcrumb>
    )
}