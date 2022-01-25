import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import './Searchbar.scss';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    const name = e.currentTarget.name;
    this.setState({ [name]: e.currentTarget.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form
          className="SearchForm"
          onSubmit={e => {
            this.props.onSubmit(e, this.state.searchQuery);
          }}
        >
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

// export function Searchbar({ onSubmit }) {
//   return (
//     <header className="Searchbar">
//       <form className="SearchForm" onSubmit={onSubmit}>
//         <button type="submit" className="SearchForm-button">
//           {/* <span className="SearchForm-button-label"></span> */}
//           <FcSearch className="SearchIcon" />
//         </button>

//         <input
//           name="searchQuery"
//           className="SearchForm-input"
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   );
// }

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
