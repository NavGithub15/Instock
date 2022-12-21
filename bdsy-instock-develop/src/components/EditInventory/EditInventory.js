import "./EditInventory.scss";
import { Link } from "react-router-dom";
import ArrowBack from "../../assets/icons/arrow_back-24px.svg";
import InventoryForm from "../InventoryForm/InventoryForm";

function EditInventory() {
    return (
        <section className="edit-inventory">
            <div className="edit-inventory__titles">
                <Link to="/inventory" className="edit-inventory__link--back"><img src={ArrowBack} alt="back arrow" /></Link>
                <h1 className="edit-inventory__title">Edit Inventory Item</h1>
            </div>
            <InventoryForm />
        </section>
    )
}

export default EditInventory;