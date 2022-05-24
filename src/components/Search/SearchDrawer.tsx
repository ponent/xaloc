import { Button, Drawer, LoadingOverlay } from "@mantine/core"
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { store } from "../../store";
import { fetchUserById } from "../../store/counter/counterSlice";
import { closeSearchDrawer } from "../../store/search/actionCreators";
import { ISearchState } from "../../store/search/reducer";
import { ApplicationState } from "../../type";

export type DrawerContent = {
    id: string;
    value: string;
    open: boolean;
}

export const SearchDrawer = ({id, value, open}: DrawerContent) => {

    const dispatch = useAppDispatch()

    const search: ISearchState = useAppSelector(
        (state: ApplicationState) => state.search,
        shallowEqual
    )

    return (
        <Drawer
            opened={open}
            onClose={() => dispatch(closeSearchDrawer())}
            //title="Register"
            padding="xl"
            size="xl"
            position="right"
        >
            <LoadingOverlay visible={false} />
            <Button onClick={() => dispatch(fetchUserById(2))}>Press me!</Button>
            <pre>{value}</pre>
        </Drawer>
    )
}