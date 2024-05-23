import { useState, createContext, useEffect } from "react"
import useFetch from '../Hooks/useFetch.js'

export const galeriaContext = createContext();

const GaleriaProvider = ({children}) => {

  const {data, loading, error} = useFetch("/productos.json")
  const [galeriaData, setGaleriaData] = useState([])

  useEffect(() => {
    if (data) {
      setGaleriaData(data);
    }
  }, [data]);

  return (
    <galeriaContext.Provider value={{galeriaData, setGaleriaData, loading, error}}>
      {children}
    </galeriaContext.Provider>
  )
}

export default GaleriaProvider