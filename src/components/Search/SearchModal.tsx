import { Button, Group, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import axios from "axios"

export const SearchModal = () => {

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
        </Modal>
    )
}