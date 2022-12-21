import "./Warehouses.scss";
import sortIcon from "../../assets/icons/sort-24px.svg";
import WarehouseCard from "../../components/WarehouseCard/WarehouseCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const apiUrl= "http://localhost:8080"

export default function Warehouses() {

  // States for fetch
  const [warehouses, setWarehouses] = useState([]);

  // GET /warehouses
  useEffect(() => {
    axios
      .get(`${apiUrl}/warehouses`)
      .then((response) => {
        setWarehouses(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  if (warehouses.length === 0) {
    return <h2>Loading...........</h2>;
  }

  return (
    <main className="warehouses">
      <div className="warehouses__container">
        <div className="warehouses__heading-box">
          <h1 className="warehouses__heading">Warehouses</h1>
          <div className="warehouses__search-wrapper">
            <input
              className="warehouses__search"
              type="text"
              placeholder="Search..."
            />
            <Link to="/warehouses/addWarehouse" className="warehouses__button h3">
              + Add New Warehouse
            </Link>
            {/* <button className="warehouses__button">+ Add New Warehouse</button> */}
          </div>
        </div>

        <div className="warehouses__tablet-labels tablet">
          <div className="tablet__label">
            <h4 className="tablet__warehouse">warehouse</h4>
            <img className="tablet__icon" src={sortIcon} alt="sort" />
          </div>
          <div className="tablet__label">
            <h4 className="tablet__address">address</h4>
            <img className="tablet__icon" src={sortIcon} alt="sort" />
          </div>
          <div className="tablet__label">
            <h4 className="tablet__contact">contact name</h4>
            <img className="tablet__icon" src={sortIcon} alt="sort" />
          </div>
          <div className="tablet__label tablet__label--special">
            <h4 className="tablet__info">contact information</h4>
            <img className="tablet__icon" src={sortIcon} alt="sort" />
          </div>
          <div className="tablet__label">
            <h4 className="tablet__actions">actions</h4>
          </div>
        </div>

        {warehouses.map((warehouse) => {
          return <WarehouseCard key={warehouse.id} warehouse={warehouse} />;
        })}
      </div>
    </main>
  );
}
