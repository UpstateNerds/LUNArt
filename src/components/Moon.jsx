import React from 'react'
import moonSketch from '../sketches/moonSketch.js'
import P5Wrapper from "../components/P5Wrapper.jsx"

class Moon extends React.Component {
    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.getDate = this.getDate.bind(this);

        this.state = {
            error: null,
            data: null,
            isLoading: false,
            debug: false,
        };
    };

    componentDidMount() {
        window.addEventListener('keydown', this.keyboardInput);
        this.setState({ isLoading: true });
        this.getData();
        setInterval(this.getData, 600000);
    };

    componentWillUnmount() {
        clearInterval(this.getData);
        window.removeEventListener('keydown', this.keyboardInput);
    };

    getData() {
        const date = this.getDate();

        fetch(`http://api.usno.navy.mil/moon/phase?date=${date}&nump=2`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error) {
                        this.setState({
                            error: result.type
                        });
                    } else {
                        this.setState({
                            data: result.phasedata,
                            isLoading: false
                        });
                        console.log('Fetching Moon Phase Data - SUCCESS');
                    }
                },

                (error) => {
                    this.setState({
                        error: error.message,
                        isLoading: false
                    });
                }
            )
    };

    getDate() {
        const currentYear = new Date().getFullYear();
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const date = currentMonth + '/' + currentDay + '/' + currentYear;

        return date;
    };

    keyboardInput = (e) => {
        const code = e.keyCode;

        if (code == 49) {
            this.setState({ debug: true });
        }
    }

    render() {
        if (this.state.error) {
            return (
                <div>ERROR: {this.state.error}</div>
            );
        } else if (this.state.isLoading) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <P5Wrapper sketch={moonSketch} data={this.state.data} debug={this.state.debug} />
            );
        }
    };
}

export default Moon;