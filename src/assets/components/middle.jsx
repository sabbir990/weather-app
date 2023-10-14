import React from "react";
import Navigation from "./navigation";
import GlobalInfo from "./globalInfo";
import LocalInfo from "./localInfo";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'

function Middle() {
    return (
        <Router>
            <div className="middle container">
                <Navigation />
                <Routes>
                    <Route path="/" element={<LocalInfo />} />
                    <Route path="globalInfo" element={<GlobalInfo />} />
                </Routes>
            </div>
        </Router>
    )
}
export default Middle;