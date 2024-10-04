import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./viewVendorProductPage.css";
import ViewVendorProductComponent from "../../components/viewVendorProductsComponent/viewVendorProductComponent";

export default function ViewVendorProductPage() {
  // State to manage loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []); // Only runs on mount

  return (
    <section className="getCourseBg d-flex vh-100">
      {loading ? (
        <div className="loadingScreenProduct d-flex flex-column align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-1">Loading...</p>
        </div>
      ) : (
        <div className="container text-center">
          <h1 className="viewProductHeading mb-4">@Username's Products</h1>
          <form
            action="#"
            className="viewCourseBG border rounded bg-light p-4 shadow"
          >
            <div className="mx-auto">
              <h2 className="fs-4 fw-normal text-center">
                @Username's Product Catalog on cart.io 🛒
              </h2>
            </div>
          </form>
          <br/>
          <div className="mt-3">
            <ViewVendorProductComponent />
          </div>
        </div>
      )}
    </section>
  );
}
