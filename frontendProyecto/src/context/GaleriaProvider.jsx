import { useState, createContext, useEffect } from "react"
import useFetch from '../Hooks/useFetch.js'

export const galeriaContext = createContext();

const GaleriaProvider = ({children}) => {

  const {data, loading, error} = useFetch("/productos.json")
  const [galeriaData, setGaleriaData] = useState([])
  const [dataOriginal, setDataOriginal] = useState([])

  useEffect(() => {
    if (data) {
      setGaleriaData(data);
      setDataOriginal(data);
    }
  }, [data]);

  return (
    <galeriaContext.Provider value={{galeriaData, setGaleriaData, loading, error, dataOriginal}}>
      {children}
    </galeriaContext.Provider>
  )
}

export default GaleriaProvider