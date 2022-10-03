import { Link } from 'react-router-dom';
import './ButtonHome.scss';
// import { connect } from 'react-redux';
// import { getGames } from './../../actions/index';

export default function ButtonHome(){

    return(
        <>
            <Link to='/home' className='link-home' 
            // onClick={() => getGames()}
            >
                Enter
            </Link>
        </>
    )
}

// const mapStateToProps = (state) =>{
//     return {
//         games: state.games
//     }
// }

// export default connect(mapStateToProps, {  })(ButtonHome);