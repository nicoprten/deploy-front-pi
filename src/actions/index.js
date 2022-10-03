const axios = require('axios');

export function getGames(){
    return function(dispatch){
        return axios.get('https://deploy-back-pi-production.up.railway.app/videogames')
        .then(r => r.data)
        .then(d => dispatch({type: 'GET_ALL_GAMES', payload: d}))
        .catch(err => console.log(err))
    }
}

export function getGameDetail(id, createdInDb){
    return function(dispatch){
        return axios.get(`https://deploy-back-pi-production.up.railway.app/videogame/${id}/${createdInDb}`)
        .then(r => r.data)
        .then(d => dispatch({type: 'GET_GAME_DETAIL', payload: d}))
        .catch(err => console.log(err))
    }
}

export function getGameByName(name){
    return function(dispatch){
        return axios.get(`https://deploy-back-pi-production.up.railway.app/videogames?name=${name}`)
        .then(r => r.data)
        .then(d => dispatch({type: 'GET_GAME_BY_NAME', payload: d}))
        .catch(err => console.log(err))
    }
}

export function delAllGames(){
    return ({type: 'DEL_ALL_GAMES'})
}

export function delGameDetail(){
    return ({type: 'DEL_GAME_DETAIL'})
}

export function createGame(game){
    return async (dispatch) => {
        try {
        const newGame = await axios.post('https://deploy-back-pi-production.up.railway.app/videogames', game)
        return dispatch({type: 'POST_GAME', newGame});
        }
        catch(err){
            console.log(err)
        };
    };
}

export function getGenres(){
    return function(dispatch){
        return axios.get(`https://deploy-back-pi-production.up.railway.app/genres`)
        .then(r => r.data)
        .then(d => dispatch({type: 'GET_GENRES', payload: d}))
        .catch(err => console.log(err))
    }
}

export function orderBy(order){
    return{type: 'ORDER_BY', payload: order};
}

export function filterBy(filters){
    return {type: 'FILTER_BY', payload: filters};
}