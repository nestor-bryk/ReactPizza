import React from "react";

import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue, selectFilter} from "../../redux/slices/filterSlice";

const Search: React.FC = () => {

	const { searchValue } = useSelector(selectFilter);

	const dispatch = useDispatch();
	const [ value, setValue ] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		setValue('');
		dispatch(setSearchValue(''));
		// if (inputRef.current) {
		// 	inputRef.current.focus();
		// }
		inputRef.current?.focus();
	}

	const updateSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 350),
		[],
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value);
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder="Поиск пиццы..."
			/>

			{searchValue && (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
				>
					<path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
				</svg>
			)}
		</div>
	);
}

export default Search;
