import React from 'react';
// import axios from 'axios';

//react-redux
import {connect} from 'react-redux';

// import {windowResize} from '../reduxActions/syncActions';

//React Components
import Chart from './Chart'


class Main extends React.Component {

    constructor() {
        super()

        this.state = {};

        //Add all the breakpoints that require javascript behaivor here. Pure CSS breakpoints don't need to be added. These determine when the window resize event will update the windowWidth in state.
        this.breakpoints = [];
        //BREAKPOINT USAGE
        //1050
        //970
        //550
            //The map pop up buttons and map pop up mobile CSS class
    }

    componentDidUpdate (prevProps) {


    }

    componentDidMount() {

        //Redux async actions


        //Window resize event listener to update state.windowWidth when a breakpoint has been crossed
        // window.addEventListener('resize', (e) => {
        //     const hasCrossed = fn.hasCrossedBreak(this.breakpoints, this.props.windowWidth, e.target.innerWidth);

        //     if (hasCrossed === true) {
        //         windowResize(e.target.innerWidth);
        //     }
        // });

        // //initialize windowWidth in store on page load
        // windowResize(window.innerWidth);

    }//End of componentDidMount

    render() {
        return (
        <main>
            <h1>18 sefirot</h1>

            <Chart />
        </main>
      )
    }
  }

//React-redux connect
const mapStateToProps = (storeState) =>  {
    // const {windowWidth} = storeState.windowData;
    return {
        // windowWidth
    }
}

export default connect(
    mapStateToProps
  )(Main);



