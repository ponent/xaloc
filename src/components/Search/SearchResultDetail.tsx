import { AspectRatio, Badge, Button, Container, Group, Image, LoadingOverlay, ScrollArea, Stack, Table, Text, Title } from "@mantine/core";
import { formatDistance } from "date-fns";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ArrowBarLeft } from "tabler-icons-react";
import { useAppDispatch } from "../../hooks";
import { executePodcastSearch, ISearchState, PodcastEpisode } from "../../store/search/reducer";
import { ApplicationState } from "../../type";
import { PodcastResult } from "./PodcastResult";
import { ca } from 'date-fns/locale'

export const SearchResultDetail = () => {

    const params = useParams();

    const podcastId = params.podcastId ?? ""

    const dispatch = useAppDispatch()

    const search: ISearchState = useSelector(
        (state: ApplicationState) => state.search,
        shallowEqual
    )

    useEffect(() => {
        dispatch(executePodcastSearch(podcastId))
    }, [podcastId, dispatch])

    const lastPublish = () => {

        try {
            return formatDistance(new Date(search.podcastDetailResults.info.releaseDate), new Date(), { addSuffix: true, locale: ca })
        } catch {
            return "-"
        }

    }

    const buttonBack = (searchTerm: string) => (
        <Button mb={30} component={Link} to="/search" leftIcon={<ArrowBarLeft size={14} />} variant="outline" color={"pink"}>
            Back to "{searchTerm}"
        </Button>
    )

    return <Container fluid p={10}>

        {search.searchTermLastSearch !== "" ? buttonBack(search.searchTermLastSearch) : <></>}

        <LoadingOverlay visible={search.podcastDetailLoading} />
        <>
            <Group spacing="xs" align={"flex-start"} position={"left"}>
                <Stack mr={"md"}>
                    <AspectRatio ratio={1 / 1} sx={{ width: 200 }}>
                        <Image
                            radius="md"
                            src={search.podcastDetailResults.info.artworkUrl600}
                            alt="Random unsplash image"
                        />
                    </AspectRatio>
                </Stack>
                <Group spacing="xs" mb={"xl"}>
                    <div>
                        <Title order={1} mt={10} mb={0} key={"title"}>{search.podcastDetailResults.info.trackName}</Title>
                        <Group spacing={"xs"} align={"center"} position="left" mt={5}>
                            <Text mb={0} color={"gray"} key={"subtitle"}>{search.podcastDetailResults.info.artistName}</Text>
                            <Text color={"pink"}>&bull;</Text>
                            <Text mb={0} color={"gray"} key={"latpub"}>Ultima publicació <b>{lastPublish()}</b></Text>
                        </Group>
                        <Button variant="outline" color="pink" size="md" mt={15} mb={15}>
                            Vull subscriure-m'hi
                        </Button>
                        <Group spacing={"xs"} align={"center"} position="left" mt={5}>
                            <Text color={"gray"} key={"episodis"}>{search.podcastDetailResults.info.trackCount} episodis</Text>
                            <Text color={"pink"}>&bull;</Text>
                            <>
                                {search.podcastDetailResults.info.genres.map((tag: string) => <Badge color="grape" radius="lg" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} mr={10} key={tag}>{tag}</Badge>)}
                            </>
                        </Group>
                    </div>
                </Group>
            </Group>
        </>
        <>
            <ScrollArea mt={30}>
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs" hidden={search.podcastDetailResults.podcasts.length === 0}>
                    <tbody>
                        {(search.podcastDetailResults.podcasts !== undefined) ? search.podcastDetailResults.podcasts.map((episode: PodcastEpisode) => {
                            return <PodcastResult key={`podcast-${episode.trackId}`} episode={episode} info={search.podcastDetailResults.info} />
                        }) : <></>}
                    </tbody>
                </Table>
            </ScrollArea>
        </>

    </Container>
}