import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import GlobalInfo from "./globalInfo";
import LocalInfo from "./localInfo";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

function Middle() {
    const [risivedCount, setRisivedCount] = useState(0)

    const get = (value) => {
        setRisivedCount(value)
    }

    useEffect(() => {
        console.log(risivedCount)
    }, [risivedCount])
    return (
        <Router basename="/weather-app">
            <div className="middle container">
                <Navigation onclick={get} />
                {risivedCount > 0 ? (
                    <Routes>
                        <Route path="/" element={<LocalInfo />} />
                        <Route path="/globalInfo" element={<GlobalInfo />} />
                    </Routes>
                ) : (
                    <div className="else">
                        <h1>Select one from navigation!</h1>
                    </div>
                )}
            </div>
        </Router>
    )
}
export default Middle;