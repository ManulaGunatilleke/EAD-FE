import UpdateInventory from "../../components/updateInventoryQuantityComponent/updateInventoryQuantityComponent";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateSingleInventoryPage() {
    return (
        <section className="container-fluid py-5 bg-light">
            <h1 className="text-center font-weight-bold text-dark mb-4">Update Quantity of the product</h1>
            <form action="#" className="border rounded-lg border-secondary bg-white mx-auto p-4 shadow-lg" style={{ maxWidth: "900px" }}>
                <div className="mx-auto">
                    <p className="text-center text-dark">As an administrator, you are able to increase the quantity of products as per need for the customers at cart.io</p>
                    <div className="">
                        <UpdateInventory/>
                    </div>
                </div>
            </form>
        </section>
    );
}
