import { createContext } from "react";

const UserContext = createContext({user: {}, token: {}});

export default UserContext;