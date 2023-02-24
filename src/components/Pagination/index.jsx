import React from 'react';
import styles from './Pagination.scss';

const Pagination = ({ selected, setSelected }) => {
  const pages = [1, 2, 3];

  const goBack = () => {
    if (selected > 1) {
      setSelected(selected - 1);
    }
  };

  const goForward = () => {
    if (selected < pages.length) {
      setSelected(selected + 1);
    }
  };

  return (
    <ul className="pagination">
      <li onClick={() => goBack()}>back</li>
      {pages.map((item, i) => (
        <li
          key={i}
          className={`${selected === item ? 'active' : ''}`}
          onClick={() => setSelected(i + 1)}
        >
          {item}
        </li>
      ))}
      <li onClick={() => goForward()}>forward</li>
    </ul>
  );
};

export default Pagination;
