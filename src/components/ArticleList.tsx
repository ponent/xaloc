import * as React from "react"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import "../App.css"
import {Article} from "./Article"
import {removeArticle} from "../store/actionCreators"
import {ApplicationState, IArticle} from "../type";
import {useEffect} from "react";
import {updateBreadcrumbs} from "../store/breadcrumbs/actionCreators";

const ArticleList: React.FC = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        // Update the document title using the browser API
        dispatch(
            updateBreadcrumbs(
                [
                    {name: "Podcasts"},
                    {name: "Index"},
                ]
            )
        )
    });

    const articles: readonly IArticle[] = useSelector(
        (state: ApplicationState) => state.articles.list,
        shallowEqual
    )

    return (
        <div>
            {articles.map((article: IArticle) => (
                <div key={`col-${article.id.value}`}>
                    <Article
                        key={article.id.value}
                        article={article}
                        removeArticle={removeArticle}
                    />
                </div>
            ))}
        </div>
    )
}

export default ArticleList