import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get(`https://localhost:44366/api/Product/getAllProducts`);
            if(response.status === 200){
                setProducts(response.data);
            }
        } catch(error) {
            console.error("Error fetching the products : ", error);
        }
    }

    return { products };
}

export default useAllProducts;