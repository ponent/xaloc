import { Avatar, Badge, Button, Container, Grid, Highlight, ScrollArea, Table, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import axios from "axios"
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { updateSearchResults, updateSearchTerm } from "../../store/search/actionCreators";
import { IPodcastResult, ISearchState } from "../../store/search/reducer";
import { ApplicationState } from "../../type";
import { formatDistance } from 'date-fns'
import { Search } from "tabler-icons-react";

export const SearchModal = () => {

    const dispatch = useDispatch()

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

    const executeSearch = (searchTerm: string) => {
        dispatch(updateSearchTerm(searchTerm))
        axios.get(`https://itunes.apple.com/search?term=${searchTerm}&entity=podcast`)
            .then(function (response) {
                // handle success
                dispatch(updateSearchResults(response.data.results))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    const executeGetEpisodes = (index: number) => {
        const url = JSON.parse(JSON.stringify(search.searchResults[index])).feedUrl
        axios.get(`${url}`)
            .then(function (response) {
                // handle success
                console.log(response);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    const rows = search.searchResults.map(
        (result: IPodcastResult, index: number) => {

            const lastPublish = formatDistance(new Date(result.releaseDate), new Date(), { addSuffix: true })

            return <tr key={`${result.artistId}-${result.collectionId}-${result.trackId}`}>
                <td>
                    <Avatar src={result.artworkUrl100} />
                </td>
                <td>
                    {lastPublish}
                </td>
                <td>
                    <Highlight highlight={search.searchTermLastSearch}>
                        {result.trackName}
                    </Highlight>
                </td>
                <td>
                    {result.genres.map((tag: string) => <Badge color="grape" radius="lg" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} mr={10} key={tag}>{tag}</Badge>)}
                </td>
                <td>
                    {result.trackCount}
                </td>
            </tr>
        }
    )

    return (
        <Container fluid>
            <Title order={1} mt={10} mb={10} key={"title"}>Cercar Podcasts</Title>
            <Text mb={20} color={"gray"} key={"subtitle"}>La cerca utilitza el motor de cerca de iTunes</Text>
            <form onSubmit={form.onSubmit((values) => executeSearch(values.searchTerm))} key="form">
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
                            style={{width: '100%'}}
                        >
                            <Search size={15} />
                            <Text ml={10}>Cercar</Text>
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
            <ScrollArea mt={20}>
                {search.searchTermLastSearch !== "" ? <Text mb={15} color={"gray"}>S'han trobat <b>{search.searchResults.length}</b> resultats per la cerca "<b>{search.searchTermLastSearch}</b>"</Text> : <></>}
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs" hidden={search.searchResults.length == 0}>
                    <thead>
                        <tr>
                            <th>Portada</th>
                            <th>Ultima publicació</th>
                            <th>Nom</th>
                            <th>Temes</th>
                            <th>Episodis</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </Container>

    )
}