import { useState, useEffect } from "react";
import axios from "axios";

const UseViewProductById = () => {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const viewOneProductById = async (id) => {
        try {
            const response = await axios.get(`https://localhost:44366/api/Product/getProductById/${id}`);
            setProduct(response.data);
            setLoading(false);
            console.log(response.data);
            console.log(product)

        } catch(error) {
            setError(error.response.data.error);
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            setProduct(null);
            setLoading(true);
            setError(null);
        };
    }, []);

    return { product, loading, error, viewOneProductById };
};

export default UseViewProductById;

