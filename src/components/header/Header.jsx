import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import logo from '../../assets/logo.png';
import Contentwrapper from "../contentwrapper/Contentwrapper";
import { Link } from "react-router-dom";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location])

    // the window.scrollY property is used to add the scrolling effect in our website.like after how much scroll the property should be implemented in the site

    const controlNavbar = () => {
      if (window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu) {
          setShow("hide")
        }else {
          setShow("show")
        }
      }else {
        setShow('top')
      }
      setLastScrollY(window.scrollY);
    }

    useEffect(() => {
      window.addEventListener("scroll",controlNavbar)
      return () => {
        window.removeEventListener("scroll" , controlNavbar);
      }
    }, [lastScrollY])

    const searchQueryHandler = (event) => {
      if (event.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`)
        setTimeout(() => {
          setShowSearch(false);
        },1000)
      }
    }

    const opensearch = () => {
      setShowSearch(true);
      setMobileMenu(false);      
    }

    const openMobileMenu = () => {
      setShowSearch(false);
      setMobileMenu(true);
    }

    const navigationHandler = (type) => {
      if (type === "movie"){
        navigate("/mystream/movie");
      }else {
        navigate("/mystream/tv");
      }
      setMobileMenu(false);
    }
 
    return (
        <header className={`header ${mobileMenu ? 'mobileView': ""} ${show}`}>
          <Contentwrapper>
            <div className="logo">
              <img src={logo} alt=""></img>
              <h1 className="text"><Link to="/mystream">My Stream</Link></h1>
            </div>
            <ul className="menuItems">
              <li className="menuItem" id="movie" onClick={() => navigationHandler("movie")}>Movies</li>
              <li className="menuItem" onClick={() => navigationHandler("tv show")}>TV Shows</li>
              <li className="menuItem">
                <HiOutlineSearch onClick={opensearch} />
              </li>
            </ul>

            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={opensearch} />
              {mobileMenu ? ( <VscChromeClose onClick={() => {setMobileMenu(false)}}/>) : (<SlMenu onClick={openMobileMenu}/> )}
            </div>
          </Contentwrapper>
          {showSearch && (
            <div className="searchBar">
            <Contentwrapper>
              <div className='searchInput'>
                <input type='text' placeholder='Search for a movie or Tv Show....' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
                <VscChromeClose onClick={() => {setShowSearch(false)}}/>
              </div>
            </Contentwrapper>
            </div>
          )}
        </header>
    );
};

export default Header