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
      <div className="root">
        <input
          ref={inputRef}
          placeholder="Поиск пиццы..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            updateSearchValue(value);
          }}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#d0d0d0"
          onClick={() => {
            setValue('');
            setSearchValue('');
            inputRef.current.focus();
          }}
        >
          <path d="M11 0.7H13V23.3H11z" transform="rotate(-45.001 12 12)"></path>
          <path d="M0.7 11H23.3V13H0.7z" transform="rotate(-45.001 12 12)"></path>
        </svg>
      </div>
    </>
  );
};

export default Search;
