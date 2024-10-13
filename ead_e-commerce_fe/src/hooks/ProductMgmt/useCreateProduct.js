import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import firebaseConfig from "../../config/firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize storage with the Firebase app

const useCreateProduct = () => {
  const createProduct = async (
    ProductName,
    ProductCategory,
    ProductDescription,
    ProductPrice,
    ProductQuantity,
    ProductImage,
    ProductVendor,
    ProductStatus,
    ProductAvailability
  ) => {
    try {
      // Uploading image to Firebase Storage
      const imageFileName = Date.now().toString();
      const imageRef = ref(storage, `course-images/${imageFileName}`);
      await uploadBytes(imageRef, ProductImage);

      const imageUrl = await getDownloadURL(imageRef);

      //Send Product Data along with the firebase image URL
      const response = await axios.post("http://localhost:5292/api/Product", {
        ProductName,
        ProductCategory,
        ProductDescription,
        ProductPrice,
        ProductQuantity,
        ProductImage: imageUrl,
        ProductVendor,
        ProductStatus,
        ProductAvailability,
      });

      if (response.status === 200) {
        alert("Your Product was successfully listed on cart.io!");
      } else {
        alert("There was an issue creating the product, please try again...");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return { createProduct };
};

export default useCreateProduct;
