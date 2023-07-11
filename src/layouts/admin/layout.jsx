import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    // kullanici admin degerine sahip mi degilmi kontrolunu yap (403) sayfasina yonlendir yetkisiz giris sayfasi
    return <>
        <Outlet/>
    </>;
};

export default AdminLayout;
