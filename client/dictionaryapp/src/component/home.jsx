import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import SearchContext from "../searchContext";

function HomePage() {
  const { search } = useContext(SearchContext);
  const [arr, setArr] = useState([]);
  const [wholearr, setWholeArr] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  const getData = async () => {
    await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${search}?key=b454008b-2ee5-41e8-a29e-5efb9fd0df15`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        setWholeArr(data);
      });
  };

  const handleButton = () => {
    // if(!token){
    //   alert("Log in first to proceed !!");
    //   window.location.reload();
    // }
    // else 
    if (search !== "") {
      getData();
    }
  };

  useEffect(() => {
    if (search === "") {
      setArr([]);
    } else {
      const filteredArr = wholearr.filter(
        (item) =>
          item.meta &&
          item.meta.id &&
          item.meta.id.toLowerCase().includes(search.toLowerCase())
      );
      setArr(filteredArr);
    }
  }, [search, wholearr]);

  return (
    <div className="homepage">
      <Navbar performSearch={handleButton} />
  
      {arr.length > 0 ? (
      <div>
        {arr[0] && (
          <div key={arr[0]?.meta?.id}>
            {arr[0]?.meta?.id && <h2>{arr[0].meta.id}</h2>}
            {arr[0]?.shortdef && (
              <div>
                <h3>Definitions:</h3>
                {arr[0].shortdef.map((def, index) => (
                  <p key={index}>{def}</p>
                ))}
              </div>
            )}
            {arr[0]?.meta?.syns && arr[0].meta.syns[1] && (
              <h3>Synonym: {arr[0].meta.syns[1].join(", ")}</h3>
            )}
            {arr[0]?.meta?.ants && (
            <div>
                <h3>Antonyms:</h3>
                <p>
                  {arr[0].meta.ants.slice(0, 10).map((antonym, index) => antonym.join(", ")).join(", ")}
                </p>
            </div>
            )}
          </div>
        )}
      </div>
    ) : search !== "" ? (
      <h1>Loading...</h1>
    ) : null}
  
    </div>
  );
  
  
}

export default HomePage;
