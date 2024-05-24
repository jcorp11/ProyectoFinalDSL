import React from "react";
import styles from "./Filtrosidebar.module.css";
import { useState, useContext } from "react";
import { productosContext } from "../../context/ProductProvider";
import axios from "axios";

const FiltroSideBar = () => {
  const { productosData, setProductosData, dataOriginal, setDataOriginal } =
    useContext(productosContext);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isNewChecked, setIsNewChecked] = useState(false);
  const [isUsedChecked, setIsUsedChecked] = useState(false);
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    // const filteredProducts = await axios.get(url, {
    //   params: {
    //     minPrice: min,
    //     maxPrice: max,
    //     isNew: isNewChecked,
    //     isUsed: isUsedChecked,
    //     category: category,
    //   },
    // });

    const filteredProducts = dataOriginal.filter((item) => {
      const price = parseFloat(item.precio);
      const priceCondition =
        (!isNaN(min) ? price >= min : true) &&
        (!isNaN(max) ? price <= max : true);
      const newCondition = isNewChecked ? item.estado : true;
      const usedCondition = isUsedChecked ? !item.estado : true;
      const categoryCondition = category ? item.categoria === category : true;
      return (
        priceCondition && newCondition && usedCondition && categoryCondition
      );
    });

    // setDataOriginal(filteredProducts);
    setProductosData(filteredProducts);
  };

  return (
    <div className={styles.sidebar}>
      <label className={styles.label}>
        Min Price:
        <input
          className={styles.inputNumber}
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Max Price:
        <input
          className={styles.inputNumber}
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </label>
      <label className={styles.labelcheckbox}>
        <input
          type="checkbox"
          checked={isNewChecked}
          onChange={(e) => setIsNewChecked(e.target.checked)}
        />
        New
      </label>
      <label className={styles.labelcheckbox}>
        <input
          type="checkbox"
          checked={isUsedChecked}
          onChange={(e) => setIsUsedChecked(e.target.checked)}
        />
        Used
      </label>
      <label className={styles.label}>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Guitarra">Guitarra</option>
          <option value="Teclados">Teclados</option>
          <option value="Percusion">Percusión</option>
          <option value="Cuerda">Cuerda</option>
        </select>
      </label>
      <button className={styles.btnFilter} onClick={handleFilter}>
        Filter
      </button>
    </div>
  );
};

export default FiltroSideBar;
