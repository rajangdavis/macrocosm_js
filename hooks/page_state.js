import { createContext } from "react";
import useLocalStorage from "./use_local_storage";
const defaultConfig = "pedals";

const PageStateContext = createContext(defaultConfig);

const PageStateProvider = ({ children, initialConfig = defaultConfig }) => {
  const [pageState, setPageState] = useLocalStorage(
    "page_state",
    defaultConfig
  );

  return (
    <PageStateContext.Provider value={{ pageState, setPageState }}>
      {children}
    </PageStateContext.Provider>
  );
};

module.exports = {
  PageStateContext: PageStateContext,
  PageStateProvider: PageStateProvider,
};
