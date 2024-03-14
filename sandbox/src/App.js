import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartPage from "./pages/startPage"
import ScoreDisplay from "./pages/scoreDisplay"
import GuesserGame from "./pages/guesserGame"
import NoPage from "./pages/NoPage"

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route index element= {<StartPage/>}></Route>
                    <Route path="/StartPage" element={<StartPage />} />
                    <Route path="/ScoreDisplay" element={<ScoreDisplay />} />
                    <Route path="/GuesserGame" element={<GuesserGame />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </Router>
        </div>
    )
}