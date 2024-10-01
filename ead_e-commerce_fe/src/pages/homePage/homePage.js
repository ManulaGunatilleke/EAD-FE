import { useContext } from "react";
import AdminMain from "../../components/adminMainComponent/adminMain";
import CSRMain from "../../components/csrMainComponent/csrMain";
import VendorMain from "../../components/vendorMainComponent/vendorMain";
import UserContext from "../../ContextComponent/ContextComponent";

export default function Home() {

    const { user } = useContext(UserContext);

    // check if the user is an csr, vendor or admin
    const isCSR = user && user.UserType === "CSR";
    const isAdmin = user && user.UserType === "Admin";

    return (
        <>
            {isCSR ? (
                <CSRMain/>
            ) : (
                <>
                    {isAdmin ? (
                        <AdminMain/>
                    ) : (
                        <>
                            <VendorMain/>
                        </>
                    )}
                </>
            )}
        </>
    )
}