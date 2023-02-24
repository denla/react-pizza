import React from 'react';
import styles from './Search.scss';
import { searchContext } from '../../App';

const Search = () => {
  const { value, setSearchValue } = React.useContext(searchContext);
  return (
    <>
      <input
        placeholder="Поиск пиццы..."
        className="root"
        value={value}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
    </>
  );
};

export default Search;
