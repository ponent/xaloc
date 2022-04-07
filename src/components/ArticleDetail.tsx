import * as React from "react"
import "../App.css"
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {updateBreadcrumbs} from "../store/breadcrumbs/actionCreators";
import {ApplicationState, IArticle} from "../type";

const ArticleDetail: React.FC = () => {

    const dispatch = useDispatch();
    const { articleId } = useParams();

    const articles: readonly IArticle[] = useSelector(
        (state: ApplicationState) => state.articles.list,
        shallowEqual
    )

    const article = articles.find((article: IArticle) => article.id.value === articleId)

    useEffect(() => {
        // Update the document title using the browser API
        dispatch(updateBreadcrumbs([
            {name: "Podcasts"},
            {name: article !== undefined ? article.title : "Title Not found"},
        ]))
    });



    return (
        <p>!!! DETAIL ( {articleId} ) !!!</p>
    )
}

export default ArticleDetail