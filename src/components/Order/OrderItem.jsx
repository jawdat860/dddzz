
const OrderItem = (props) => {
  const price = `${props.price.toFixed(2)} ₽`;

  return (
    <li className="flex justify-between items-center p-4 mb-2 bg-[white] rounded-lg shadow-md ">
      <div className="flex flex-col flex-[1]">
        <h2 className="text-lg font-semibold text-black">{props.name}</h2>
        <div className="mt-1 text-gray-400">
          <span className="text-md mr-[10px]">{price}</span>
          <span className="text-md">x {props.amount }</span>
        </div>
      </div>
    
    </li>
  );
};

export default OrderItem;

