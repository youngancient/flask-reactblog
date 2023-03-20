import "./style.css";

const Search = () => {
  return (
    <div className="search">
      <div className="search-cont">
        <div className="search-input">
          <label htmlFor="input">Search for blogs</label>
          <input type="text" name="input" id="" />
        </div>
        <div className="head">
          <p>Search results for: </p>
          <h3>Query</h3>
        </div>
      </div>
      <div className="results">
        resultshere
      </div>
    </div>
  );
};

export default Search;
