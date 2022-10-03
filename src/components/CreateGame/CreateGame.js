import { connect } from 'react-redux';
import { createGame, getGenres } from './../../actions/index';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './CreateGame.scss';

function CreateGame({ createGame,  getGenres, genres}){

    const navigate = useNavigate();
    const platforms = [
        "PC",
        "Playstation 5",
        "Playstation 4",
        "Xbox One",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "GameBoy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
]

    // console.log(genres)
    useEffect(() => {
        getGenres();
    }, [getGenres])

    const [input, setInput] = useState({
        name: '',
        description: '',
        date: '',
        rating: 0,
        genres: [],
        platforms: [],
        image: ''
    });

    function handleOnChange(e){
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        })
    }
    // console.log(input)

    function handleOnSubmit(e){
        e.preventDefault();
        if(input.rating > 0 && input.rating < 6 && input.description && input.name && input.genres.length > 0 && input.platforms.length > 0 && input.date){
            if(!input.image){
                input.image = 'https://fisnikde.com/wp-content/uploads/2019/01/broken-image.png';
            }
            createGame(input);
            setInput({
                name: '',
                description: '',
                date: '',
                rating: 0,
                genres: [],
                platforms: [],
                image: ''
            });
            console.log('New game created');
            navigate("/home");
        }else{
            console.log('There is some input empty.')
        }
    }

    function handleGenres(e){
        if(e.target.checked){
            // console.log(e.target.value)
            if(!input.genres.includes(e.target.value)){
                setInput({
                    ...input,
                    genres: [...input.genres, e.target.value]
                })
            }
        }else{
            const genresFiltered = input.genres.filter(g => g !== e.target.value);
            setInput({
                ...input,
                genres: genresFiltered
            })
        }
    }
    function handlePlatforms(e){
        if(e.target.checked){
            // console.log(e.target.value)
            if(!input.platforms.includes(e.target.value)){
                setInput({
                    ...input,
                    platforms: [...input.platforms, e.target.value]
                })
            }
        }else{
            const platformsFiltered = input.platforms.filter(p => p !== e.target.value);
            setInput({
                ...input,
                platforms: platformsFiltered
            })
        }
    }

    return(
        <>
            <h2>Create a new game</h2>
            <form className="container-form" onSubmit={(e) => handleOnSubmit(e)}>
                {/* nombre descripcion lanzamiento rating generos platforms */}
                <input type='text' placeholder='Name of the game' name='name' onChange={(e) => handleOnChange(e)}></input>
                <textarea type='text' placeholder='Write a description' name='description' onChange={(e) => handleOnChange(e)}></textarea>
                <input type='text' placeholder='Realease date - 2013-09-17' name='date' onChange={(e) => handleOnChange(e)}></input>
                <input type='text' placeholder='URL of the image' name='image' onChange={(e) => handleOnChange(e)}></input>
                <div className='container-rating'>
                    <label for="rate">Rating:</label>
                    <select id='rate' name='rating' onChange={(e) => handleOnChange(e)}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
                <h3>Genres</h3>
                <div className='container-genres'>
                    {genres.length > 0 && genres.map((genre) => {return(
                        <label key={genre.id} onChange={(e) => handleGenres(e)}><input type="checkbox" id={genre.id} value={genre.name}/>{genre.name}</label>
                    )})}
                </div>
                <h3>Platforms</h3>
                <div className='container-platforms'>
                    {platforms.length > 0 && platforms.map((platform, index) => {return(
                        <label key={index} onChange={(e) => handlePlatforms(e)}><input type="checkbox" id={index} value={platform}/>{platform}</label>
                    )})}
                </div>
                <button className='button-submit' type='submit'>Create game</button>
            </form>
            <Link className='button-back-form' to='/home'>BACK</Link>
        </>
    )
}

const mapStateToProps = (state) =>{
    return {
        genres: state.genres
    }
}

export default connect(mapStateToProps, { createGame, getGenres })(CreateGame);