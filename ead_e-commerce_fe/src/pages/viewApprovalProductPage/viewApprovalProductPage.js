import React, { useState, useEffect } from "react";
import ProductApprovalComponent from "../../components/productApprovalComponent/productApprovalComponent";

export default function ViewApprovalProductPage() {
  // State to manage loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
          <h1 className="viewProductHeading mb-4">Product Approval</h1>
          <div className="mt-3">
            <ProductApprovalComponent/>
          </div>
        </div>
      )}
    </section>
  );
}
