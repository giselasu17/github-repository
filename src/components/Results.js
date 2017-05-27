import React, { Component } from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Player from './Player';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount () {
        var players = queryString.parse(this.props.location.search);
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]). then((results) => {
            if(results === null) {
                return this.setState(() => {
                    return {
                        error: "Looks like there was error. Check that both users exist on Github",
                        loading: false
                    }
                });
            }

            this.setState(() => {
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }
            });
        });
    }
    
    render () {
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading =  this.state.loading;

        if(loading === true) {
            return <Loading/>
        }

        if(error) {
            return(
                <div>
                    <p>{error}</p>
                    <Link className = "button-home" to = "/battle">Reset</Link>
                </div>
            )
        }
        return (
            <div>
            <div className = "row">
                <Player
                    label = "Winner"
                    score = {winner.score}
                    profile = {winner.profile}
                />
                <Player
                    label = "Loser"
                    score = {loser.score}
                    profile = {loser.profile}
                />
            </div>
                <Link  className = "button-home" to ="">Reset</Link>
            </div>

        )
    }
}

export default Results;