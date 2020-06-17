import axios from "axios";
import { GET_CITY, GET_PRICE } from "./types";

export const getCities = query => async dispatch => {
  try {
    let res;
    if (!query) {
      res = { data: { data: [] } };
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
      res = await axios.post(
        "https://api.novaposhta.ua/v2.0/json/",
        JSON.stringify({
          apiKey: "7b1ce150712e065cc0ae44bbfe416eab",
          calledMethod: "getWarehouses",
          modelName: "Address",
          methodProperties: {
            CityName: query
          }
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const {
      data: { data }
    } = res;

    const warehouses = data.map(({ DescriptionRu, CityRef }) => ({
      description: DescriptionRu,
      cityRef: CityRef
    }));

    dispatch({
      type: GET_CITY,
      payload: warehouses
    });
  } catch (error) {
    // setAlert(error.response.data);
  }
};

export const getPrice = (recipient, weight, cost) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    delete axios.defaults.headers.common["x-auth-token"];
    const res = await axios.post(
      "https://api.novaposhta.ua/v2.0/json/",
      JSON.stringify({
        apiKey: "7b1ce150712e065cc0ae44bbfe416eab",
        calledMethod: "getDocumentPrice",
        modelName: "InternetDocument",
        methodProperties: {
          CargoType: "Cargo",
          CitySender: "db5c88e0-391c-11dd-90d9-001a92567626",
          CityRecipient: recipient,
          Weight: weight,
          ServiceType: "WarehouseWarehouse",
          Cost: cost,
          SeatsAmount: "1"
        }
      }),
      config
    );

    const {
      data: { data }
    } = res;

    dispatch({
      type: GET_PRICE,
      payload: data[0].Cost
    });
  } catch (error) {
    // setAlert(error.response.data);
  }
};
