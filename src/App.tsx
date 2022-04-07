import * as React from "react"
import "./App.css"
import {Col, Layout, Row, Space} from 'antd';
import {MainMenu, MainMenuRoutes} from "./components/Menu/MainMenu";
import {Breadcrumbs} from "./components/Breadcrumbs/Breadcrumbs";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {updateProgressAudio} from "./store/player/actionCreators";
import {useEffect} from "react";
import Player from "./components/Player/Player";

const {Header, Footer, Content} = Layout;

const App: React.FC = () => {

    /* const dispatch: Dispatch<any> = useDispatch()
     const updatePlayerProgress = () : NodeJS.Timeout => {
         dispatch(updateProgressAudio())
         return setTimeout(updatePlayerProgress, 1000)
     }

     useEffect(() => {
         updatePlayerProgress()
     }) */

    return (
        <main>
            <Layout style={{height: "100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    <div className="logo"/>
                    <MainMenu/>
                </Header>
                <Content className="site-layout" style={{marginTop: 64}}>

                    <Player/>

                    <div style={{padding: '0 50px'}}>
                        <Breadcrumbs/>
                        <MainMenuRoutes/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}><span></span></Footer>
            </Layout>
        </main>
    )
}

export default App