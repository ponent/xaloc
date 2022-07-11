import { Group, Text, useMantineTheme, MantineTheme, Button } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { useAppDispatch } from '../../../hooks';
import { restoreBackup } from '../../../store/settings/reducer';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {

  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);



export const UploadBackup = () => {
  const theme = useMantineTheme();

  const dispatch = useAppDispatch()

  let file : File
  const readFile = async (files: File[]) => file = files[0]
  const showFileContents = () => dispatch(restoreBackup(file))

  return (
    <>
      <Dropzone
        multiple={false}
        onDrop={(files) => readFile(files)}
        onReject={(files) => console.log('rejected files', files)}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Button onClick={() => showFileContents()}>Restore Backup</Button>
    </>
  );
}