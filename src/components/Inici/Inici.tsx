import * as React from "react"
import { useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { updateBreadcrumbs } from "../../store/breadcrumbs/actionCreators";
import { ApplicationState, IArticle } from "../../type";

const Inici: React.FC = () => {

    const dispatch = useDispatch();

    const articles: readonly IArticle[] = useSelector(
        (state: ApplicationState) => state.articles.list,
        shallowEqual
    )

    useEffect(() => {
        dispatch(updateBreadcrumbs([
            { name: "Inici" },
        ]))
    });

    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <span>Podcasts: {articles.length}</span>
        </div>
    )
}

export default Inici