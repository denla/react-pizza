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

import axios from 'axios';

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

  React.useEffect(() => {
    setIsLoading(true);
    console.log(sortType.sortProperty);
    axios
      .get(
        `https://63c14860376b9b2e6477bf95.mockapi.io/items?limit=3&page=${selectedPage}${
          categoryId > 0 ? `&category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty}&order=desc&filter=${searchValue}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
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
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        {/* <Sort value={sortType} setSortType={setSortType} /> */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((item, i) => <Skeleton key={i} />)
          : pizzas.map((item) => (
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
      <Pagination selected={selectedPage} setSelected={onClickPage} />
    </>
  );
};

export default Home;
