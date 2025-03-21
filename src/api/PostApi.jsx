import axios from "axios";

const api = axios.create({
    baseURL: "https://v6.exchangerate-api.com/v6/7f965639fe7f4acb727c72b6"
})

export const currencyConverter = (fromCurrency,toCurrency,amount)=>{
    return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`)
}
  