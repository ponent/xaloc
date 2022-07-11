import { Button, Container, Table, Title } from "@mantine/core"
import { useAppDispatch } from "../../../hooks"
import { emptySubscriptions } from "../../../store/subscriptions/reducer"

export const DatabaseIndex = () => {

    const dispatch = useAppDispatch()

    return <Container fluid mt={20}>
        <Title order={4}>Base de dades</Title>

        <Table>
            <tbody>
                <tr>
                    <td>
                        Buidar la base de dades
                    </td>
                    <td>
                        <Button onClick={() => dispatch(emptySubscriptions())} variant="outline" color="pink">Buidar</Button>
                    </td>
                </tr>
            </tbody>
        </Table>

    </Container>
}