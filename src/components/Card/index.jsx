import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export const Card = ({ id, title, price, coverImg, sizes, types }) => {
  const dispatch = useDispatch();

  const [count, setCount] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const typeNames = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = React.useState(0);

  const cartItems = useSelector((state) => state.cartSlice.items);

  //const countTest = cartItems.find((obj) => obj.id === id);
  const filteredItems = cartItems.filter((obj) => obj.id === id);
  //filteredItems.map((obj) => console.log(obj.count));
  //state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
  const countTest = filteredItems.reduce((sum, obj) => sum + obj.count, 0);

  const onClickAdd = () => {
    setCount(count + 1);
    dispatch(addItem({ id, title, price, coverImg, type: activeType, size: sizes[activeSize] }));
    //const test = useSelector((state) => state.cartSlice.items);
    //console.log(test);
  };

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={coverImg} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              key={i}
              onClick={() => setActiveType(type)}
              className={`${types.length > 1 && type === activeType ? 'active' : ''}`}
            >
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={`${i === activeSize ? 'active' : ''}`}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add" onClick={onClickAdd}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {countTest ? <i>{countTest}</i> : ''}
        </div>
      </div>
    </div>
  );
};
