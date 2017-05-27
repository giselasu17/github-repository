import axios from 'axios';

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

const getProfile = (username) => {
    return axios.get('https://api.github.com/users/' + username + param)
        .then((user) => {
            return user.data;
        });
}

const getRepos = (username) => {
    return axios.get('https://api.github.com/users/' +  username + '/repos'+ param + '&per_page=100')
}

const getStarsCount = (repos) => {
    return repos.data.reduce((count, repo) => {
        return count + repo.stargazers_count;
    }, 0)
}

const calculateScore = (profile, repos) => {
    var followers = profile.followers;
    var totalStarts = getStarsCount(repos);

    return(followers * 3) + totalStarts;
}

const getUserData = (player) => {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data) => {
        var profile = data[0];
        var repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    });
}

const sortPlayers = (players) => {
    return players.sort((a,b) => {
        return b.score - a.score;
    })
}
const handleError = (error) => {
    console.warn(error);
    return null;
}
const api = {
    battle: (players) => {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
    fetchPopularRepos: (lang) => {
        const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+lang+'&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI)
            .then( (response) => {
                return response.data.items
            })
    }
}

export default api;