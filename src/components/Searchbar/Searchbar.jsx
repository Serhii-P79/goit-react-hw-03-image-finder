import { FcSearch } from 'react-icons/fc';

import './Searchbar.scss';

export function Searchbar({ onSubmit }) {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          {/* <span className="SearchForm-button-label"></span> */}
          <FcSearch className="SearchIcon" />
        </button>

        <input
          name="searchQuery"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
