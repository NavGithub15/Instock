import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import PageHeader from './components/PageHeader/PageHeader'
import PageFooter from './components/PageFooter/PageFooter'

// import PageNotFound from './pages/PageNotFound'
import AddWarehouse from './components/AddWarehouse/AddWarehouse';
import Inventory from "./pages/Inventory/Inventory";
import Warehouse from "./pages/Warehouse/Warehouse";
import AddInventory from './components/AddInventory/AddInventory';
import EditWarehouse from './components/EditWarehouse/EditWarehouse';
import Warehouses from './pages/Warehouses/Warehouses';
import InventoryItemDetail from './components/InventoryItemDetail/InventoryItemDetail';
import EditInventory from './components/EditInventory/EditInventory';

function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/warehouses" element={<Warehouses />} />} />
        <Route path='/warehouses' element={<Warehouses />} />
        <Route path='/warehouses/addWarehouse' element={<AddWarehouse />} />
        <Route path='/warehouses/:warehouseId' element={<Warehouse />} />
        <Route path='/warehouses/:warehouseId/editWarehouse' element={<EditWarehouse />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/inventory/addInventory' element={<AddInventory />} />
        <Route path='/inventory/:inventoryId' element={<InventoryItemDetail />} />
        <Route path='/inventory/:inventoryId/editInventory' element={<EditInventory />} />
        {/* <Route path='/*' element={<PageNotFound />} /> */}
      </Routes>
      <PageFooter />
    </BrowserRouter>
  );
}

export default App;
