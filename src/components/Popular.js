import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import SelectLanguaje from './SelectLanguage';
import RepoGrid from './RepoGrid';
import api from '../utils/api';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
    }

    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage);
    }
    
    updateLanguage = (lang) => {
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });
         api.fetchPopularRepos(lang)
            .then((repos) => {
                this.setState(() => {
                    return {
                        repos: repos
                    }
                })
            });
    }

    render () {
        return (
            <div>
                <SelectLanguaje 
                    onSelectedLanguage = {this.state.selectedLanguage}    
                    onSelect = {this.updateLanguage}
                />
                {!this.state.repos
                    ?<p>Loading</p>
                    : <RepoGrid repos = {this.state.repos} language = {this.state.selectedLanguage}/>
                }
            </div>
        )
    }
}

export default Popular;