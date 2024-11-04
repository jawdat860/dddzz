import CartContext from "../store/CartContext";
import { useContext } from "react";
import OrderItem from "./OrderItem";
import { Link } from "react-router-dom";
import FormServices from "../FormServices/FormServices";

function Order() {
    const cartCtx = useContext(CartContext);

    // Prepare items in the format needed for Tinkoff's receipt
    const formattedItems = cartCtx.items.map((item) => ({
        Name: item.name,
        Price: (Number(item.price )* 100).toString(), // Assuming Tinkoff uses kopecks
        Quantity: Number(item.amount),
        Amount: (item.price * item.amount * 100).toString(),
        PaymentMethod: "full_prepayment",
        PaymentObject: "commodity",
        Tax: "none",
        MeasurementUnit: "pc"
    }));
    console.log(formattedItems)
    return (
        <div className="h-screen bg-[white] dark:bg-gray-900 rounded-lg shadow-lg flex flex-col justify-between">
            <div className="bg-[#eee]  dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Ваш заказ:</h1>
                <ul className="flex flex-col gap-2">
                    {cartCtx.items.map((item) => (
                        <OrderItem
                            key={item.id}
                            name={item.name}
                            amount={item.amount}
                            price={item.price}
                        />
                    ))}
                </ul>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-300 mt-4">
                    Сумма: <span className="text-blue-600">{cartCtx.totalAmount.toFixed(2)} ₽</span>
                </p>
            </div>
            <div className="mt-8 jawdat2 bg-[#eee] dark:bg-gray-800 rounded-lg shadow-md p-8 grid gap-6 flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">следующий шаг:</h2>
                
                <div>
                    {/* Pass dynamic data to the FormServices component */}
                    <FormServices
                        amount={(cartCtx.totalAmount ).toString()}
                        items={formattedItems}
                    />
                </div>
            </div>
        </div>
    );
}

export default Order;

