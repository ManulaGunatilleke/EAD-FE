import "../createProductPage/createProductPage.css";
import CreateProductComponent from "../../components/createProductComponent/createProductComponent";

export default function createProductPage(){
    return(
        <section className="createProductBg">
        <h1 className="createProductHeading">Course Creation</h1>
        <form action="#" className=" createProductBG">
            <div className="">
                <p className="">As an Vendor, create your unique product here and make it available for the customers who are registered at cart.io 🛒</p>
                <div className="">
                    <CreateProductComponent/>
                </div>
            </div>
        </form>
    </section>
    );
}