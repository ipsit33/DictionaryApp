import React, { useContext, useEffect, useState } from "react";
import rj from "./song.mp3";
import SearchContext from "../searchContext";
import CustomNavbar from "./navbar/navbar";
import { GiSpeaker } from 'react-icons/gi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import {BsBookmarkHeartFill} from 'react-icons/bs';
import Bookmarks from "./bookmark";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function HomePage() {
  const [bookmarks, setBookmarks] = useState([]);
  const { search } = useContext(SearchContext);
  const [arr, setArr] = useState([]);
  const [wholearr, setWholeArr] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [wholearr1, setWholeArr1] = useState([]);
  const [filteredArr1, setFilteredArr1] = useState([]);

  // search hooks
  const [searchHistory, setSearchHistory] = useState([]);

  // search hooks implememntation
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // handleClearHistory
  const handleClearHistory = () => {
    // Clear the search history
    setSearchHistory([]);
    
    // Remove the search history from localStorage
    localStorage.removeItem("searchHistory");
    
    // Send a request to your server to clear the search history associated with the user's token
    fetch('http://localhost:8080/clear-search-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: token })
    })
      .then(response => response.json())
      .then(updatedSearchHistory => {
        // Handle the response or perform any additional actions if needed
      })
      .catch(error => console.error(error));
  };
  

  // api setting 
  const getData = async () => {
    await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${search}?key=b454008b-2ee5-41e8-a29e-5efb9fd0df15`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        setWholeArr(data);

    }
      ) 
    };

    // sound api
    const getData1 = async () => {
      await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setWholeArr1(data);
          if (Array.isArray(data)) {
            const filteredArr1 = data.map((item) => {
              const audio = item.phonetics.find((phonetic) => phonetic.audio);
              return {
                text: item.phonetics[0]?.text,
                audio: audio ? audio.audio : null,
              };
            });
            setFilteredArr1(filteredArr1);
          } else {
            setFilteredArr1([]);
          }
        });
    };
  

  const handleButton = () => {
    if(!token){
      alert("Log in first to proceed !!");
      window.location.reload();
    }
    else 
    if (search !== "") {
      getData();
      // 
      setSearchHistory((prevHistory) => [search, ...prevHistory]);
    }
  };

  // bookamark
  const handleBookmark = (word,def,syns,ants) => {
    // setBookmarks((prevBookmarks) => [...prevBookmarks, word]);
    fetch('http://localhost:8080/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ word,def,syns,ants,userId:token})
    })
      .then(response => response.json())
      .then(updatedBookmarks => setBookmarks(updatedBookmarks))
     
      .catch(error => console.error(error));
      alert("Word added to bookmark section");
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
      getData1();
    }
  }, [search, wholearr]);
  

  const audio = new Audio(rj);
  const [currentDate, setCurrentDate] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
      setCurrentDate(formattedDate);
    }, 1000); // Update the date every second

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  const handleAudio = () => {
    audio.play();
  };

  const games = [
    {
      title: "Snake Game",
      description:
        "Snake Game is a classic arcade-style video game in which the player controls a snake that moves around a rectangular grid or playing field. The objective of the game is to guide the snake to eat food items, which causes the snake's body to grow longer. As the snake grows, it becomes more challenging to navigate the playing field without colliding with itself or the boundaries.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRr5MgvHfz-_y0TZCFg6KViohO0cYkVcpyKR0aHlEGRQ&usqp=CAU&ec=48665701",
      link: "https://radiant-medovik-c02073.netlify.app/"
    },
    {
      title: "Sudoku",
      description:
        "Sudoku is a logic-based number placement puzzle. The objective is to fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 sub-grids contains all of the digits from 1 to 9.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0SDSndXfhKAovv-rSjRvqYRMvw3ZRHbrliaiX-qMS2w&usqp=CAU&ec=48665701",
      link: "https://648f510e3b64505a28ec6912--silver-cobbler-a096ce.netlify.app/"
    },
    {
      title: "Cross Word",
      description:
        "Cross Word is a popular word puzzle game. The objective is to fill in the white squares with letters, forming words or phrases, by solving clues that lead to the answers.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUxe7M_v6BgCDcDxh6Okfaoo0iiubenSel865WJjc4A&usqp=CAU&ec=48665701",
      link: "http://www.earthfluent.com/crossword-puzzle-demo.html"
    }
  ];

  // blogs
  const blogs = [
    {
      imageLink: "https://dtcfza6z1c8xn.cloudfront.net/OLD_WoTM_culture_war.png",
      title: "Spread the World",
      description: "A recent addition to our online dictionary is the term culture war, which is used to describe the conflict between groups of people with different ideals and beliefs.",
      link: "https://learningenglishwithoxford.com/2023/03/23/culture-war/",
      info: "Read our Blog",
    },
    {
      imageLink: "https://dtcfza6z1c8xn.cloudfront.net/grammar-promo-square.png",
      title: "Learn & Practise Grammar",
      description: "Our grammar pages combine clear explanations with interactive exercises to test your understanding.",
      link: "https://www.oxfordlearnersdictionaries.com/grammar/online-grammar/table-of-contents",
      info: "Try it Out",
    },
    {
      imageLink: "https://dtcfza6z1c8xn.cloudfront.net/OLD_home_newtopicsfeature.png",
      title: "Topic Dictionaries",
      description: "Our Topic Dictionaries are lists of topic-related words, like Animals and Health, that can help you expand your vocabulary. Each topic is divided into smaller subtopics and every word has a CEFR level.",
      link: "https://www.oxfordlearnersdictionaries.com/topic/",
      info: "Browse Topics",
    }
  ];

  // resources
  const resources=[
    {
      imageLink:"https://www.oxfordlearnersdictionaries.com/external/images/home_2020/OLD_home_productsOALD.png?version=2.3.48",
      info:"Oxford Advanced Learner's Dictionary",
      link:"We offer a number of premium products on this website to help you improve your English."
    },
    {
      imageLink:"https://www.oxfordlearnersdictionaries.com/external/images/home_2020/OLD_home_productsOLDAE.png?version=2.3.48",
      info:"Oxford Learner's Dictionary of Academic English",
      link:"https://www.oxfordlearnersdictionaries.com/definition/academic/"
    },
    {
      imageLink:"https://www.oxfordlearnersdictionaries.com/external/images/home_2020/OLD_home_productsCollocs.png?version=2.3.48",
      info:"Oxford Collocations Dictionary",
      link:"https://www.oxfordlearnersdictionaries.com/definition/collocations/"
    }
  ];
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // store in db.json
  // };

  return (
    <div className={"homepage "}>
    
    {/* search history */}
    {/* <div>
          <h2>Search History:</h2>
          {searchHistory.map((word, index) => (
              <p key={index}>{word}</p>
          ))}
    </div> */}

    {/* Clear search history */}
    {/* <button onClick={handleClearHistory}>Clear Search History</button> */}

    


    {/* bookmar button */}
    {/* <button>My Bookmarks</button> */}
      {/* searchar bar */}
      <CustomNavbar performSearch={handleButton} />
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
            <button onClick={() => handleBookmark(arr[0].meta.id,arr[0].shortdef,arr[0].meta.syns[1],arr[0]?.meta?.ants)}><BsBookmarkHeartFill/>Bookmark</button>
          </div>
        )}
        {filteredArr1.length > 0 && (
          <div>
            <h3>Pronunciation:</h3>
            <p>{filteredArr1[0]?.text}</p>
            {filteredArr1[0]?.audio && (
              <div>
                <VolumeUpIcon
                  onClick={() => {
                    const audioElement = new Audio(filteredArr1[0].audio);
                    audioElement.play();
                  }}
                />
              </div>
            )}
          </div>
        )}

      </div>
      
    ) : search !== "" ? (
      <h1>Loading...</h1>
    ) : null}

      {/* Display bookmarks */}
      <div>
      {/* <h2>Bookmarks:</h2> */}
      {/* {bookmarks.map((bookmark, index) => (
        <p key={index}>{bookmark}</p>
      ))} */}
      
    </div>

  

      {/* <img src={pic} alt="" /> */}
      <h1>Word Of the Day</h1>
      <div className="box">
        <h5>React Js</h5>
        <pre>[Trending Technology] <button onClick={handleAudio}><GiSpeaker /></button></pre>
        <div>
          <a href="https://silicon.ac.in/" target="_blank" rel="noopener noreferrer">Meaning & Examples</a>
          <p>{currentDate.toUpperCase()}</p>
        </div>
      </div>

      {/* games */}
      <div>
        <h2>FUN GAMES</h2>
        {games.map((game, index) => (
          <div key={index}>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <p>Click the image to play</p>
            <a href={game.link} target="_blank" rel="noopener noreferrer">
              <img src={game.imageUrl} alt="thanks" />
            </a>
          </div>
        ))}
      </div>

      {/* blogs */}
      <div>
        <h2>Our Famous Blogs</h2>
        {blogs.map((blog, index) => {
          return (
            <div key={index}>
              <img src={blog.imageLink} alt="Loading" />
              <h2>{blog.title}</h2>
              <h3>{blog.description}</h3>
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                <p>{blog.info}</p>
              </a>
            </div>
          );
        })}

        {/* resources */}
        <div>
          <h2>Learn more with these dictionary and grammar resources</h2>
          <p>We offer a number of premium products on this website to help you improve your English.</p>
          {
            resources.map((res,index)=>{
              return(
                <div key={index}>
                  <img src={res.imageLink} alt="error"/>
                  <a href={res.link} target="_blank" rel="noopener noreferrer"><p>{res.info}</p></a>
                </div>
              );
          })}
        </div>

        {/* newslater */}
        <div>
          <h2>Have You Subscribed to Our Newsletters?</h2>
          <blockquote>Get the latest in language trends  <br/>
          and grammar tips delivered right to you.</blockquote>
          <input type="email" name="mail" placeholder="enter yr mail" id="" /><button type="submit">Subscribe Now</button>
          {/* button need to be linked with login/signup */}
        </div>
      </div>

      {/* footer */}
      <div>
  <div>
    <h3>DictionaryWebsite</h3>
    <h3>Grammer Coach</h3>
  </div>
  <div>
    <h3>Follow us</h3>
    <a href="https://www.linkedin.com">
  <FaLinkedin size={50} />
</a>
<a href="https://twitter.com">
  <FaTwitter size={50} />
</a>
<a href="https://www.facebook.com">
  <FaFacebook size={50} />
</a>
<a href="https://www.instagram.com">
  <FaInstagram size={50} />
</a>

  </div>
  <div>
    Name: <input type="text" />
    Email: <input type="email" />
    Query: <textarea name="" id="" cols="30" rows="10"></textarea>
    <button type="submit">Will resolve the issue</button>
  </div>
  <pre>© 2023 Dictionary.com, LLC</pre>
</div>
      {/* button for theme change */}
      {/* <button onClick={handleThemeMode}>Toggle Theme</button> */}

    </div>
  );
}

export default HomePage;