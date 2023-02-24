import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Card } from '../components/Card';
import Pagination from '../components/Pagination';
import Skeleton from '../components/Card/Skeleton';

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  //const [categoryId, setCategoryId] = React.useState(0);
  //const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const sortType = useSelector((state) => state.filterSlice.sort);

  const [selectedPage, setSelectedPage] = React.useState(1);

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const dispatch = useDispatch();
  const onClickCategory = (i) => {
    dispatch(setCategoryId(i));
  };

  React.useEffect(() => {
    setIsLoading(true);
    console.log(sortType.sortProperty);
    fetch(
      `https://63c14860376b9b2e6477bf95.mockapi.io/items?limit=3&page=${selectedPage}${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=desc&filter=${searchValue}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
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
                title={item.title}
                price={item.price}
                coverImg={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
              />
            ))}
      </div>
      <Pagination selected={selectedPage} setSelected={setSelectedPage} />
    </>
  );
};

export default Home;
