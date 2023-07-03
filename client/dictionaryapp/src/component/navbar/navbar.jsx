import React, { useContext, useEffect, useState } from "react";
import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import SearchContext from "../../searchContext";
import { AcmeLogo } from "./AcmeLogo";
import { Link } from "react-router-dom";
import { SearchIcon } from "./SearchIcon";
import toast , {Toaster} from 'react-hot-toast';
import "./navbar.css";

function CustomNavbar({ performSearch }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const { search, updateSearch } = useContext(SearchContext);
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  

  // useEffect(() => {
  //   const fetchEmail = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/users", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const userData = await response.json();
  //         const user = userData.find((item) => item.id === token);
  //         if (user) {
  //           setEmail(user.email);
  //         } else {
  //           console.log("User not found");
  //         }
  //       } else {
  //         console.log("Failed to fetch user data");
  //       }
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   };
  //   if (token) {
  //     fetchEmail();
  //     setLoggedIn(true);
  //   }
  // }, [token]);
  
  
  const fetchEmail = async() => {
    try{

      const res = await fetch('/nav',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setEmail(data.email);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err); 
    }
  };

  
  useEffect(() => {
    if(token){
      fetchEmail();
      setLoggedIn(true);
    }
  }, [token]);
  

console.log(token);

  const handleChange = (e) => {
    updateSearch(e.target.value);
  };

  const handleLogout = () => {
    // Perform logout logic here (clear token, and cookie etc.)
    toast.success("Logged out successfully");
    fetch('/logout',{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).
    then((res) => {
    localStorage.removeItem("token");
    setLoggedIn(false);

    // After logout, navigate to login page or desired page
    // navigate('/');
    setTimeout(() => {
      window.location.reload();
    },1000);
    if(res.status != 200){
      const error = new Error(res.error);
      throw error;
    }
    });
  };

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand css={{ mr: "$4" }}>
        <AcmeLogo />
        <Text
          b
          color="inherit"
          className="navbar-text"
          css={{ mr: "$11", }}
          hideIn="xs"
          onClick={() => (window.location.href = "/")}
        >
          DictionaryDex.com
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        css={{
          "@xsMax": {
            w: "100%",
            jc: "space-between",
          },
        }}
      >
        <Navbar.Item
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}
        >
          <Input
            clearable
            contentLeft={
              <SearchIcon
                fill="var(--nextui-colors-accents6)"
                size={16}
                onClick={performSearch} // Invoke performSearch on click
              />
            }
            contentLeftStyling={false}
            css={{
              w: "100%",
              "@xsMax": {
                mw: "300px",
              },
              "& .nextui-input-content--left": {
                h: "100%",
                ml: "$4",
                dflex: "center",
              },
            }}
            placeholder="Search..."
            value={search}
            onChange={(e) => handleChange(e)}
          />
        </Navbar.Item>
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="primary"
                size="md"
                src="https://png.pngitem.com/pimgs/s/24-248226_computer-icons-user-profile-clip-art-login-user.png"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item
              key="profile"
              css={{ height: "$18", display: "flex", alignItems: "center" }}
            >
              <span style={{ fontWeight: "bold", marginRight: "4px" }}>Signed in as:</span>
              {loggedIn ? <div>{email}</div> : null}
            </Dropdown.Item>
            {token && (
              <Dropdown.Item key="bookmarks">
                 <Link to="/bookmark" className="link-item next-btn next-btn-primary">
                      My Bookmarks
                  </Link>
              </Dropdown.Item>
            )}
            {token && (
              <Dropdown.Item
                key="logout"
                withDivider
                color="error"
              >
                <Link to="/" onClick={handleLogout} className="link-item next-btn next-btn-error">
                      Log Out
                </Link>
              </Dropdown.Item>
            )}
            {!token && (
              <Dropdown.Item key="login">
                <Link to="/signin" className="link-item next-btn next-btn-primary">
                    Log In
                </Link>
              </Dropdown.Item>
            )}
            {!token && (
              <Dropdown.Item key="signup">
                <Link to="/signup" className="link-item next-btn next-btn-secondary">
                    Sign Up
                </Link>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Toaster />
      </Navbar.Content>
    </Navbar>
  );
}

export default CustomNavbar;
