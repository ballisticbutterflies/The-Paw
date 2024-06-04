import { useState, useEffect } from 'react';
import './SearchBar.css'


const PlacesSearch = ({ onLocationSelect, location, isSubmitted, setIsPredictionSelected, setIsInputTyped }) => {

  const [input, setInput] = useState(location);
  const [predictions, setPredictions] = useState([]);
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    if (fetching && input.length > 0) {
      fetchPredictions(input);
      setIsInputTyped(true);  // Set input typed to true
    } else {
      setPredictions([]);
    }
  }, [input, fetching]);

  useEffect(() => {
    if (isSubmitted) {
      setPredictions([]);
    }
  }, [isSubmitted]);

  useEffect(() => {
    setInput(location || '');
  }, [location]);

  const fetchPredictions = async (input) => {
    const apiKey = import.meta.env.VITE_PLACES_KEY;
    const url = `https://places.googleapis.com/v1/places:autocomplete?key=${apiKey}`;
    const requestBody = {
      input: input,
      includedPrimaryTypes: ["(cities)"],
      includedRegionCodes: ["us"]

    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setPredictions(data.suggestions);

      } else {
        console.error('Error fetching predictions:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const handleClick = (prediction) => {
    const place = prediction.placePrediction.text.text;
    // Remove 'USA' from the place prediction
    const selectedLocation = place.replace(', USA', '');

    // Set the input value to the clicked prediction without 'USA'
    setInput(selectedLocation);
    setFetching(false)
    setPredictions([]);
    setIsPredictionSelected(true); // Set prediction selected to true
    onLocationSelect(selectedLocation);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setFetching(true);
    setIsPredictionSelected(false); // Reset prediction selected
    setIsInputTyped(true);  // Set input typed to true
  };

  return (
    <div className='location-search-container'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="city, state"
          style={{ flex: 1, border: 'none', marginLeft: 10 }}
        />
      </div>
      {predictions?.length > 0 && (
        <div className="predictions-container">
          <ul>
            {predictions?.map((prediction, index) => (
              <li className="suggestions" key={index} onClick={() => handleClick(prediction)}>
                {prediction.placePrediction.text.text}
              </li>
            ))}
          </ul>
          <div>
            <div style={{ display: 'flex', fontSize: 12, padding: 10 }}>Powered by:<img src='../../images/google_on_white.png' alt="Google Logo" style={{ height: 15, marginLeft: 3, paddingTop: 2 }} /></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesSearch;
