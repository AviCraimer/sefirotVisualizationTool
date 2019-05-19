import React from 'react';
import {connect} from 'react-redux';

class Chart extends React.Component {

    constructor() {
        super()

        this.state = {
            zoomLevel: 1,
            namesToDisplay: 'esoteric',
            radius: 56,
            inceptionX: 947.39,
            inceptionY: 408.231,
            stepSizeX: 200,
            stepSizeY: 257
        };

        this.updateZoomLevel = this.updateZoomLevel.bind(this)
    }


updateZoomLevel (zoomIn) {
    const sign = zoomIn ? 1 : -1;
    const smallZoom = sign * .1;
    const midZoom = sign * .5;

    const currentZoom = this.state.zoomLevel;
    let newZoom;
    if (currentZoom === 1) {
        if (zoomIn) {
            newZoom = 1 + midZoom;
        } else {
            newZoom = 1 - smallZoom;
        }
    }  else if (currentZoom < 1) {
        newZoom = currentZoom + smallZoom;
        if (newZoom < 0.1) {return null}
    } else if (currentZoom > 1) {
        newZoom = currentZoom + midZoom;
    }
    this.setState({zoomLevel: newZoom});
    // console.log('new zoom:', this.state.zoomLevel)
}

render  () {

    const {sefirotData, names, xStart, yStart} = this.props;
    const {radius, zoomLevel, namesToDisplay, stepSizeX, stepSizeY} = this.state;
    const dynamicScale = (this.state.zoomLevel * 100) + '%'
    const r = radius;
    const length = Math.round(r*2) + 'px';


return (

    <div className="sefirot-chart">
        <form className='sefirot-chart__controls'  action=""

        >
        <select name="Names" value={namesToDisplay}
            onChange={(e) => {
                this.setState({namesToDisplay: e.target.value })
            } }
        >
            {
                Object.keys(names).map(key => (
                    <option value={key} key={key}>{key}</option>
                ) )

            }
        </select>

            <label htmlFor="circle-radius">Radius size: {r}</label>
            <input
                type="range" id="circle-radius" name="volume"
                min="20" max="200" value={r}
                onChange={(e) => {
                    this.setState({radius: e.target.value})
                } }

            />
            <label htmlFor="x-size-range">Horizontal Spread: {stepSizeX} </label>
            <input type="range" id="x-size-range" name="volume"
            min="20" max="300" value={stepSizeX}
                onChange={(e) => {
                    this.setState({stepSizeX: e.target.value})
                } }

            />
                <label htmlFor="y-size-range">Vertical Spread: {stepSizeY}</label>
            <input type="range" id="start" name="y-size-range"
            min="20" max="300" value={stepSizeY}
            onChange={(e) => {
                this.setState({stepSizeY: e.target.value})
            } } />
        </form>

        <svg  className="sefirot-chart_svg" width="100%"   height="100%" viewBox="400 200 1100 3347" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
        onWheel={(e) =>  {
            const isZoom = e.getModifierState('Meta') || e.getModifierState('Control');

            if (isZoom) {
            //    console.log(e, e.getModifierState('Meta'),  e.getModifierState('Control'))
               e.preventDefault();
               this.updateZoomLevel( (e.deltaY > 0) ? true : false);
            }
        }  }
        style={ {transform: `scale(${zoomLevel} , ${zoomLevel} )`} }
    >
    {
        sefirotData.map((sefira, i) => {
            const gridX = sefira.boundaryCircleCoordinates.grid[0]
            const gridY = sefira.boundaryCircleCoordinates.grid[1]
            const x = xStart + (gridX * stepSizeX);
            const y = yStart + (gridY * stepSizeY);

            return (

            <g id={sefira.id} key={sefira.id} className="sefirot-chart__sefira">
                <circle
                    cx={x}
                    cy={y}
                    r={r}
                />
                {/* y={y-r} style={ {height: (r*2) +'px', width: (r*2) +'px'} } */}
                <foreignObject  x={x-r} y={y-r} width={length} height={length} >

                    <div className='sefirot-chart__sefira__innerText' >

                     <p>{names[namesToDisplay][i]}</p>


                    </div>
                </foreignObject>

            </g>

            ) })
        }
    </svg>
</div>) //End of sefirot-chart
}// End of Render

} //End of component


//React-redux connect
const mapStateToProps = (storeState) =>  {
    const { sefirotData, names } = storeState;
    const {cx, cy} = sefirotData[0].boundaryCircleCoordinates;




    return {
        xStart: cx,
        yStart: cy,
        sefirotData,  names
    }
}

export default connect(
    mapStateToProps
  )(Chart);
