function Search({ value, changeFilterTxt }) {
  const onSearch = (event) => {
    changeFilterTxt(event.target.value);
  };
  return (
    <div className="container mt-2 ">
      <form className="d-flex" role="search">
        <input
          id="search"
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value}
          onChange={onSearch}
        />
      </form>
    </div>
  );
}
export default Search;
