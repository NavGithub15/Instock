import axios from 'axios';
const apiUrl= "http://localhost:8080"

export const formatNumber = (phoneNumber) => {
  const areaCode = phoneNumber.slice(0, 3);
  const firstThreeNumbers = phoneNumber.slice(3, 6);
  const lastFourNumbers = phoneNumber.slice(6, 10);
  const formatedNumber = `+1 (${areaCode}) ${firstThreeNumbers}-${lastFourNumbers}`;
  return formatedNumber;
}

export const unformatNumber = (phoneNumber) => {
  const removedCountryCode = phoneNumber.slice(2)
  const cleanedNumber = removedCountryCode.replace(/\D/g, '');
  return cleanedNumber
}

export const getWarehouses = () => {
  return axios.get(`${apiURL}/warehouses`);
}

export const getSingleInventoryItem = (inventoryId) => {
  return axios.get(`${apiURL}/inventory/${inventoryId}`)
}

export const getSingleWarehouse = (warehouseId) => {
  return axios.get(`${apiURL}/warehouses/${warehouseId}`)
}

export const POSTwarehouse = (newWarehouse) => {
  return axios.post(`${apiURL}/warehouses`, newWarehouse)
}

export const PUTwarehouse = (warehouseId, editedWarehouse) => {
  return axios.put(`${apiURL}/warehouses/${warehouseId}`, editedWarehouse)
}

export const DELETEwarehouse = (warehouseId, deletedWarehouse) => {
  return axios.delete(`${apiURL}/warehouses/${warehouseId}`, deletedWarehouse)
}