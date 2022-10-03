import './Pages.scss';

export default function Pages({ allGames, gamesPerPage, setPage }){

    const pageNumbers = [];
    // console.log(allGames)
    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    }
    return(
        <nav>
            <ul className='pages-numbers'>
                {
                    pageNumbers && pageNumbers.map(num => {
                        return (
                            <li className='pages-item' key= {num} onClick={() => setPage(num)}>
                                {num}
                            </li>
                        )
                    })
                }
            </ul> 
        </nav>
    )
}