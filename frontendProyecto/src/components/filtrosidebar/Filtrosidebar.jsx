import React, { useEffect } from "react";
import styles from "./Filtrosidebar.module.css";
import { useState, useContext } from "react";
import { productosContext } from "../../context/ProductProvider";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;
// const URL = "http://localhost:3000";

const FiltroSideBar = () => {
  const { setProductosData, setDataOriginal } = useContext(productosContext);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isNewChecked, setIsNewChecked] = useState("");
  const [isUsedChecked, setIsUsedChecked] = useState("");
  const [category, setCategory] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async () => {
      const res = await axios.get(`${URL}/productos/categorias`);
      // console.log(res.data.categories);
      setCategorias(res.data.categories);
    };
    getCategorias();
  }, []);

  const handleFilter = async () => {
    const filteredProducts = await axios.get(`${URL}/productos/filtros`, {
      params: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        isNew: isNewChecked,
        isUsed: isUsedChecked,
        categoria: category,
      },
    });

    // setUrl(filteredProducts.data.url);
    // console.log(filteredProducts.request.responseURL);
    setDataOriginal(filteredProducts.data.products);
    setProductosData(filteredProducts.data.products);

    console.log(filteredProducts.data.products);
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
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.categoria}>
              {cat.categoria}
            </option>
          ))}
        </select>
      </label>
      <button className={styles.btnFilter} onClick={handleFilter}>
        Filter
      </button>
    </div>
  );
};

export default FiltroSideBar;
