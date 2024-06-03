// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "../../redux/search";
import "./SearchForm.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import { getTodaysHours } from "../../utils";
import { useEffect, useState } from "react";


function SearchFormPage() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const search_query = searchParams.get('search_query')
  const searchLoc = searchParams.get('location')
  const price = searchParams.get('price')
  const rating = searchParams.get('rating')

  const queryParams = new URLSearchParams();
  if (category) queryParams.append('category', category);
  if (price) queryParams.append('price', price);
  if (rating) queryParams.append('rating', rating);
  const filter = queryParams.toString();

  const businesses = Object.values(useSelector((state) => state.search.businesses))
  const { total, pages, currentPage, perPage } = useSelector(state => state.search.pagination);

  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 768 && window.innerWidth >= 481);
  const [filterChange, setFilterChange] = useState(false);
  const [loading, setLoading] = useState(true)


  const handleResize = () => {
    setIsMobile(window.innerWidth <= 480);
    setIsTablet(window.innerWidth <= 768 && window.innerWidth >= 481);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  const starReviews = (numStars) => {

    let filledStars = []
    let emptyStars = []

    for (let i = 0; i < parseInt(numStars); i++) {
      filledStars.push(<span className='paws-filled' style={{ fontSize: "large" }}><i className="fa-solid fa-paw" />&nbsp;</span>)
    }
    let empty = 5 - filledStars.length
    for (let i = 0; i < empty; i++) {
      emptyStars.push(<span className='paws-unfilled' style={{ fontSize: "large" }}><i className="fa-solid fa-paw" />&nbsp;</span>)
    }
    return [filledStars, emptyStars]
  }

  const starsToFixed = (stars) => {
    let int = +stars
    if (int >= 1) {
      return int.toFixed(1)
    } else {
      return false
    }
  }


  const reviewsExists = (review) => {
    if (review === 1) {
      return '(' + review + ' ' + 'review' + ')'
    }
    if (review >= 1) {
      return '(' + review + ' ' + 'reviews' + ')'
    }
    return false
  }

  const reviewTextSubstr = (text) => {
    if (text.length > 85) {
      return text.substring(0, 85) + "..."
    } else {
      return text
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
    if (!search_query && !filter && !filterChange) {
      dispatch(fetchBusinesses(search_query, searchLoc, filter, page, perPage)).then(() => setTimeout(() => {
        setLoading(false);
      }, 1200))
        .catch(error => {
          return error
        })
    }


    if (filter && !filterChange) {
      console.log('{||||||| USE EFFECT |||}')

      setLoading(true)
      dispatch(fetchBusinesses(search_query, searchLoc, filter, page, perPage)).then(() => setTimeout(() => {
        setLoading(false);
      }, 1200))
        .catch(error => {
          return error
        })
    }
    if (search_query) {
      setLoading(true)
      let searchLoc = ''
      dispatch(fetchBusinesses(search_query, searchLoc, filter, page, perPage)).then(() => setTimeout(() => {
        setLoading(false);
      }, 1200))
        .catch(error => {
          return error
        })
    }

  }, [dispatch, page, perPage, filter, search_query, filterChange, searchLoc, category])

  // Reset page state when search query or filters change
  useEffect(() => {
    setPage(1);
  }, [search_query, filter, searchLoc, category]);

  const handleFilterChange = (filters) => {

    setPage(1)
    setFilterChange(true)
    setLoading(true);
    dispatch(fetchBusinesses(search_query, searchLoc, filters, 1, perPage)).then(() => setTimeout(() => {
      setLoading(false);
    }, 1200))
      .catch(error => {
        return error
      })
    const url = `/search?${filters}`;
    navigate(url)
  }

  console.log(filter, "FILTERSSESRSERES")

  const handleNextPage = (e) => {
    e.preventDefault();
    const nextPage = currentPage + 1;
    if (nextPage <= pages) {
      setPage(nextPage);
      setLoading(true)
      dispatch(fetchBusinesses(search_query, searchLoc, filter, nextPage, perPage)).then(() => setTimeout(() => {
        setLoading(false);
      }, 1200));
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setPage(prevPage);
      setLoading(true)
      dispatch(fetchBusinesses(search_query, searchLoc, filter, prevPage, perPage)).then(() => setTimeout(() => {
        setLoading(false);
      }, 1200));
      window.scrollTo(0, 0); // Scroll to top
    }
  };


  return (
    <>
      <div className="searchPage">
        {loading ? (
          <div className="loader"></div>
        ) : (
          businesses.length === 0 ? (
            <>
              <h1>{total} Paw-Recommended Results:</h1>
              <FilterComponent onFilterChange={handleFilterChange} isMobile={isMobile} isTablet={isTablet} />
              <span className="noBiz" >No results found.<img src="/images/icons/404.png" /></span>
            </>
          ) : (
            <>
              <h1>{total} Paw-Recommended Results:</h1>
              <FilterComponent onFilterChange={handleFilterChange} isMobile={isMobile} isTablet={isTablet} />
              {businesses && businesses.map((business, index) => (
                <div className="card" key={business.id}>
                  <Link className="businessCards" style={{ textDecoration: "none" }} to={`/businesses/${business.id}`}>

                    <span className="businessesImageWrapper">

                      {business.images?.[0] ? (
                        <img className="businessesImage" src={business.images[0]} alt={business.name} />
                      ) : (
                        <img className="businessesImage" src='../../images/default_business.jpeg' alt={business.name} />
                      )}

                    </span>

                    <>
                      <span className="businessDeets">
                        <h2>{(currentPage - 1) * perPage + index + 1}.&nbsp;{business.name}</h2>
                        {
                          business.avg_stars &&

                          business.num_reviews && reviewsExists(business.num_reviews) &&
                          <span className="searchStars">{business?.avg_stars && starReviews(business.avg_stars)}
                            &nbsp;{business?.avg_stars && starsToFixed(business.avg_stars)}
                            &nbsp;{business.num_reviews >= 1 && reviewsExists(business.num_reviews)}</span>

                        }

                        {!business.price ? (
                          <p className="priceSubcat">{business.category?.name}
                          </p>
                        ) : (
                          <p className="priceSubcat">{business.price} &nbsp;&#183;&nbsp; {business.category?.name}
                          </p>
                        )
                        }

                        {
                          getTodaysHours(business) &&
                          <span className="todayHours">
                            <span style={{ fontWeight: '600' }}>Today&apos;s Hours:</span> {getTodaysHours(business).open} - {getTodaysHours(business).close}
                          </span>
                        }

                        <span className="review-text-wrapper">
                          {business.recent_review_text ?
                            (
                              <div className="recent-review-text">
                                <i className="fa-regular fa-message fa-flip-horizontal" />

                                &nbsp;&nbsp;
                                {business.recent_review_text &&
                                  reviewTextSubstr(business.recent_review_text)
                                }
                              </div>
                            ) : (
                              <span><span className='paws-unfilled' style={{ fontSize: "medium" }}><i className="fa-solid fa-paw" /></span>&nbsp;&nbsp;Be the first to review!</span>
                            )}
                        </span>
                      </span>
                    </>
                  </Link>
                </div>
              )
              )}
              {
                !loading &&
                <div className="pagination">
                  {currentPage !== 1 &&
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                  }
                  <span>&nbsp;&nbsp;Page {currentPage} of {pages}&nbsp;&nbsp;</span>
                  {currentPage !== pages &&
                    <button onClick={handleNextPage} disabled={currentPage === pages}>Next</button>
                  }
                </div>
              }
            </>
          )
        )}

      </div>
    </>
  );
}

export default SearchFormPage;
