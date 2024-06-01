import { useState, useEffect } from 'react';


const PlacesSearch = ({ onLocationSelect, location }) => {


  console.log(location, "location in places search")
  const [input, setInput] = useState(location);
  const [predictions, setPredictions] = useState([]);
  const [fetching, setFetching] = useState(true);


console.log(predictions, "PREDICTION IN PLACESSE")
  useEffect(() => {
    if (fetching && input.length > 0) {
      fetchPredictions(input);
    } else {
      setPredictions([]);
    }
  }, [input, fetching]);

  const fetchPredictions = async (input) => {
    const apiKey = "AIzaSyBNoJsZRS-Nmk6eZ_p_xrYhk32Lw3oXaKs";
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
    const location = place.replace(', USA', '');
    console.log('User clicked:', location);
    // Set the input value to the clicked prediction without 'USA'
    setInput(location);
    setFetching(false)
    setPredictions([]);
    onLocationSelect(location);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setFetching(true);

  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search for places..."
      />
      { predictions && predictions.length > 0 && (
        <ul>
          {predictions.map((prediction, index) => (
            <li className="modalLink" key={index} onClick={() => handleClick(prediction)}>
              {prediction.placePrediction.text.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesSearch;
