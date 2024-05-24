import { useEffect, useState } from "react";
import axios from "axios";

const useFetchPost = (url, data) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchDataPost = async () => {
      setLoading(true);
      try {
        await axios.post(url, data);

      } catch (error) {
        setError(error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchDataPost();


  }, [url, data])

  return {
    loading, error
  }

}

export default useFetchPost