import { SEND_ORDER } from "./types";
import axios from "axios";

export const sendOrder = data => async dispatch => {
  const TOKEN_BOT = "305100262:AAGzvEM9n17qvBC4IdDuxa3LsTO93O704Lo";
  const USER_ID = "398729610";
  let itemsStr = "";

  for (const item of data.items) {
    itemsStr += `
      Наименование: ${item.title}
      Вес: ${item.weight}
      Цена: ${item.price.toFixed(2)}
      Количество: ${item.quantity}
        `;
  }

  const filteredData = `
    Имя: ${data.recipient.name}
    Телефон: ${data.recipient.phone}
    Email: ${data.recipient.email}
    Город: ${data.recipient.city}
    Отделение: ${data.recipient.warehouse}

    ${itemsStr}

    Сумма заказа: ${data.total}
    Стоимость доставки Новой Почтой: ${data.delivery}
  `;

  fetch(
    `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage?chat_id=${USER_ID}&text=${encodeURIComponent(
      filteredData
    )}&parse_mode=Markdown`
  );

  await axios.post(
    `api/order`,
    { data: filteredData },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  dispatch({
    type: SEND_ORDER,
    payload: data
  });
};
