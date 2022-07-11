import { Anchor, Avatar, Badge, Button, Table, Text } from "@mantine/core"
import { formatDistance } from "date-fns"
import { ca } from "date-fns/locale"
import { IPodcastResult } from "../../store/search/reducer"
import { Link, NavLink } from "react-router-dom";
import { Bookmark, BookmarkOff } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addSubscription, ISubscriptionsState, removeSubscription } from "../../store/subscriptions/reducer";
import { ApplicationState } from "../../type";
import { shallowEqual } from "react-redux";
import { PodcastUnsubscribeButton } from "./Buttons/PodcastUnsubscribeButton";

interface PodcastTableProps {
    podcasts: Array<IPodcastResult>
}

export const PodcastTable = (props: PodcastTableProps) => {

    const dispatch = useAppDispatch();

    const subscriptions: ISubscriptionsState = useAppSelector(
        (state: ApplicationState) => state.subscriptions,
        shallowEqual
    )

    const rows = (props.podcasts === undefined) ? <></> : props.podcasts
        // .sort((a: IPodcastResult, b: IPodcastResult) => (new Date(b.releaseDate).getTime()) - (new Date(a.releaseDate).getTime()))
        .map(
            (result: IPodcastResult, index: number) => {

                const lastPublish = formatDistance(new Date(result.releaseDate), new Date(), { addSuffix: true, locale: ca })

                const subscriptionButton = <Button
                    size="md"
                    variant="gradient"
                    fullWidth
                    key={`subscribe_button_${result.trackId}`}
                    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                    onClick={async () => dispatch(addSubscription(result))}
                >
                    <Bookmark />
                </Button>

                const unsubscriptionButton = <PodcastUnsubscribeButton result={result}></PodcastUnsubscribeButton>

                return <tr key={`${result.artistId}-${result.collectionId}-${result.trackId}`}>
                    <td align="center">
                        <Avatar src={result.artworkUrl100} />
                    </td>
                    <td>
                        <Anchor component={Link} to={`/podcasts/${result.platform}/${result.trackId}`}>
                            {result.trackName}
                        </Anchor>
                    </td>
                    <td>
                        {lastPublish}
                    </td>
                    <td>
                        {result.genres.map((tag: string) => <Badge color="grape" radius="lg" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} mr={10} key={tag}>{tag}</Badge>)}
                    </td>
                    <td>
                        {result.trackCount}
                    </td>
                    <td style={{ width: 140 }}>
                        {subscriptions.podcasts.find((element: IPodcastResult) => result.trackId === element.trackId) === undefined ? subscriptionButton : unsubscriptionButton}
                    </td>
                </tr>
            }
        )

    return <Table sx={{ minWidth: 800 }} highlightOnHover verticalSpacing="xs" hidden={props.podcasts.length === 0}>
        <tbody>{rows}</tbody>
    </Table>
}
