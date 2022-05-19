import { Drawer, LoadingOverlay } from "@mantine/core"
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { closeSearchDrawer } from "../../store/search/actionCreators";
import { ISearchState } from "../../store/search/reducer";
import { ApplicationState } from "../../type";

export type DrawerContent = {
    id: string;
    value: string;
    open: boolean;
}

export const SearchDrawer = ({id, value, open}: DrawerContent) => {

    const dispatch = useDispatch()

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
            <LoadingOverlay visible={true} />
            {/*<p>{search.drawerContentUrl}</p>
            <p>{search.drawerContentType}</p>*/}
            <pre>{value}</pre>
        </Drawer>
    )
}