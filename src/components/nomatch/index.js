import React, { Component } from 'react';
import not_found from './not_found.png';
export default class NoMatch extends Component {
    render() {
        return (
            <div>
               <img src={not_found} alt="NotFound"/>
            </div>
        );
    }
}