import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuSearch from './../MenuSearch/MenuSearch';
import { getGameByName, getGames, delAllGames } from './../../actions/index';
import { connect } from 'react-redux';
import './SearchGame.scss';

function SearchGame({ getGameByName, getGames, delAllGames, handleOrder}){
    const [search, setSearch] = useState('');
    
    const [searchRender, setSearchRender] = useState('');
    


    // const [checkSearch, setCheckSearch] = useState(false);

    // console.log(search)
    useEffect(() =>{
        console.log(search)
        
        let inputSearch = document.getElementById('input-search');
        inputSearch.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                e.preventDefault();
                if(search){
                    // delAllGames();
                    getGameByName(search);
                    // setSearch('');
                }else{
                    console.log('no escribio nada')
                }
            }
        });

    }, [getGameByName, search, delAllGames])
    
    function handleButton(){
        // delAllGames();
        setSearch(search);

        getGameByName(search);
        setSearchRender('');
    }

    return(
        <>
            <div className='container-search'>
                <input id='input-search' type='text' placeholder='Search any game' onChange={(e) => {
                    setSearchRender(e.target.value)
                    setSearch(e.target.value)

                }} value={searchRender}/>
                <button className='button-search' onClick={() => handleButton()}>SEARCH</button>
                <button className='button-search' onClick={() => {
                    // setSearch('');
                    delAllGames();
                    getGames();
                }}>SEE ALL</button>
                <Link className='button-add' to={'/createGame'}>
                    ADD GAME
                </Link>
            </div>
            <MenuSearch handleOrder={handleOrder} searchValue={search}/>
        </>
    )
}

const mapStateToProps = (state) =>{
    return {
        gamesByName: state.games
    }
}

export default connect(mapStateToProps, { getGameByName, getGames, delAllGames })(SearchGame);