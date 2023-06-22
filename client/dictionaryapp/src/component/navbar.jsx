import React, { useContext } from "react";
import { BiSearch } from 'react-icons/bi';
import SearchContext from "../searchContext";
import { useNavigate } from "react-router-dom";

function Navbar({ performSearch }) {
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));
    const { search, updateSearch } = useContext(SearchContext);

    const handleChange = (e) => {
        updateSearch(e.target.value);
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleBookmark = () => {
        navigate('/bookmark');
    };

    const handleLogin = () => {
        navigate('/signin');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleLogout = () => {
        // Perform logout logic here (clear token, etc.)
        alert("logged out successfully");
        localStorage.removeItem("token");
        
        // After logout, navigate to login page or desired page
        // navigate('/');
        window.location.reload();
    };

    return (
        <div>
            <nav>
                <h1>DictionaryDex.com</h1>
                <h2 onClick={handleHome}>Home</h2>
                {token ? (
                    <h2 className="book" onClick={handleBookmark}>My Bookmarks</h2>
                ) : (
                    <h3 onClick={handleLogin}>Log In</h3>
                )}
                {!token && <h3 className="sign" onClick={handleSignup}>Sign Up</h3>}
                {token && <h3 onClick={handleLogout}>Log Out</h3>}
            </nav>
            <div>
                <input type="text" placeholder="search" value={search} onChange={(e) => handleChange(e)} />
                <button className="search" onClick={performSearch}><BiSearch /></button>
            </div>
        </div>
    );
}

export default Navbar;
