import * as React from "react"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {ApplicationState} from "../../type";
import {IPlayerState} from "../../store/player/reducer";
import {LoadingOutlined, PauseCircleFilled, PlayCircleFilled, PoweroffOutlined} from "@ant-design/icons";
import {Dispatch} from "redux";
import {doResumeAudio, doStopAudio, setProgressAudio} from "../../store/player/actionCreators";
import {Avatar, Col, Row, Slider, Space} from "antd";

const PlayerComponent: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch()

    const player: IPlayerState = useSelector(
        (state: ApplicationState) => state.player,
        shallowEqual
    )

    const iconStyle = {
        fontSize: "30px",
        color: "#ffffff",
        verticalAlign: 'middle',
    }

    const textStyle = {
        color: "#ffffff"
    }

    const timeStyle = {
        ...textStyle,
        fontSize: "10px",
    }

    const pause = () => doStopAudio()
    const resume = () => doResumeAudio()

    const renderHHMMSSGivenSeconds = (seconds: number) => {
        const date = new Date(0);
        try {
            const roundedSeconds = Math.round(seconds)
            date.setSeconds(roundedSeconds);
            return date.toISOString().substr(11, 8);
        } catch (e) {
        }
        return "00:00:00"
    }

    const customTooltip = (value: any) => {
        return <span>{renderHHMMSSGivenSeconds(player.progress)}</span>
    }

    const onChange = (value: number) => {
        setProgressAudio(Math.round(value))
    }

    const slider = (
        <Col span={24} style={{lineHeight: "20px"}}>
            <Slider
                defaultValue={player.progress}
                value={player.progress}
                min={0}
                max={Math.round(player.duration)}
                disabled={false}
                tipFormatter={customTooltip}
                trackStyle={{margin: 0}}
                handleStyle={{width: 7, height: 7, marginTop: -1}}
                style={{margin: "1px 0px", minWidth: 200}}
                onChange={onChange}
            />
        </Col>
    )

    return (

        <Row style={{
            backgroundImage: "linear-gradient(rgb(232, 93, 4), rgb(220, 47, 2))",
            height: 64,
            display: player.url != "" ? "flex" : "none"
        }}>
            <Col flex="auto"></Col>
            <Col flex="none">

                <div style={{
                    display: "flex",
                    marginTop: 0,
                    borderRadius: 0,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div style={{display: "flex", flex: 1}}>
                        {
                            player.loading
                                ?
                                <LoadingOutlined style={iconStyle}/>
                                :
                                (
                                    player.playing
                                        ?
                                        <PauseCircleFilled onClick={pause} style={iconStyle}/>
                                        :
                                        <PlayCircleFilled onClick={resume} style={iconStyle}/>
                                )
                        }
                    </div>
                    <div style={{display: "flex", padding: "0 20px", width: "100%", height: 64, minWidth: 200}}>
                        <Row justify="space-around" align="middle">
                            <Col span={24}>
                                <div>
                                    <span style={textStyle}>{player.title}</span>
                                </div>
                                {player.duration != -1 ? <div>{slider}</div> : <></>}
                                <div>
                                <span style={timeStyle}>
                                    {(player.duration == -1) ?
                                        <PoweroffOutlined spin={player.playing} style={{marginRight: "5px"}}/> : <></>}
                                    {renderHHMMSSGivenSeconds(player.progress)}
                                    {player.duration != -1 ? " | " + renderHHMMSSGivenSeconds(player.duration) : ""}
                                </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div style={{paddingRight: 10, display: "flex", flex: 1}}>
                        <Avatar shape={"square"} src={player.icon}/>
                    </div>
                </div>
            </Col>
            <Col flex="auto"></Col>
        </Row>
    )
}

export default PlayerComponent