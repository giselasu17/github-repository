import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import SelectLanguaje from './SelectLanguage';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }
    }

    updateLanguage = (lang) => {
        this.setState(() => {
            return {
                selectedLanguage: lang
            }
        });
    }

    render () {
        return (
            <div>
                <SelectLanguaje 
                    onSelectedLanguage = {this.state.selectedLanguage}    
                    onSelect = {this.updateLanguage}  
                />
            </div>
        )
    }
}

export default Popular;