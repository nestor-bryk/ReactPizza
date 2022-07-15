import React, { useCallback } from "react";

import { setCategoryId, setCurrentPage, selectSortProperty, selectFilter } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaItem } from "../redux/slices/pizzaSlice";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
	const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
	const sortType = useSelector(selectSortProperty);
	const { items, status } = useSelector(selectPizzaItem);

	const dispatch = useAppDispatch();

	const onClickCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const order = sortType.includes("-") ? "asc" : "desc";
		const sortBy = sortType.replace("-", "");
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `&search=${searchValue}` : "";

		dispatch(
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage: String(currentPage),
		}));

		window.scrollTo(0, 0);
	};

	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sortType, searchValue, currentPage]);



	const skeletons = [...new Array(4)].map((_, index) => (<Skeleton key={index} />));
	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{
				status === 'error' ? (
					<div className="content__error-info">
						<h2>Произошла ошибка 😕</h2>
						<p>К сожелению, не удалось получть питсы. Попробуйте повторить попытку позже.</p>
					</div>
				) : (
					<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
				)
			}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
}

export default Home;
