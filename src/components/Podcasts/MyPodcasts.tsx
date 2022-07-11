import { Container, LoadingOverlay, Text, Title } from "@mantine/core"
import { shallowEqual } from "react-redux"
import { useAppSelector } from "../../hooks"
import { ISubscriptionsState } from "../../store/subscriptions/reducer"
import { ApplicationState } from "../../type"
import { MyPodcastsEmpty } from "./MyPodcastsEmpty"
import { PodcastTable } from "./PodcastTable"

export const MyPodcasts = () => {

    const subscriptions: ISubscriptionsState = useAppSelector(
        (state: ApplicationState) => state.subscriptions,
        shallowEqual
    )

    const WithPodcasts = <>
        <Title order={1} mt={10} mb={10} key={"title"}>Els Meus Podcasts</Title>
        <Text mb={20} color={"gray"} key={"subtitle"}>Tots els podcasts que segueixo</Text>
        <PodcastTable podcasts={subscriptions.podcasts} />
    </>

    return <>
        <LoadingOverlay visible={!subscriptions.podcastsLoaded} />
        <Container fluid hidden={!subscriptions.podcastsLoaded}>
            {subscriptions.podcasts.length > 0 ? WithPodcasts : <MyPodcastsEmpty /> }
        </Container>
    </>
}
