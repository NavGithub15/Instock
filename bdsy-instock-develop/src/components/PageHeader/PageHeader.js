import "./PageHeader.scss";
import Logo from "../../assets/logo/InStock-Logo_1x.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PageHeader() {

    const navigate = useNavigate();
    const urlLocation = window.location.pathname;
    const [location, setLocation] = useState(urlLocation);


    function handleWarehousesClick(event) {
        event.preventDefault();
        setLocation("/warehouses");
        navigate("/warehouses", { replace: true });
    }

    function handleInventoryClick(event) {
        event.preventDefault();
        setLocation("/inventory");
        navigate("/inventory", { replace: true });
    }

    return (
        <header className="header">
            <div className="header__container">
               <Link to='/' className="header__logo-link"><img className="header__logo" src={Logo} alt="In Stock Logo" /></Link> 
                <div className="header__links">
                    {location.includes("/warehouses") || location === "/"
                        ? <span className="header__link header__link--active" onClick={handleWarehousesClick}>Warehouses</span>
                        : <span className="header__link" onClick={handleWarehousesClick}>Warehouses</span>}
                    {location.includes("/inventory")
                        ? <span className="header__link header__link--active" onClick={handleInventoryClick}>Inventory</span>
                        : <span className="header__link" onClick={handleInventoryClick}>Inventory</span>}
                </div>
            </div>
            <div className="header__bottom"></div>
        </header>
    )
}

export default PageHeader;