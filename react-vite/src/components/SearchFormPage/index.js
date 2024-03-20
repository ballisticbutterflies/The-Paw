import SearchFormPage from './SearchFormPage';

export const starsToFixed = (stars) => {
  if (stars >= 1) {
    return stars.toFixed(1)
  } else {
    return null
  }
}


export default SearchFormPage;
