function SearchBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}) {
  return (
    <>
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="searchBar"
      />
    </>
  );
}

export default SearchBar;
