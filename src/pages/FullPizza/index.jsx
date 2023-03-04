import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FullPizzaSkeleton from './FullPizzaSkeleton';

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios.get(`https://63c14860376b9b2e6477bf95.mockapi.io/items/${id}`).then((res) => {
      setPizza(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <a className="button button--outline button--add go-back-btn">
        <Link to="/">
          <span>Вернуться назад</span>
        </Link>
      </a>
      {isLoading ? (
        <FullPizzaSkeleton />
      ) : (
        <div className="pizza-info__content">
          <div>
            <img className="pizza-block__image animated" src={pizza.imageUrl} alt="Pizza" />
          </div>
          <div>
            <h2 className="content__title" style={{ marginBottom: '10px' }}>
              {pizza.title}
            </h2>
            <p>тонкое тесто, 26 см.</p>
            <br />
            <p>
              Общим ингредиентом являются помидоры. Пицца разделена на четыре части, каждая из
              которых означает одно из времён года.
            </p>

            <div className="pizza-block__bottom">
              <div className="pizza-block__price">от {pizza.price} ₽</div>
              <div className="button button--outline button--add">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullPizza;
