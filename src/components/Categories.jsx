import React from 'react';

export const Categories = ({ value, onClickCategory }) => {
  //const [activeCategory, setActiveCategory] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={`${i === value ? 'active' : ''}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
