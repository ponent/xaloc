import { Button, Drawer, LoadingOverlay } from "@mantine/core"
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { store } from "../../store";
import { closeSearchDrawer, thunkSetLoadingAction } from "../../store/search/actionCreators";
import { ISearchState } from "../../store/search/reducer";
import { ApplicationState } from "../../type";

export type DrawerContent = {
    id: string;
    value: string;
    open: boolean;
}

export const SearchDrawer = ({id, value, open}: DrawerContent) => {

    const dispatch = useDispatch();

    const search: ISearchState = useSelector(
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
            <Button onClick={() => store.dispatch(thunkSetLoadingAction())}>Press me!</Button>
            {/*<p>{search.drawerContentUrl}</p>
            <p>{search.drawerContentType}</p>*/}
            <pre>{value}</pre>
        </Drawer>
    )
}