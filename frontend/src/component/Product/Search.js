import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
    let navigate = useNavigate();
  const [keyword, setkeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
     navigate(`/products/${keyword}`);
    } else {
     navigate("/products");
    }
  };
  return (
    <Fragment>
      <MetaData title= "Search -- CartZilla"/>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setkeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
