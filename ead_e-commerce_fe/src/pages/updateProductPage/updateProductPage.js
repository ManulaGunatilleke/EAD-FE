import UpdateProduct from "../../components/updateProductComponent/updateProduct";
import "bootstrap/dist/css/bootstrap.min.css";

export default function updateCoursePage() {
    return (
        <section className="container-fluid py-5 bg-light">
            <h1 className="text-center font-weight-bold text-dark mb-4">Product Updation</h1>
            <form action="#" className="border rounded-lg border-secondary bg-white mx-auto p-4 shadow-lg" style={{ maxWidth: "900px" }}>
                <div className="mx-auto">
                    <p className="text-center text-dark">As an Vendor, you can update your product's details here and make changes to advertised products for the customers who are registered at cart.io</p>
                    <div className="">
                        <UpdateProduct/>
                    </div>
                </div>
            </form>
        </section>
    );
}
