import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLayout = () => {
    // merkezi state git kullanici yoksa kullaniciya izin verme forbidden yada login sayfasina yonlendir...
    const {isLoggedIn} = useSelector((state) => state.auth);
    console.log(isLoggedIn);

    if(isLoggedIn) return <Navigate to={"/login"}/>
    return <>
        <Outlet/>
    </>;
};

export default UserLayout;
