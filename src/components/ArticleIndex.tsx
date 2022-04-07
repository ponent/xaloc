import * as React from "react"
import {useState} from "react"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import "../App.css"
import {Outlet, Route, Routes, useLocation} from "react-router-dom";
import {Article} from "./Article"
import {AddArticle} from "./AddArticle"
import {addArticle, removeArticle} from "../store/actionCreators"
import {Dispatch} from "redux"

import {Breadcrumb, Col, Drawer, Row} from 'antd';
import {ApplicationState, IArticle} from "../type";

const ArticleIndex: React.FC = () => {
    const articles: readonly IArticle[] = useSelector(
        (state: ApplicationState) => state.articles.list,
        shallowEqual
    )

    let [drawerOpen, setDrawerOpen] = useState(false)

    const dispatch: Dispatch<any> = useDispatch()

    const saveArticle = React.useCallback(
        (article: IArticle) => {
            dispatch(addArticle(article))
            setDrawerOpen(false)
        },
        [dispatch]
    )

    return (
        <>
            <Drawer
                title="New Article"
                placement={"right"}
                closable={false}
                onClose={() => setDrawerOpen(false)}
                visible={drawerOpen}
                key={"h"}
            >
                <AddArticle saveArticle={saveArticle}/>
            </Drawer>

            <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                <Outlet />
            </div>
        </>
    )
}

export default ArticleIndex