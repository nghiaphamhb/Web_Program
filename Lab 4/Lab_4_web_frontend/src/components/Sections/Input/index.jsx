import "./index.scoped.css";
import AppContainer from "../../AppContainer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Graph from "../Graph";
import store from "../../../store";
import { useNavigate } from "react-router-dom";

function Input() {

    useEffect(() => {
        if (store.getState().login.value == null || store.getState().password.value == null) {
            navigate("/");
        }
        else {
            sendShowRequest();
        }
    }, []);

    function popupMessage(message) {
        toast(message, {
            style: {
                borderRadius: '10px',
                color: 'rgb(4, 30, 55)',
                background: 'rgb(255, 255, 255, 50%)'
            }
        })
    }
    const [xValue, setX] = useState("0");
    const [yValue, setY] = useState("0");
    const [rValue, setR] = useState("2");
    const [dotData, setDotData] = useState([]);

    const navigate = useNavigate();

    const NEGATIVE_R_ERROR = "Radius can't be less than 0!";
    const INVALID_Y_ERROR = "Y is out of range!";

    const selectX = (e) => {
        setX(parseInt(e));
    }
    const selectY = (e) => {
        if (validateY(e.target.value)) {
            setY(e.target.value);
        }
        else {
            popupMessage(INVALID_Y_ERROR);
        }
    }
    const selectR = (e) => {
        if (validateR(e)) {
            setR(e);
        }
        else {
            popupMessage(NEGATIVE_R_ERROR);
        }
    }

    function validateR(r) {
        return r >= 0;
    }
    function validateY(y) {
        return y >= -5 && y <= 3;
    }

    function sendShowRequest() {
        (async () => {
            let response = await fetch("/api/dots", {
                method: "GET",
                headers: { "Authorization": "Basic " + btoa(store.getState().login.value + ":" + store.getState().password.value).replaceAll("=", "") }
            })
            let data = await response.json();
            if (response.ok) setDotData(data);
        })()
    }

    function sendCheckRequest(x, y, r) {
        let dotFormData = new FormData();
        dotFormData.append('x', parseFloat(x));
        dotFormData.append('y', parseFloat(y));
        dotFormData.append('r', parseFloat(r));
        (async () => {
            let response = await fetch("/api/dots", {
                method: "POST",
                headers: { "Authorization": "Basic " + btoa(store.getState().login.value + ":" + store.getState().password.value).replaceAll("=", "") },
                body: dotFormData
            })
            let data = await response.json();
            if (response.ok) setDotData([...dotData, data]);
        })()
    }

    function sendDeleteRequest() {
        (async () => {
            let response = await fetch("/api/dots", {
                method: "DELETE",
                headers: { "Authorization": "Basic " + btoa(store.getState().login.value + ":" + store.getState().password.value).replaceAll("=", "") }
            })
            if (response.ok) setDotData([]);
        })()
    }

    function parseNumber(number) {
        if (number < 10) return ("0" + number);
        return number;
    }

    function parseCurrentTime(timeStamp) {
        let dateFormat = new Date(timeStamp * 1000);
        return (parseNumber(dateFormat.getDate()) + "/" + parseNumber((dateFormat.getMonth() + 1)) + "/" + dateFormat.getFullYear() + " "
            + parseNumber(dateFormat.getHours()) + ":" + parseNumber(dateFormat.getMinutes()) + ":" + parseNumber(dateFormat.getSeconds()));
    }

    function parseScriptTime(scriptTime) {
        return scriptTime / 1000;
    }

    function sendCoordsFromClick(x, y) {
        setX(x);
        setY(y);
        sendCheckRequest(x, y, rValue);
    }
    return (
        <AppContainer>
            <div id="main-container">
                <div id="data-container">
                    <div id="X">
                        Choose X:
                        <div className="X-values">
                            <div id="X-first-row">
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x-4"
                                        value="-4"
                                        onClick={() => selectX(-4)}
                                        aria-pressed={xValue === -4}
                                    > -4 </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x-3"
                                        value="-3"
                                        onClick={() => selectX(-3)}
                                        aria-pressed={xValue === -3}
                                    > -3 </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x-2"
                                        value="-2"
                                        onClick={() => selectX(-2)}
                                        aria-pressed={xValue === -2}
                                    > -2 </button>
                                </div>
                            </div>
                            <div id="X-second-row">
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x-1"
                                        value="-1"
                                        onClick={() => selectX(-1)}
                                        aria-pressed={xValue === -1}
                                    > -1 </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x0"
                                        value="0"
                                        onClick={() => selectX(0)}
                                        aria-pressed={xValue === 0}
                                    > 0 </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x1"
                                        value="1"
                                        onClick={() => selectX(1)}
                                        aria-pressed={xValue === 1}
                                    > 1 </button>
                                </div>
                            </div>
                            <div id="X-third-row">
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x2"
                                        value="2"
                                        onClick={() => selectX(2)}
                                        aria-pressed={xValue === 2}
                                    > 2 </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x3"
                                        value="3"
                                        onClick={() => selectX(3)}
                                        aria-pressed={xValue === 3}
                                    > 3 </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="x4"
                                        value="4"
                                        onClick={() => selectX(4)}
                                        aria-pressed={xValue === 4}
                                    > 4 </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Y">
                        Enter Y (-5; 3):
                        <br />
                        <input className="pointer" type="number" id="Y-value" value={yValue} onInput={selectY} />
                    </div>
                    <div id="R">
                        Choose R:
                        <div className="R-values">
                            <div id="R-first-row">
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r-4"
                                        onClick={() => selectR(-4)}
                                        aria-pressed={false}
                                    > -4
                                    </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r-3"
                                        onClick={() => selectR(-3)}
                                        aria-pressed={false}
                                    > -3
                                    </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r-2"
                                        onClick={() => selectR(-2)}
                                        aria-pressed={false}
                                    > -2
                                    </button>
                                </div>
                            </div>
                            <div id="R-second-row">
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r-1"
                                        onClick={() => selectR(-1)}
                                        aria-pressed={false}
                                    > -1
                                    </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r0"
                                        onClick={() => selectR(0)}
                                        aria-pressed={rValue === 0}
                                    > 0
                                    </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r1"
                                        onClick={() => selectR(1)}
                                        aria-pressed={rValue === 1}
                                    > 1
                                    </button>
                                </div>
                            </div>
                            <div id="R-third-row">
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r2"
                                        onClick={() => selectR(2)}
                                        aria-pressed={rValue === 2}
                                    > 2
                                    </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r3"
                                        onClick={() => selectR(3)}
                                        aria-pressed={rValue === 3}
                                    > 3
                                    </button>
                                </div>
                                <div className="one-radio-container">
                                    <button
                                        className="pointer radio-button"
                                        id="r4"
                                        onClick={() => selectR(4)}
                                        aria-pressed={rValue === 4}
                                    > 4
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="graph-container">
                    <Graph radius={rValue} dots={dotData} setAndSendCoords={sendCoordsFromClick} />
                </div>
                <div id="button-container">
                    <button className="pointer button" id="check-button" onClick={() => sendCoordsFromClick(xValue, yValue, rValue)}>Check</button>
                    <button className="pointer button" id="clear-button" onClick={sendDeleteRequest}>Clear</button>
                </div>
                <div id="table-container">
                    <table id="results">
                        <thead><tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Current time</th>
                            <th>Script time</th>
                            <th>Result</th>
                        </tr></thead>
                        <tbody>
                            {dotData && dotData.map(
                                (dot, i) => (
                                    <tr key={i}>
                                        <td>{dot.x}</td>
                                        <td>{dot.y}</td>
                                        <td>{dot.r}</td>
                                        <td>{parseCurrentTime(dot.timestamp)}</td>
                                        <td>{parseScriptTime(dot.scriptTime)}</td>
                                        <td>{dot.status ? "hit" : "miss"}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppContainer>
    );
}
export default Input;
