import React, { useState, useEffect } from 'react';
import { AcmeLogo } from './navbar/AcmeLogo';
import { Text } from '@nextui-org/react';
import './bookmark.css';
import toast , {Toaster} from 'react-hot-toast';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // fetch('http://localhost:8080/bookmarks', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      //   .then(response => response.json())
      //   .then(data => setBookmarks(data))
      //   .catch(error => console.error(error));
      callBookmark();
    }
  }, [token]);

  const callBookmark = async() =>{
    try{
      const res = await fetch('/savedwords',{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      // console.log(data);
      setBookmarks(data);
    } catch(err){
      console.log(err);
    }
  };


  // const removeBookmark = bookmarkId => {
  //   fetch(`http://localhost:8080/bookmarks/${bookmarkId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(() => {
  //       const updatedBookmarks = bookmarks.filter(
  //         bookmark => bookmark.id !== bookmarkId
  //       );
  //       setBookmarks(updatedBookmarks);
  //       console.log('Bookmark removed successfully!');
  //     })
  //     .catch(error => console.error(error));
  // };

  // const filteredBookmarks = bookmarks.filter(
  //   bookmark => bookmark.userId === token
  // );

  // Mongodb delete code
  const removeBookmark = bookmarkId => {
    fetch(`/deletebook/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookID: bookmarkId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const updatedBookmarks = bookmarks.filter(
          bookmark => bookmark._id !== bookmarkId
        );
        setBookmarks(updatedBookmarks);
        toast.success('Bookmark removed successfully!');
      })
      .catch(error => console.error(error));
  };  


  // const handleHomepageRedirect = () => {
  //   // Perform redirect to the homepage here
  //   window.navigator("./");
  // };

  return (
    <div className="s1">
      <div className="tag">
        <AcmeLogo />
        <Text
          b
          color="inherit"
          className="navbar-text"
          css={{ mr: "$11" }}
          hideIn="xs"
          onClick={() => (window.location.href = "/")}
        >
          DictionaryDex.com
        </Text>
      </div>
      <h2 className="head">My Bookmarks</h2>
      {bookmarks.map((bookmark, index) => (
        <div key={index} className="card">
          <div className="card-body">
            <h3 className="cardtitle">{bookmark.word}</h3>
            <h4 className="des">Definitions:</h4>
            <ul>
              {bookmark.def &&
                bookmark.def.map((definition, index) => (
                  <li key={index}>{definition}</li>
                ))}
            </ul>
            <h4 className="des">Synonyms:</h4>
            <p>{bookmark.syns && bookmark.syns.join(", ")}</p>
            <h4 className="des">Antonyms:</h4>
            <p>
              {bookmark.ants &&
                bookmark.ants.slice(0, 10).map((antonyms, index) => (
                  <span key={index}>
                    {antonyms.join(", ")}
                    {index !== bookmark.ants.length - 1 && ", "}
                  </span>
                ))}
              {bookmark.ants && bookmark.ants.length > 10 && "..."}
            </p>
            <button
              onClick={() => removeBookmark(bookmark._id)}
              className="btn btn-danger"
            >
              Remove Bookmark
            </button>
            <Toaster />
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Bookmarks;