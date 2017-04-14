import React, { Component } from 'react';

import MainMap from './Map';
import WelcomeModal from './WelcomeModal';
import MyNavbar from './nav';
import {store} from './DataStore';


export default class TheApp extends Component {


    constructor(props) {
        super(props);

        this.state = {
            lat: 37.0902,
            lng: -95.7129,
            zoom: 3,
            routeData: {features: []},
            boundaryData: {features: []},
        }

        //TODO: Hard-coded map center for now.  In the future the value
        // will be provided by the 'Search' component
        const options = {center: [this.state.lat, this.state.lng], radius: 40000};
        const that = this;
        store.backend.load(options, function(backendData){
            that.setState({
                routeData: backendData.route,
                boundaryData: backendData.boundary
            });
        });
    }


    componentDidMount() {

    }



    render() {
        const objectCount = this.state.routeData.features.length + this.state.boundaryData.features.length;
        return (
            <div>
                <div className="navBar">
                    <MyNavbar/>
                </div>
                <div >
                    <WelcomeModal uiState={store.uiState.currentState} count={objectCount}/>
                    <MainMap routeData={this.state.routeData} boundaryData={this.state.boundaryData} />
                </div>
            </div>
    );
    }
}