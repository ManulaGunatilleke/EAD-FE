import { createContext } from "react";

const UserContext = createContext({user: {}, token: {}, userType: {}, userId: {}});

export default UserContext;