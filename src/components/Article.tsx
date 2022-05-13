import * as React from "react"
import {Dispatch} from "redux"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {ApplicationState, IArticle, IArticleId} from "../type";
import {doStopAudio, playAudio} from "../store/player/actionCreators";
import {IPlayerState} from "../store/player/reducer";
import { Button, Card } from "@mantine/core";

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

    const PlayButton = player.url === article.url ?
        (
            player.playing === true ?
                <Button onClick={pause}>Pausar</Button>
                :
                <Button onClick={play}>Començar de nou</Button>
        )
        :
        <Button onClick={play}>Reproduïr</Button>

    return (
        <Card withBorder my={20}>
            <span>{article.title}</span>
            <p><i>{article.body}</i></p>
            {PlayButton}
        </Card>
    )
}