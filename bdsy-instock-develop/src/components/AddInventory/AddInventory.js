import "./AddInventory.scss";
import { Link } from "react-router-dom";
import ArrowBack from "../../assets/icons/arrow_back-24px.svg";
import InventoryForm from "../InventoryForm/InventoryForm";

function AddInventory() {
    return (
        <section className="add-inventory">
            <div className="add-inventory__titles">
                <Link to="/inventory" className="add-inventory__link--back"><img src={ArrowBack} alt="back arrow" /></Link>
                <h1 className="add-inventory__title">Add New Inventory Item</h1>
            </div>
            <InventoryForm />
        </section>
    )
}

export default AddInventory;