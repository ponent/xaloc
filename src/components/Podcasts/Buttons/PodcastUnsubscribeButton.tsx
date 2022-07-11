import { Button, Menu, Text } from "@mantine/core"
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { BookmarkOff, Settings } from "tabler-icons-react";
import { useAppDispatch } from "../../../hooks";
import { IPodcastResult } from "../../../store/search/reducer";
import { removeSubscription } from "../../../store/subscriptions/reducer";

type PodcastUnsubscribeButton = {
    result: IPodcastResult
}

export const PodcastUnsubscribeButton = ({ result }: PodcastUnsubscribeButton) => {

    const dispatch = useAppDispatch()
    const ref = useClickOutside(() => handlers.close());
    const [opened, handlers] = useDisclosure(false);

    return <>
        <Button
            ref={ref}
            size="md"
            variant="gradient"
            fullWidth
            key={`subscribe_button_${result.trackId}`}
            gradient={{ from: opened ? 'red' : 'indigo', to: opened ? 'red' : 'cyan' }}
            onClick={() => {
                console.log("Click!")
                if (opened) {
                    console.log("UNSUBSCRIBE")
                    dispatch(removeSubscription(result))
                } else {
                    console.log("OPEN CONFIRMATION")
                    handlers.open()
                }
            }}
        >
            {!opened ? <BookmarkOff /> : <Text>Segur?</Text>}
        </Button>
    </>
}