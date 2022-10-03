import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { delGameDetail, getGameDetail } from './../../actions/index';
import { useParams } from 'react-router-dom';
import React from 'react';
import './GameDetail.scss';

function GameDetail({getGameDetail, delGameDetail, gameDetail}){
    console.log(gameDetail)
    let params = useParams();
    React.useEffect(() =>{
        getGameDetail(params.id, params.createdInDb);
    }, [params, getGameDetail])

    return(
        <div className='container-detail'>
            {gameDetail.name !== undefined &&
                <>
                    <div className='container-image'>
                        <h2 className='detail-title'>{gameDetail.name}</h2>
                        <img className='detail-image' src={gameDetail.image} alt={gameDetail.name}/>
                        <p className='detail-released'>RELEASED <br/>{gameDetail.released}</p>
                        <p className='detail-rating'>RATING <br/>{gameDetail.rating}/5</p>
                    </div>
                    <p className='detail-desc'>{gameDetail.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                    <ul className='platform-list'>
                        {gameDetail.platforms.length > 0 && gameDetail.platforms.map((platform, index) =>
                            <li key={index} className='detail-platform'>{platform}</li>    
                            )}
                    </ul>
                    <Link className='button-back' to='/home' onClick={() => delGameDetail()}>BACK</Link>
                </>

            }
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        gameDetail: state.gameDetail
    }
}

export default connect(mapStateToProps, { getGameDetail, delGameDetail })(GameDetail);