// import React from 'react';
// import styles from './Search.scss';
// import { searchContext } from '../../App';

// const Search = () => {
//   const { value, setSearchValue } = React.useContext(searchContext);
//   return (
//     <>
//       <input
//         placeholder="Поиск пиццы..."
//         className="root"
//         value={value}
//         onChange={(e) => setSearchValue(e.target.value)}
//       ></input>
//     </>
//   );
// };

// export default Search;

import React from 'react';
import styles from './Search.scss';
import { searchContext } from '../../App';
import { useRef } from 'react';
import debounce from 'lodash.debounce';

const Search = () => {
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
      console.log(str);
    }, 500),
    [],
  );

  const inputRef = useRef();
  const [value, setValue] = React.useState('');

  const { searchValue, setSearchValue } = React.useContext(searchContext);
  return (
    <>
      <input
        ref={inputRef}
        placeholder="Поиск пиццы..."
        className="root"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          updateSearchValue(value);
        }}
      />
      <button
        onClick={() => {
          setValue('');
          setSearchValue('');
          inputRef.current.focus();
        }}
      >
        Clear
      </button>
    </>
  );
};

export default Search;
