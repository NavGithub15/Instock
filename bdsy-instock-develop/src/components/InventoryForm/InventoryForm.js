import "./InventoryForm.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";

function AddInventoryForm() {

    const apiURL = "http://localhost:8080/inventory";

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("In Stock");
    const [quantity, setQuantity] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [warehousesDetails, setWarehousesDetails] = useState([]);
    // const [formInvalid, setFormInvalid] = useState(false);
    const [warehouseOptions, setWarehouseOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    let location;

    const id = useParams();
    const urlLocation = window.location.pathname;

    if (urlLocation.includes("addInventory") === true) {
        location = "add";
    } else {
        location = "edit";
    }

    //GETS all invetory items and creates arrays of categories and warehouses for select dropdown options
    useEffect(() => {
        function getInventoryItems() {
            axios.get(apiURL)
                .then(response => {

                    let inventoryList = response.data;
                    let categories = [];
                    let warehouses = [];
                    let warehousesDetails = [];

                    inventoryList.map((inventory) => {
                        return categories.push(inventory.category);
                    })

                    inventoryList.map((inventory) => {
                        return warehousesDetails.push({ warehouseName: inventory.warehouseName, warehouseId: inventory.warehouseID });
                    })

                    inventoryList.map((inventory) => {
                        return warehouses.push(inventory.warehouseName);
                    })

                    setWarehousesDetails(warehousesDetails);

                    categories.sort();
                    warehouses.sort();

                    let categoryOptions = [];
                    let warehouseOptions = [];

                    categories.forEach((category) => {
                        if (!categoryOptions.includes(category)) {
                            categoryOptions.push(category)
                        }
                    })
                    warehouses.forEach((warehouse) => {
                        if (!warehouseOptions.includes(warehouse)) {
                            warehouseOptions.push(warehouse);
                        }
                    })

                    setWarehouseOptions(warehouseOptions);
                    setCategoryOptions(categoryOptions);
                })
        }
        getInventoryItems();
    }, [])

    // POST request for add new inventory item
    function addInventoryItem(postBody) {
        axios
            .post(apiURL, postBody)
            .then((response) => {
                navigate("/inventory", { replace: true })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function createWarehouseOptions() {
        let warehouseOptionsCopy = [];
        for (let i = 0; i < warehouseOptions.length; i++) {
            warehouseOptionsCopy.push(<option key={uuid()} value={warehouseOptions[i]} className="inventory-form__option">{warehouseOptions[i]}</option>);
        }
        return warehouseOptionsCopy;
    }

    function createCategoryOptions() {
        let categoryOptionsCopy = [];
        for (let i = 0; i < categoryOptions.length; i++) {
            categoryOptionsCopy.push(<option key={uuid()} value={categoryOptions[i]} className="inventory-form__option">{categoryOptions[i]}</option>)
        }
        return categoryOptionsCopy;
    }

    // get request for EDIT
    useEffect(() => {
        if (location === "edit") {
            axios
                .get(apiURL + "/" + id.inventoryId)
                .then((response) => {
                    console.log(response.data)
                    setName(response.data.itemName);
                    setDescription(response.data.description);
                    setCategory(response.data.category);
                    setQuantity(response.data.quantity);
                    setWarehouse({ warehouseName: response.data.warehouseName, warehouseID: response.data.warehouseID });
                    setStatus(response.data.status);
                    console.log(response.data.status)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [location, id.inventoryId,])

    //put request for EDIT
    function editInventoryItem(postBody) {
        axios.put(apiURL + "/" + id.inventoryId, postBody)
            .then(() => {
                navigate(-1);
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
        let quantityCopy = quantity;
        let postBody = {}
        if (status === "Out of Stock") {
            quantityCopy = "0";
        }

        // setFormInvalid(false);
        if(location === 'add') {
            postBody = {
                id: uuid(),
                warehouseID: warehouse.warehouseID,
                warehouseName: warehouse.warehouseName,
                itemName: name,
                description: description,
                category: category,
                status: status,
                quantity: quantityCopy
            }
        }
        if(location === 'edit') {
            postBody = {
                id: id.inventoryId,
                warehouseID: warehouse.warehouseID,
                warehouseName: warehouse.warehouseName,
                itemName: name,
                description: description,
                category: category,
                status: status,
                quantity: quantityCopy
            }
        }

        if (location === "add") {
            addInventoryItem(postBody);
            console.log(postBody);
        } 
        if (location === "edit") {
            editInventoryItem(postBody);
            console.log(postBody)
        }
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleOutOfStock() {
        setStatus("Out of Stock")
    }

    function handleInStockClicked() {
        setStatus("In Stock");
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    function handleWarehouseChange(event) {
        setWarehouse(warehousesDetails.find((warehouse) => {
            return warehouse.warehouseName === event.target.value;
        }));
    }


    return (
        <form className="inventory-form" onSubmit={handleSubmit}>
            <div className="inventory-form__container">
                <div className="inventory-form__form-container inventory-form__form-container--details">
                    <h2 className="inventory-form__form-title">Item Details</h2>
                    <div className="inventory-form__divider">
                        <label className="inventory-form__label h3">Item Name</label>
                        <input name="name" type="text" placeholder="Item Name" className="inventory-form__input" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="inventory-form__divider">
                        <label className="inventory-form__label h3">Description</label>
                        <textarea name="description" placeholder="Please enter a brief description..." className="inventory-form__input inventory-form__textarea" value={description} onChange={handleDescriptionChange} ></textarea>
                    </div>
                    <div className="inventory-form__divider">
                        <label htmlFor="category" className="inventory-form__label h3">Category</label>
                        <select name="category" id="category" className="inventory-form__input" onChange={handleCategoryChange} value={category} placeholder="Please select">
                            <option value="" selected disabled>Please select</option>
                            {createCategoryOptions()}
                        </select>
                    </div>
                </div>
                <div className="inventory-form__form-container inventory-form__form-container--availability">
                    <h2 className="inventory-form__form-title">Item Availability</h2>
                    <div className="inventory-form__divider">
                        <span className="inventory-form__label h3">Status</span>

                        {(status === "In Stock") &&
                        <div className="inventory-form__radio-buttons">
                            <div className="inventory-form__status">
                                <input type="radio" id="in-stock" name="status" value="in-stock" className="inventory-form__status" defaultChecked="checked" onClick={handleInStockClicked} />
                                <label htmlFor="in-stock" className="inventory-form__sub-label">In Stock</label>
                            </div>
                            <div className="inventory-form__status">
                                <input type="radio" id="out-of-stock" name="status" value="out-of-stock" className="inventory-form__status" onClick={handleOutOfStock} />
                                <label htmlFor="out-of-stock" className="inventory-form__sub-label">Out of Stock</label>
                            </div>
                        </div>
                        }
                        {(status === "Out of Stock") &&
                        <div className="inventory-form__radio-buttons">
                            <div className="inventory-form__status">
                                <input type="radio" id="in-stock" name="status" value="in-stock" className="inventory-form__status" onClick={handleInStockClicked} />
                                <label htmlFor="in-stock" className="inventory-form__sub-label">In Stock</label>
                            </div>
                            <div className="inventory-form__status">
                                <input type="radio" id="out-of-stock" name="status" value="out-of-stock" className="inventory-form__status" defaultChecked="checked" onClick={handleOutOfStock} />
                                <label htmlFor="out-of-stock" className="inventory-form__sub-label">Out of Stock</label>
                            </div>
                        </div>
                        }
                        {(status === "In Stock") &&
                            <div className="inventory-form__divider">
                                <label className="inventory-form__label h3">Quantity</label>
                                <input name="quantity" type="number" placeholder="Quantity" className="inventory-form__input" value={quantity} onChange={handleQuantityChange} />
                            </div>
                        }
                        <div className="inventory-form__divider">
                            <label className="inventory-form__label h3">Warehouse</label>
                            <select name="warehouse" id="warehouse" className="inventory-form__input" onChange={handleWarehouseChange} value={warehouse.warehouseName}>
                                <option value="" selected disabled>Please select</option>
                                {createWarehouseOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/* {formInvalid && <span className="inventory-form__form-validation">*Please complete all form fields</span>} */}
            <div className="inventory-form__buttons">
                <Link to="/inventory" className="inventory-form__button inventory-form__button--cancel h3">Cancel</Link>
                {(location === "add") && <button className="inventory-form__button inventory-form__button--add h3">+Add Item</button>}
                {(location === "edit") && <button className="inventory-form__button inventory-form__button--add h3">Save</button>}
            </div>
        </form>
    )
}

export default AddInventoryForm;