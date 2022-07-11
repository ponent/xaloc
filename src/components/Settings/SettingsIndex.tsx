import { Title } from "@mantine/core"
import { BackupsIndex } from "./Backups/BackupsIndex"
import { DatabaseIndex } from "./Database/BackupsIndex"

export const SettingsIndex = () => {

    return <>
        <Title>Ajustos</Title>
        <BackupsIndex />
        <DatabaseIndex />
    </>
}