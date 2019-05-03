import React from "react"
import Moon from "./Moon.jsx"
import Wave from "./Wave.jsx"
import Meteors from "./Meteors.jsx"
import Weather from "./Weather.jsx"

class App extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
                <Weather />
                <Meteors />
                <Moon />
                <Wave />
            </div>
        )
    }
}

export default App