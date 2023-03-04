import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setParams, setSelectedPage } from '../redux/slices/filterSlice';

//вшиваем адрес в поисковую строку
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { list } from '../components/Sort';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Card } from '../components/Card';
import Pagination from '../components/Pagination';
import Skeleton from '../components/Card/Skeleton';

import { fetchPizzas } from '../redux/slices/pizzaSlice';
import FetchError from './Cart/FetchError';

const Home = ({ searchValue }) => {
  //const [pizzas, setPizzas] = React.useState([]);
  const pizzas = useSelector((state) => state.pizzaSlice.items);
  const status = useSelector((state) => state.pizzaSlice.status);
  //const [isLoading, setIsLoading] = React.useState(true);

  //const [categoryId, setCategoryId] = React.useState(0);
  //const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const sortType = useSelector((state) => state.filterSlice.sort);

  //const [selectedPage, setSelectedPage] = React.useState(1);
  const selectedPage = useSelector((state) => state.filterSlice.selectedPage);

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickCategory = (i) => {
    dispatch(setCategoryId(i));
  };

  const onClickPage = (i) => {
    dispatch(setSelectedPage(i));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);

      const obj = list.find(
        (item) => item.sortProperty == params.sortProperty,
        //console.log(`test ${item.sortProperty} test 2 ${params.sortProperty}`),
      );
      console.log({ ...params, obj });
      dispatch(setParams({ ...params, obj }));
    }
  }, []);

  const getPizzas = async () => {
    console.log(sortType.sortProperty);
    try {
      console.log('fetch ');
      dispatch(fetchPizzas({ selectedPage, categoryId, sortType, searchValue }));
    } catch (error) {
      console.log('err ' + error);
    }
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, selectedPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType.sortProperty,
      categoryId,
      selectedPage,
    });
    //console.log(queryString);

    navigate(`?${queryString}`);
  }, [categoryId, sortType, searchValue, selectedPage]);
  return (
    <>
      <>
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          {/* <Sort value={sortType} setSortType={setSortType} /> */}
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status == 'error' ? (
          <FetchError />
        ) : status == 'loading' ? (
          [...new Array(4)].map((item, i) => <Skeleton key={i} />)
        ) : (
          <div className="content__items">
            {pizzas.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                coverImg={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
              />
            ))}
          </div>
        )}
        <Pagination selected={selectedPage} setSelected={onClickPage} />
      </>
    </>
  );
};

export default Home;
