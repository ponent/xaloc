import * as React from "react"
import {shallowEqual, useSelector} from "react-redux"
import {ApplicationState, IBreadcrumbItem} from "../../type";
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';


export const Breadcrumbs: React.FC = () => {
    const breadcrumbs: readonly IBreadcrumbItem[] = useSelector(
        (state: ApplicationState) => state.breadcrumbs.items,
        shallowEqual
    )

    return (
        <MantineBreadcrumbs style={{margin: '16px 0'}}>
            {breadcrumbs.map((item, index) => (
                <Anchor href={"#"} key={index}>
                {item.name}
              </Anchor>
            ))}
        </MantineBreadcrumbs>
    )
}