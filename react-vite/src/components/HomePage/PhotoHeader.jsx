import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBusinesses } from '../../redux/search';

function PhotoHeader() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleClick = e => {
        e.preventDefault();
        const queryParams = new URLSearchParams()
        queryParams.append('category', 3)
        queryParams.append('search_query', 'groomer')
        const categoryFromParams = queryParams.get('category');
        const queryFromParams = queryParams.get('search_query');
        const queryString = queryParams.toString();
        const url = `/search?${queryString}`;
        dispatch(fetchBusinesses(queryFromParams, '', `category=${categoryFromParams}`, 1, 10)).then(() => {
            navigate(url)

        })

    }

    return (
        <>
            <div className="photoHeader">
                <img src="https://thepawimages.s3.us-west-2.amazonaws.com/salon_dog.jpg" />
                <div className="photoHeaderText">
                    <h1>Keep your pet lookin&apos; fresh</h1>
                    <div>
                        <button onClick={handleClick}><i className="fa-solid fa-magnifying-glass" />&nbsp;&nbsp;&nbsp;Groomers</button>
                    </div>
                </div>
                <div className="photoHeaderCredit">
                    <div><Link to="/businesses/9">Salon Dog</Link></div>
                    <div style={{ fontWeight: "300" }}>Photo by Simon K.</div>
                </div>
            </div >
        </>
    )
}

export default PhotoHeader
