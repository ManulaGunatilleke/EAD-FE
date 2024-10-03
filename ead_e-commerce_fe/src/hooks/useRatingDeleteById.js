import axios from "axios";

const useDeleteRating = () => {

    const onDeleteRating = async (ratingId) => {
        try {
            if (window.confirm("Are you sure that you want to delete this Rating..?")) {
                const response = await axios.delete(`https://localhost:44366/api/Rating/DeleteRatingById/${ratingId}`);
                if (response.status === 200) {
                    return true;
                }
            }
        } catch (error) {
            alert("Error deleting rating:", error);
        }
        return false;
    };

    return { onDeleteRating };
}

export default useDeleteRating;