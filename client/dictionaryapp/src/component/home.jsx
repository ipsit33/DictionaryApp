import React, { useState, useEffect } from "react";
import rj from "./song.mp3";
import { GiSpeaker } from 'react-icons/gi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';


// import pic from "./2.png";

function HomePage() {

  // adding themes
  // const [theme,setTheme]=useState("light");
  // const [themeMode,setThemeMode]=useState("light");

  const audio = new Audio(rj);
  const [currentDate, setCurrentDate] = useState("");

  // css for themes
  // const lightTheme={
  //   backgroundColor: "#ffffff",
  //   color: "#000000",
  // };
  // const darkTheme={
  //   backgroundColor: "#000000",
  //   color: "#ffffff",
  // };
  // function call for theme
  // const handleThemeMode=()=>{
  //   const newThemeMode=themeMode==="light"?"dark":"light";
  //   setThemeMode(newThemeMode);
  //   setTheme(newThemeMode);
  // }
  
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

    // ={`homepage ${themeMode}`} style={theme === "light" ? lightTheme : darkTheme}
    <div className="homepage">
      {/* searchar bar */}
      <div>
          <h3 align="center">Search your word</h3>
          <div> 
              <input type="text" />
              <FontAwesomeIcon icon={faSearch} />
          </div>
      </div>

      {/* <img src={pic} alt="" /> */}
      <h1>Word Of the Day</h1>
      <div className="box">
        <h5>Silicon</h5>
        <pre>[Beyond Everything] <button onClick={handleAudio}><GiSpeaker /></button></pre>
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