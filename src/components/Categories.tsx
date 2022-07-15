import React from "react";

type CategoriesProps = {
    value: number;
    onClickCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({value, onClickCategory}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, i) => {
                        return (
                            <li 
                                key={i}
                                onClick={() => onClickCategory(i)} 
                                className={value === i ? 'active' : ''}
                            >
                                {categoryName}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
})

export default Categories;