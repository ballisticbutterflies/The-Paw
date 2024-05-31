import { useEffect, useState, useRef } from 'react';

const PlacesSearch = () => {
  const [request, setRequest] = useState({
    input: "",
    includedPrimaryTypes: ["(cities)"],
    language: "en-US",
    region: "us",
    includedRegionCodes: ["us"],
  });
  const titleRef = useRef(null);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);
  let token = useRef(null);

  const init = async () => {
    token.current = new google.maps.places.AutocompleteSessionToken();
    const title = titleRef.current;
    const results = resultsRef.current;
    const input = inputRef.current;

    input.addEventListener("input", makeAcRequest);
    refreshToken();
  };

  const makeAcRequest = async (event) => {
    if (event.target.value === "") {
      titleRef.current.innerText = "";
      resultsRef.current.replaceChildren();
      return;
    }

    const updatedRequest = { ...request, input: event.target.value };
    setRequest(updatedRequest);

    const { suggestions } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(updatedRequest);

    titleRef.current.innerText = 'Query predictions for "' + updatedRequest.input + '"';
    resultsRef.current.replaceChildren();

    for (const suggestion of suggestions) {
      const placePrediction = suggestion.placePrediction;
      const a = document.createElement("a");

      a.addEventListener("click", () => {
        onPlaceSelected(placePrediction.toPlace());
      });
      a.innerText = placePrediction.text.toString();

      const li = document.createElement("li");
      li.appendChild(a);
      resultsRef.current.appendChild(li);
    }
  };

  const onPlaceSelected = async (place) => {
    await place.fetchFields({
      fields: ["displayName", "formattedAddress"],
    });

    const placeText = document.createTextNode(
      place.displayName + ": " + place.formattedAddress
    );

    resultsRef.current.replaceChildren(placeText);
    titleRef.current.innerText = "Selected Place:";
    inputRef.current.value = "";
    refreshToken();
  };

  const refreshToken = () => {
    token.current = new google.maps.places.AutocompleteSessionToken();
    setRequest((prevRequest) => ({
      ...prevRequest,
      sessionToken: token.current,
    }));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h1 id="title" ref={titleRef}></h1>
      <input type="text" ref={inputRef} />
      <ul id="results" ref={resultsRef}></ul>
    </div>
  );
};

export default PlacesSearch;
