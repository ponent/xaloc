import { Button, Container, Group, Modal, Tabs, TextInput } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import axios from "axios"
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { updateSearchResults } from "../../store/search/actionCreators";
import { ISearchState } from "../../store/search/reducer";
import { ApplicationState } from "../../type";

export const SearchModal = () => {

    const dispatch = useDispatch()

    const search: ISearchState = useSelector(
        (state: ApplicationState) => state.search,
        shallowEqual
    )

    const form = useForm({
        initialValues: {
            searchTerm: ''
        },

        validationRules: {}
    });

    const executeSearch = (searchTerm: string) => {
        axios.get(`https://itunes.apple.com/search?term=${searchTerm}&entity=podcast`)
            .then(function (response) {
                // handle success
                console.log(response);
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

    return (
        <Modal
            opened={true}
            onClose={() => console.log("CLOSE MODAL")}
            title="Podcast search"
            size={"xl"}
        >
            <form onSubmit={form.onSubmit((values) => executeSearch(values.searchTerm))}>
                <TextInput
                    required
                    //label="Email"
                    placeholder="Rac 1, Islàndia, Sergi Pàmies, ..."
                    {...form.getInputProps('searchTerm')}
                // onChange={(val) => console.log(val)}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>

            <Container>
                { 
                ( search.searchResults.length === 0 ) 
                ? 
                <></> :
                <Tabs orientation="vertical">
                {
                    search.searchResults.map(
                        res => (
                            <Tabs.Tab label={JSON.parse(JSON.stringify(res)).collectionName} key={JSON.parse(JSON.stringify(res)).trackId}>
                                {JSON.parse(JSON.stringify(res)).feedUrl}
                            </Tabs.Tab>
                        )
                    )
                }
                </Tabs>
                }
            </Container>

        </Modal>
    )
}