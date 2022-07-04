import { Avatar, Badge, Button, Container, Grid, Highlight, ScrollArea, Table, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { executeSearch, IPodcastResult, ISearchState } from "../../store/search/reducer";
import { ApplicationState } from "../../type";
import { formatDistance } from 'date-fns'
import { Search as SearchIcon } from "tabler-icons-react";
import { useAppDispatch } from "../../hooks";
import { Link } from "react-router-dom";
import { ca } from "date-fns/locale";

export const SearchResults = () => {

    const dispatch = useAppDispatch()

    const search: ISearchState = useSelector(
        (state: ApplicationState) => state.search,
        shallowEqual
    )

    const form = useForm({
        initialValues: {
            searchTerm: search.searchTerm
        },
        validationRules: {}
    });

    const rows = (search.searchResults === undefined) ? <></> : search.searchResults.map(
        (result: IPodcastResult, index: number) => {

            const lastPublish = formatDistance(new Date(result.releaseDate), new Date(), { addSuffix: true, locale: ca })

            return <tr key={`${result.artistId}-${result.collectionId}-${result.trackId}`}>
                <td>
                    <Avatar src={result.artworkUrl100} />
                </td>
                <td>
                    <Highlight highlight={search.searchTermLastSearch}>
                        {result.trackName}
                    </Highlight>
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
                <td style={{width: 80}}>
                    <Button
                        size="md"
                        variant="gradient"
                        gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                        fullWidth
                        to={`/search/${result.trackId}`}
                        key={result.trackId}
                        component={Link}
                    >
                        <Text>Obrir</Text>
                    </Button>
                </td>
            </tr>
        }
    )

    return (
        <>
        <Container fluid>
            <Title order={1} mt={10} mb={10} key={"title"}>Cercar Podcasts</Title>
            <Text mb={20} color={"gray"} key={"subtitle"}>La cerca utilitza el motor de cerca de iTunes</Text>
            <form onSubmit={form.onSubmit((values) => dispatch(executeSearch(values.searchTerm)))} key="form">
                <Grid>
                    <Grid.Col span={10} key={"text-input"}>
                        <TextInput
                            size={"lg"}
                            required
                            placeholder="Rac 1, Islàndia, Sergi Pàmies, ..."
                            {...form.getInputProps('searchTerm')}
                            style={{ width: "100%" }}
                        />
                    </Grid.Col>
                    <Grid.Col span={2} key={"search-button"}>
                        <Button
                            size="lg"
                            type="submit"
                            variant="gradient"
                            gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                            style={{ width: '100%' }}
                        >
                            <SearchIcon size={15} />
                            <Text ml={10}>Cercar</Text>
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
            <ScrollArea mt={20}>
                {search.searchTermLastSearch !== "" ? <Text mb={15} color={"gray"}>S'han trobat <b>{search.searchResults.length}</b> resultats per la cerca "<b>{search.searchTermLastSearch}</b>"</Text> : <></>}
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs" hidden={search.searchResults.length === 0}>
                    <thead>
                        <tr>
                            <th>Portada</th>
                            <th>Nom</th>
                            <th>Ultima publicació</th>
                            <th>Temes</th>
                            <th>Episodis</th>
                            <th>Accions</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </Container>
        </>
    )
}