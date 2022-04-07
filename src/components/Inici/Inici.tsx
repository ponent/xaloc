import * as React from "react"
import {useEffect} from "react"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {updateBreadcrumbs} from "../../store/breadcrumbs/actionCreators";
import {ApplicationState, IArticle} from "../../type";
import {Avatar, Col, List, Row, Statistic} from "antd";
import {AudioOutlined, LikeOutlined} from "@ant-design/icons";

const Inici: React.FC = () => {

    const dispatch = useDispatch();

    const articles: readonly IArticle[] = useSelector(
        (state: ApplicationState) => state.articles.list,
        shallowEqual
    )

    useEffect(() => {
        // Update the document title using the browser API
        dispatch(updateBreadcrumbs([
            {name: "Inici"},
        ]))
    });

    return (
        <>
            <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Statistic title="Total Podcasts" value={articles.length} prefix={<AudioOutlined />} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="New Podcasts" value={0} prefix={<AudioOutlined />} />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Inici