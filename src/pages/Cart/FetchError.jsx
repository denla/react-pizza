import React from 'react';
import { Link } from 'react-router-dom';

const FetchError = () => {
  return (
    <div class="content__error ">
      <h2>
        Не удалось загрузить пиццу <icon>😕</icon>
      </h2>
      <br />
      <p>Попробуйте обновить страницу, либо зайти сюда позже.</p>
      <br />
      {/* <img src="/img/empty-cart.png" alt="Empty cart" /> */}
      {/* <Link to="/">
        <a class="button button--black">
          <span>Вернуться назад</span>
        </a>
      </Link> */}
    </div>
  );
};

export default FetchError;
