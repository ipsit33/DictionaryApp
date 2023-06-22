import React, { useState, useEffect } from 'react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8080/bookmarks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => setBookmarks(data))
        .catch(error => console.error(error));
    }
  }, [token]);

  const removeBookmark = bookmarkId => {
    fetch(`http://localhost:8080/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(() => {
        const updatedBookmarks = bookmarks.filter(
          bookmark => bookmark.id !== bookmarkId
        );
        setBookmarks(updatedBookmarks);
        console.log('Bookmark removed successfully!');
      })
      .catch(error => console.error(error));
  };

  const filteredBookmarks = bookmarks.filter(
    bookmark => bookmark.userId === token // or bookmark.token === token
  );

  return (
    <div>
      <h2>My Bookmarks</h2>
      {filteredBookmarks.map(bookmark => (
        <div key={bookmark.id}>
          <h3>{bookmark.word}</h3>
          <h4>Definitions:</h4>
          <ul>
            {bookmark.def &&
              bookmark.def.map((definition, index) => (
                <li key={index}>{definition}</li>
              ))}
          </ul>
          <h4>Synonyms:</h4>
          <p>{bookmark.syns && bookmark.syns.join(', ')}</p>
          <h4>Antonyms:</h4>
          <p>
            {bookmark.ants &&
              bookmark.ants.slice(0, 10).map((antonyms, index) => (
                <span key={index}>
                  {antonyms.join(', ')}
                  {index !== bookmark.ants.length - 1 && ', '}
                </span>
              ))}
            {bookmark.ants && bookmark.ants.length <= 10 && '...'}
          </p>
          <button onClick={() => removeBookmark(bookmark.id)}>
            Remove Bookmark
          </button>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
