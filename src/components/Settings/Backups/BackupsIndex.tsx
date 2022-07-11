import { Button, Container, Modal, Table, Title } from "@mantine/core"
import { shallowEqual } from "react-redux"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { exportToJson } from "../../../repository/SubscriptionsRepository"
import { closeUploadDialog, ISettingsState, openUploadDialog } from "../../../store/settings/reducer"
import { ApplicationState } from "../../../type"
import { UploadBackup } from "./UploadBackup"

export const BackupsIndex = () => {

    const dispatch = useAppDispatch()

    const settings: ISettingsState = useAppSelector(
        (state: ApplicationState) => state.settings,
        shallowEqual
    )

    return <Container fluid mt={20}>
        <Title order={4}>Còpies de seguretat</Title>

        <Table>
            <tbody>
                <tr>
                    <td>
                        Crear còpia de seguretat
                    </td>
                    <td>
                        <Button onClick={() => exportToJson()} variant="outline" color="pink">Crear</Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        Restaurar copia de seguretat
                    </td>
                    <td>
                        <Button onClick={() => dispatch(openUploadDialog())} variant="outline" color="pink">Restaurar</Button>
                    </td>
                </tr>
            </tbody>
        </Table>

        <Modal
            opened={settings.backups.uploadModalOpen}
            onClose={() => dispatch(closeUploadDialog())}
            title="Introduce yourself!"
        >
            <UploadBackup />
        </Modal>
        </Container>
}