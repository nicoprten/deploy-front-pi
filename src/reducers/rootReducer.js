const initialState = {
    allGames: [],
    games: [],
    gamesByName: [],
    gameDetail: {},
    genres: []
}

export default function rootReducer( state = initialState, action){
    switch(action.type){
        case 'GET_ALL_GAMES':
            return {
                ...state,
                allGames: action.payload,
                games: action.payload
            }
        case 'GET_GAME_DETAIL':
            return {
                ...state,
                gameDetail: action.payload
            }
        case 'GET_GAME_BY_NAME':
            return {
                ...state,
                allGames: action.payload,
                gamesByName: action.payload,
                games: action.payload
            }
        case 'DEL_GAME_DETAIL':
            return {
                ...state,
                gameDetail: {}
            }
        case 'DEL_ALL_GAMES':
            return {
                ...state,
                allGames: []
            }
        case 'POST_GAME':
            return {
                ...state
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'FILTER_BY':
            let gamesFiltered = [];
            // console.log(action.payload)
            // console.log(action.payload.lastGameSearched)
            // if(!action.payload.lastGameSearched){
            //     console.log('NO EXISTE')
            // }

            // POR NOMBRE Y GENERO Y CREADO EN BBDD
            if(action.payload.lastGameSearched && action.payload.genreFilter && action.payload.createdFilter){
                let gamesFilterByCreated = [];
                if(action.payload.createdFilter === 'true'){
                    gamesFilterByCreated = state.gamesByName.filter((g) => {return g.createInDb === true});
                }else{
                    gamesFilterByCreated = state.gamesByName.filter((g) => {return g.createInDb === false});
                }
                gamesFiltered = gamesFilterByCreated.filter((g) => {return g.genres.includes(action.payload.genreFilter)});
            }
            // POR NOMBRE Y GENERO
            else if(action.payload.lastGameSearched && action.payload.genreFilter && !action.payload.createdFilter){
                gamesFiltered = state.gamesByName.filter((g) => {return g.genres.includes(action.payload.genreFilter)});
            }
            // POR NOMBRE Y CREADO EN BBDD
            else if(action.payload.lastGameSearched && !action.payload.genreFilter && action.payload.createdFilter){
                if(action.payload.createdFilter === 'true'){
                    gamesFiltered = state.gamesByName.filter((g) => {return g.createInDb === true});
                    console.log("holaaa",gamesFiltered)
                }else{
                    gamesFiltered = state.gamesByName.filter((g) => {return g.createInDb === false});
                }
            }
            // POR GENERO Y CREADO EN BBDD
            else if(!action.payload.lastGameSearched && action.payload.genreFilter && action.payload.createdFilter){
                console.log('POR GENERO Y BBDD')
                gamesFiltered = state.games.filter((g) => {return g.genres.includes(action.payload.genreFilter)});
                if(action.payload.createdFilter === 'true'){
                    gamesFiltered = gamesFiltered.filter((g) => {return g.createInDb === true});
                }else{
                    gamesFiltered = gamesFiltered.filter((g) => {return g.createInDb === false});
                }
            }
            // SOLO POR GENERO
            else if(!action.payload.lastGameSearched && action.payload.genreFilter && !action.payload.createdFilter){
                gamesFiltered = state.games.filter((g) => {return g.genres.includes(action.payload.genreFilter)});
            }
            // SOLO POR CREADO EN BBDD O NO
            else if(!action.payload.lastGameSearched && !action.payload.genreFilter && action.payload.createdFilter){
                if(action.payload.createdFilter === 'true'){
                    gamesFiltered = state.games.filter((g) => {return g.createInDb === true});
                }else{
                    gamesFiltered = state.games.filter((g) => {return g.createInDb === false});
                }
            }



            return {
                ...state,
                allGames: gamesFiltered
            }
        case 'ORDER_BY':
            console.log('action.payload')
            if (state.allGames) {
                console.log(action.payload)
                if (action.payload === 'higher' || action.payload === 'lower') {
                    // console.log('higher or lower')
                    const orderedGamesbyRating = action.payload === 'higher' ? 
                        state.allGames.sort ((a,b)=> {
                            if (a.rating < b.rating) return 1;
                            if (a.rating > b.rating) return -1;
                            return 0;
                        })
                        : state.allGames.sort ((a,b)=> {
                            if (a.rating > b.rating) return 1;
                            if (a.rating < b.rating) return -1;
                            return 0;
                        });
                        console.log(orderedGamesbyRating);
                    return {
                        ...state,
                        allGames: orderedGamesbyRating
                    }
                }else if (action.payload === 'asc' || action.payload === 'desc') {
                    const orderedGames = action.payload === 'asc' ? 
                    state.allGames.sort ((a,b)=> {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                        return 0;
                    })
                    : state.allGames.sort ((a,b)=> {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    })
                    return {
                        ...state,
                        allGames: orderedGames
                    };   
                }else {
                    return {
                        ...state
                    }
                }
            }
            return {
                ...state
            }
        default:
            return state;
    }
}