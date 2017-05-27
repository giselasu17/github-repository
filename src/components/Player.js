import React from 'react';
import PropTypes  from 'prop-types';
import PlayerPreview from './PlayerPreview';

const Player = (props) => {
    var info = props.profile;
    return (
        <div>
            <h1 className = "header">{props.label}</h1>
            <h3 style = {{textAlign: "center"}}>Score: {props.score}</h3>
            <PlayerPreview 
                avatar = {info.avatar_url} 
                username = {info.login}
            >
            <ul className = "space-list-items">
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href = {info.blog}>{info.blog}</a></li>}
            </ul>
            </PlayerPreview>
        </div>
    );
};

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
}
export default Player;