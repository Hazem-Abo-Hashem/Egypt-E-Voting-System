import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search For Electoral Districts"
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;