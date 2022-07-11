import { Button, Container, Grid, ScrollArea, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { executeSearch, ISearchState } from "../../store/search/reducer";
import { ApplicationState } from "../../type";
import { Search as SearchIcon } from "tabler-icons-react";
import { useAppDispatch } from "../../hooks";
import { PodcastTable } from "../Podcasts/PodcastTable";

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
                    <PodcastTable podcasts={search.searchResults} />
                </ScrollArea>
            </Container>
        </>
    )
}