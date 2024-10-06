import axios from 'axios';

const useDeleteProduct = () => {
    const onDeleteCourse = async (id) => {
        try {
            console.log(id);
            if(window.confirm("Are you sure that you want to delete this product?")){
                const response = await axios.delete(`https://localhost:44366/api/Product/deleteProductById/${id}`);
                if(response.status === 200){
                    return true;
                }
            }
        } catch (error) {
            alert("Error deleting product, please try again..");
        }
        return false;
    };

    return onDeleteCourse;
}

export default useDeleteProduct;