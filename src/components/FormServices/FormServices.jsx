import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";

function FormServices({ amount, items }) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentOption, setPaymentOption] = useState("payNow"); // New state for radio button
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate input fields
    if (!email && !phone) {
      alert("Поле E-mail или Phone не должно быть пустым");
      return;
    }

    // Show alert if "Pay Later" is selected and stop submission
    if (paymentOption === "payLater") {
      alert("Вы выбрали 'Оплатить позже'. Платеж не будет выполнен.");
      return;
    }

    // Prepare data for the Tinkoff payment initialization request
    const data = {
      TerminalKey: "1665754848495DEMO",
      Amount: amount * 100, // Tinkoff expects amount in kopecks (multiply by 100)
      OrderId: `Order-${Date.now()}`, // Unique Order ID for each transaction
      Token: "68711168852240a2f34b6a8b19d2cfbd296c7d2a6dff8b23eda6278985959346",
      Description: "Оплата товаров",
    };

    try {
      const response = await fetch("https://securepay.tinkoff.ru/v2/Init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.Success) {
        WebApp.openLink(result.PaymentURL); // Redirect to Tinkoff's payment URL
      } else {
        console.error("Error initializing payment:", result.Message);
        alert("Ошибка при инициализации платежа. Пожалуйста, попробуйте снова.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Произошла ошибка при обработке платежа.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white font-sans bg-[#eee] rounded-lg p-2">
      <div className="mb-4 ">
  <label className="text-gray-700 text-sm block mb-1">Выберите способ оплаты:</label>
  <fieldset className="flex justify-between gap-2 mt-2">
    <input
      type="radio"
      id="payNow"
      name="paymentOption"
      value="payNow"
      checked={paymentOption === "payNow"}
      onChange={(e) => setPaymentOption(e.target.value)}
      className="hidden" // Hides the radio button
    />
    <label
      htmlFor="payNow"
      className={`py-2 px-2 text-[14px]   rounded-full transition-all ease-in-out duration-200 cursor-pointer shadow-[0px_0px_50px_-15px_rgba(0,0,0,0.7)]
        ${paymentOption !== 'payNow' ? 'bg-white  border border-blue-800' : ' text-white bg-blue-700 border border-blue-800'}`}
    >
      Оплатить сейчас
    </label>

    <input
      type="radio"
      id="payLater"
      name="paymentOption"
      value="payLater"
      checked={paymentOption === "payLater"}
      onChange={(e) => setPaymentOption(e.target.value)}
      className="hidden" // Hides the radio button
    />
    <label
      htmlFor="payLater"
      className={`py-2 px-2   text-[14px]   rounded-full transition-all ease-in-out duration-200 cursor-pointer shadow-[0px_0px_50px_-15px_rgba(0,0,0,0.7)]
        ${paymentOption !== 'payLater' ? 'bg-white  border border-blue-800' : ' text-white bg-blue-700 border border-blue-800'}`}
    >
      Оплатить позже
    </label>
  </fieldset>
</div>

      <form onSubmit={handleSubmit} className="payform-tbank">
        <div className="mb-4">
          <label className="text-gray-700 text-sm block mb-1">ФИО плательщика:</label>
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            placeholder="Введите ваше ФИО"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 text-sm block mb-1">Адрес:</label>
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            placeholder="Введите ваш адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

       {paymentOption === "payNow" ? <div className="mb-4">
          <label className="text-gray-700 text-sm block mb-1">E-mail:</label>
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="email"
            placeholder="Введите ваш e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>:""}

        <div className="mb-4">
          <label className="text-gray-700 text-sm block mb-1">Контактный телефон:</label>
          <input
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="tel"
            placeholder="Введите ваш телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Radio buttons for "Pay Now" or "Pay Later" */}


        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
        >
          {paymentOption === "payNow" ? "Оплатить" :"Заказть"}
        </button>
      </form>
    </div>
  );
}

export default FormServices;
