import * as React from "react"
import {Dispatch} from "redux"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {Avatar, Button, Card, Space, Tag} from 'antd';
import {ApplicationState, IArticle, IArticleId} from "../type";
import {PauseCircleFilled, PlayCircleFilled} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {doResumeAudio, doStopAudio, playAudio, resumeAudio, stopAudio} from "../store/player/actionCreators";
import {IPlayerState} from "../store/player/reducer";

type Props = {
    article: IArticle
    removeArticle: (id: IArticleId) => void
}

export const Article: React.FC<Props> = ({article, removeArticle}) => {
    const dispatch: Dispatch<any> = useDispatch()

    const player: IPlayerState = useSelector(
        (state: ApplicationState) => state.player,
        shallowEqual
    )

    const play = () => dispatch(playAudio(article.url, article.title, article.icon))
    const pause = () => doStopAudio()
    // const resume = () => doResumeAudio()

    const PlayButton = player.url == article.url ?
        (
            player.playing == true ?
                <Button type={"primary"} icon={<PauseCircleFilled/>} onClick={pause}>Pausar</Button>
                :
                <Button type={"primary"} icon={<PlayCircleFilled/>} onClick={play}>Començar de nou</Button>
        )
        :
        <Button type={"primary"} icon={<PlayCircleFilled/>} onClick={play}>Reproduïr</Button>

    const title = <Space>
        <Avatar shape={"square"} src={article.icon}/>
        {article.title}
    </Space>
    return (
        <Card size="small" title={title} extra={PlayButton}>

            <p><i>{article.body}</i></p>
            <Tag>
                <Link to={`/podcasts/${article.id.value}`}>{article.id.value}</Link>
            </Tag>
        </Card>
    )
}