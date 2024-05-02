const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
        <h2 className="search-heading">Search</h2>
        <input
            type="text"
            placeholder="Search for a task"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
};

export default Search;
