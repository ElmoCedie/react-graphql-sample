import { createContext } from "react";
import { ContextState } from "../entities";

const appContext = createContext({} as ContextState);

export default appContext;
