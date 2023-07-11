import { useState } from "react";
import { LoadingPage } from "./pages";
import AppRouter from "./router";
const App = () => {
     // look at the Localstorage, and check to token, if yes use token,  go to endpoint and get request for user
    // Write incoming user information in central state
    const [loading, setLoading] = useState(false);
    return <>
        {loading ? <LoadingPage /> : <AppRouter />}
    </>;

  
};

export default App;
