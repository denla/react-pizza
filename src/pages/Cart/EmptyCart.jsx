import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div class="cart cart--empty">
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <br />
      {/* <img src="/img/empty-cart.png" alt="Empty cart" /> */}
      <Link to="/">
        <a class="button button--black">
          <span>Вернуться назад</span>
        </a>
      </Link>
    </div>
  );
};

export default EmptyCart;
