import React from "react";
import { useState } from "react";
import { currencyConverter } from "./api/PostApi";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setconvertedAmount] = useState(null);
  const [displayFromCurrency, setDisplayFromCurrency] = useState("USD");
  const [displayToCurrency, setDisplayToCurrency] = useState("PKR");
  const [displayAmount, setDisplayAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Comprehensive list of world currencies with country codes
  const currencies = [
    { code: "AED", name: "UAE Dirham", country: "ae" },
    { code: "AFN", name: "Afghan Afghani", country: "af" },
    { code: "ALL", name: "Albanian Lek", country: "al" },
    { code: "AMD", name: "Armenian Dram", country: "am" },
    { code: "ANG", name: "Netherlands Antillean Guilder", country: "cw" },
    { code: "AOA", name: "Angolan Kwanza", country: "ao" },
    { code: "ARS", name: "Argentine Peso", country: "ar" },
    { code: "AUD", name: "Australian Dollar", country: "au" },
    { code: "AWG", name: "Aruban Florin", country: "aw" },
    { code: "AZN", name: "Azerbaijani Manat", country: "az" },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", country: "ba" },
    { code: "BBD", name: "Barbadian Dollar", country: "bb" },
    { code: "BDT", name: "Bangladeshi Taka", country: "bd" },
    { code: "BGN", name: "Bulgarian Lev", country: "bg" },
    { code: "BHD", name: "Bahraini Dinar", country: "bh" },
    { code: "BIF", name: "Burundian Franc", country: "bi" },
    { code: "BMD", name: "Bermudan Dollar", country: "bm" },
    { code: "BND", name: "Brunei Dollar", country: "bn" },
    { code: "BOB", name: "Bolivian Boliviano", country: "bo" },
    { code: "BRL", name: "Brazilian Real", country: "br" },
    { code: "BSD", name: "Bahamian Dollar", country: "bs" },
    { code: "BTN", name: "Bhutanese Ngultrum", country: "bt" },
    { code: "BWP", name: "Botswanan Pula", country: "bw" },
    { code: "BYN", name: "Belarusian Ruble", country: "by" },
    { code: "BZD", name: "Belize Dollar", country: "bz" },
    { code: "CAD", name: "Canadian Dollar", country: "ca" },
    { code: "CDF", name: "Congolese Franc", country: "cd" },
    { code: "CHF", name: "Swiss Franc", country: "ch" },
    { code: "CLP", name: "Chilean Peso", country: "cl" },
    { code: "CNY", name: "Chinese Yuan", country: "cn" },
    { code: "COP", name: "Colombian Peso", country: "co" },
    { code: "CRC", name: "Costa Rican Colón", country: "cr" },
    { code: "CUP", name: "Cuban Peso", country: "cu" },
    { code: "CVE", name: "Cape Verdean Escudo", country: "cv" },
    { code: "CZK", name: "Czech Koruna", country: "cz" },
    { code: "DJF", name: "Djiboutian Franc", country: "dj" },
    { code: "DKK", name: "Danish Krone", country: "dk" },
    { code: "DOP", name: "Dominican Peso", country: "do" },
    { code: "DZD", name: "Algerian Dinar", country: "dz" },
    { code: "EGP", name: "Egyptian Pound", country: "eg" },
    { code: "ERN", name: "Eritrean Nakfa", country: "er" },
    { code: "ETB", name: "Ethiopian Birr", country: "et" },
    { code: "EUR", name: "Euro", country: "eu" },
    { code: "FJD", name: "Fijian Dollar", country: "fj" },
    { code: "FKP", name: "Falkland Islands Pound", country: "fk" },
    { code: "FOK", name: "Faroese Króna", country: "fo" },
    { code: "GBP", name: "British Pound", country: "gb" },
    { code: "GEL", name: "Georgian Lari", country: "ge" },
    { code: "GGP", name: "Guernsey Pound", country: "gg" },
    { code: "GHS", name: "Ghanaian Cedi", country: "gh" },
    { code: "GIP", name: "Gibraltar Pound", country: "gi" },
    { code: "GMD", name: "Gambian Dalasi", country: "gm" },
    { code: "GNF", name: "Guinean Franc", country: "gn" },
    { code: "GTQ", name: "Guatemalan Quetzal", country: "gt" },
    { code: "GYD", name: "Guyanaese Dollar", country: "gy" },
    { code: "HKD", name: "Hong Kong Dollar", country: "hk" },
    { code: "HNL", name: "Honduran Lempira", country: "hn" },
    { code: "HRK", name: "Croatian Kuna", country: "hr" },
    { code: "HTG", name: "Haitian Gourde", country: "ht" },
    { code: "HUF", name: "Hungarian Forint", country: "hu" },
    { code: "IDR", name: "Indonesian Rupiah", country: "id" },
    { code: "ILS", name: "Israeli New Shekel", country: "il" },
    { code: "IMP", name: "Manx Pound", country: "im" },
    { code: "INR", name: "Indian Rupee", country: "in" },
    { code: "IQD", name: "Iraqi Dinar", country: "iq" },
    { code: "IRR", name: "Iranian Rial", country: "ir" },
    { code: "ISK", name: "Icelandic Króna", country: "is" },
    { code: "JEP", name: "Jersey Pound", country: "je" },
    { code: "JMD", name: "Jamaican Dollar", country: "jm" },
    { code: "JOD", name: "Jordanian Dinar", country: "jo" },
    { code: "JPY", name: "Japanese Yen", country: "jp" },
    { code: "KES", name: "Kenyan Shilling", country: "ke" },
    { code: "KGS", name: "Kyrgystani Som", country: "kg" },
    { code: "KHR", name: "Cambodian Riel", country: "kh" },
    { code: "KID", name: "Kiribati Dollar", country: "ki" },
    { code: "KMF", name: "Comorian Franc", country: "km" },
    { code: "KPW", name: "North Korean Won", country: "kp" },
    { code: "KRW", name: "South Korean Won", country: "kr" },
    { code: "KWD", name: "Kuwaiti Dinar", country: "kw" },
    { code: "KYD", name: "Cayman Islands Dollar", country: "ky" },
    { code: "KZT", name: "Kazakhstani Tenge", country: "kz" },
    { code: "LAK", name: "Laotian Kip", country: "la" },
    { code: "LBP", name: "Lebanese Pound", country: "lb" },
    { code: "LKR", name: "Sri Lankan Rupee", country: "lk" },
    { code: "LRD", name: "Liberian Dollar", country: "lr" },
    { code: "LSL", name: "Lesotho Loti", country: "ls" },
    { code: "LYD", name: "Libyan Dinar", country: "ly" },
    { code: "MAD", name: "Moroccan Dirham", country: "ma" },
    { code: "MDL", name: "Moldovan Leu", country: "md" },
    { code: "MGA", name: "Malagasy Ariary", country: "mg" },
    { code: "MKD", name: "Macedonian Denar", country: "mk" },
    { code: "MMK", name: "Myanmar Kyat", country: "mm" },
    { code: "MNT", name: "Mongolian Tugrik", country: "mn" },
    { code: "MOP", name: "Macanese Pataca", country: "mo" },
    { code: "MRU", name: "Mauritanian Ouguiya", country: "mr" },
    { code: "MUR", name: "Mauritian Rupee", country: "mu" },
    { code: "MVR", name: "Maldivian Rufiyaa", country: "mv" },
    { code: "MWK", name: "Malawian Kwacha", country: "mw" },
    { code: "MXN", name: "Mexican Peso", country: "mx" },
    { code: "MYR", name: "Malaysian Ringgit", country: "my" },
    { code: "MZN", name: "Mozambican Metical", country: "mz" },
    { code: "NAD", name: "Namibian Dollar", country: "na" },
    { code: "NGN", name: "Nigerian Naira", country: "ng" },
    { code: "NIO", name: "Nicaraguan Córdoba", country: "ni" },
    { code: "NOK", name: "Norwegian Krone", country: "no" },
    { code: "NPR", name: "Nepalese Rupee", country: "np" },
    { code: "NZD", name: "New Zealand Dollar", country: "nz" },
    { code: "OMR", name: "Omani Rial", country: "om" },
    { code: "PAB", name: "Panamanian Balboa", country: "pa" },
    { code: "PEN", name: "Peruvian Sol", country: "pe" },
    { code: "PGK", name: "Papua New Guinean Kina", country: "pg" },
    { code: "PHP", name: "Philippine Peso", country: "ph" },
    { code: "PKR", name: "Pakistani Rupee", country: "pk" },
    { code: "PLN", name: "Polish Złoty", country: "pl" },
    { code: "PYG", name: "Paraguayan Guaraní", country: "py" },
    { code: "QAR", name: "Qatari Rial", country: "qa" },
    { code: "RON", name: "Romanian Leu", country: "ro" },
    { code: "RSD", name: "Serbian Dinar", country: "rs" },
    { code: "RUB", name: "Russian Ruble", country: "ru" },
    { code: "RWF", name: "Rwandan Franc", country: "rw" },
    { code: "SAR", name: "Saudi Riyal", country: "sa" },
    { code: "SBD", name: "Solomon Islands Dollar", country: "sb" },
    { code: "SCR", name: "Seychellois Rupee", country: "sc" },
    { code: "SDG", name: "Sudanese Pound", country: "sd" },
    { code: "SEK", name: "Swedish Krona", country: "se" },
    { code: "SGD", name: "Singapore Dollar", country: "sg" },
    { code: "SHP", name: "Saint Helena Pound", country: "sh" },
    { code: "SLE", name: "Sierra Leonean Leone", country: "sl" },
    { code: "SOS", name: "Somali Shilling", country: "so" },
    { code: "SRD", name: "Surinamese Dollar", country: "sr" },
    { code: "SSP", name: "South Sudanese Pound", country: "ss" },
    { code: "STN", name: "São Tomé and Príncipe Dobra", country: "st" },
    { code: "SYP", name: "Syrian Pound", country: "sy" },
    { code: "SZL", name: "Swazi Lilangeni", country: "sz" },
    { code: "THB", name: "Thai Baht", country: "th" },
    { code: "TJS", name: "Tajikistani Somoni", country: "tj" },
    { code: "TMT", name: "Turkmenistani Manat", country: "tm" },
    { code: "TND", name: "Tunisian Dinar", country: "tn" },
    { code: "TOP", name: "Tongan Paʻanga", country: "to" },
    { code: "TRY", name: "Turkish Lira", country: "tr" },
    { code: "TTD", name: "Trinidad and Tobago Dollar", country: "tt" },
    { code: "TVD", name: "Tuvaluan Dollar", country: "tv" },
    { code: "TWD", name: "New Taiwan Dollar", country: "tw" },
    { code: "TZS", name: "Tanzanian Shilling", country: "tz" },
    { code: "UAH", name: "Ukrainian Hryvnia", country: "ua" },
    { code: "UGX", name: "Ugandan Shilling", country: "ug" },
    { code: "USD", name: "US Dollar", country: "us" },
    { code: "UYU", name: "Uruguayan Peso", country: "uy" },
    { code: "UZS", name: "Uzbekistani Som", country: "uz" },
    { code: "VES", name: "Venezuelan Bolívar", country: "ve" },
    { code: "VND", name: "Vietnamese Đồng", country: "vn" },
    { code: "VUV", name: "Vanuatu Vatu", country: "vu" },
    { code: "WST", name: "Samoan Tala", country: "ws" },
    { code: "XAF", name: "Central African CFA Franc", country: "cm" },
    { code: "XCD", name: "East Caribbean Dollar", country: "ag" },
    { code: "XDR", name: "Special Drawing Rights", country: "un" },
    { code: "XOF", name: "West African CFA Franc", country: "sn" },
    { code: "XPF", name: "CFP Franc", country: "pf" },
    { code: "YER", name: "Yemeni Rial", country: "ye" },
    { code: "ZAR", name: "South African Rand", country: "za" },
    { code: "ZMW", name: "Zambian Kwacha", country: "zm" },
    { code: "ZWL", name: "Zimbabwean Dollar", country: "zw" }
  ];

  const handleConvert = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await currencyConverter(fromCurrency, toCurrency, amount)
      const { conversion_result } = await res.data
      setconvertedAmount(conversion_result)
      setDisplayAmount(amount)
      // Update display currencies only after successful conversion
      setDisplayFromCurrency(fromCurrency)
      setDisplayToCurrency(toCurrency)
    } catch (error) {
      setError("Error fetching conversion rate")
      console.error(error);
    }
    setLoading(false)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Currency Converter</h1>
        
        <div className="space-y-6">
          <label htmlFor="amount" className="block">
            <span className="text-gray-700 font-medium mb-1 block">Amount</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </label>
          
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="fromCurrency" className="block">
              <span className="text-gray-700 font-medium mb-1 block">From</span>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white transition"
              >
                {currencies.map((currency) => (
                  <option key={`from-${currency.code}`} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </label>
            
            <label
              htmlFor="toCurrency"
              className="block"
            >
              <span className="text-gray-700 font-medium mb-1 block">To</span>
              <select 
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white transition"
              >
                {currencies.map((currency) => (
                  <option key={`to-${currency.code}`} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          
          <div className="flex items-center justify-center space-x-4 my-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
              <img 
                src={`https://flagcdn.com/24x18/${currencies.find(c => c.code === fromCurrency)?.country}.png`} 
                alt={fromCurrency} 
                className="h-4 w-6 rounded shadow-sm"
              />
              <span className="font-medium">{fromCurrency}</span>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
              <img 
                src={`https://flagcdn.com/24x18/${currencies.find(c => c.code === toCurrency)?.country}.png`} 
                alt={toCurrency} 
                className="h-4 w-6 rounded shadow-sm"
              />
              <span className="font-medium">{toCurrency}</span>
            </div>
          </div>
          
          <button 
            disabled={loading || amount <= 0} 
            onClick={handleConvert}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </span>
            ) : "Convert"}
          </button>
          
          {convertedAmount && (
            <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex items-center">
                  <img 
                    src={`https://flagcdn.com/24x18/${currencies.find(c => c.code === displayFromCurrency)?.country}.png`} 
                    alt={displayFromCurrency} 
                    className="h-4 w-6 mr-2 rounded shadow-sm"
                  />
                  <span>{displayAmount} {displayFromCurrency}</span>
                </div>
                <span>=</span>
                <div className="flex items-center">
                  <img 
                    src={`https://flagcdn.com/24x18/${currencies.find(c => c.code === displayToCurrency)?.country}.png`} 
                    alt={displayToCurrency} 
                    className="h-4 w-6 mr-2 rounded shadow-sm"
                  />
                  <span className="text-lg font-bold">{convertedAmount} {displayToCurrency}</span>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-center text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default App;