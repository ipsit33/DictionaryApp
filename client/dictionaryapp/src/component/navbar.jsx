import React, { useContext } from "react";
import { BiSearch } from 'react-icons/bi';
import SearchContext from "../searchContext";

function Navbar({ performSearch}){
    const token = JSON.parse(localStorage.getItem("token"));
    const {search,updateSearch} = useContext(SearchContext);

    const handleChange = (e) => {
        updateSearch(e.target.value);
    };

    return(
        <div>
            <nav>
                <h1>DictionaryDex.com</h1>
                <h2>Home</h2>
                { token && <h2 className="book">My Bookmarks</h2> }
                <h2>Contact Us</h2>
                <h3>Log In</h3>
                <h3 className="sign">Sign Up</h3>
            </nav>
            <div>
                <input type="text" placeholder="search" value={search} onChange={(e) => handleChange(e)}/>
                <button className="search" onClick={performSearch} ><BiSearch/></button>
            </div>
        </div>
    );

}

export default Navbar;