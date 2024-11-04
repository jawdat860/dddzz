
const BuyItem = (props) => {
  const price = `${props.price.toFixed(2)} ₽`;

  return (
    <li className="flex justify-between items-center p-4  bg-[white] rounded-lg shadow-md">
      <div className="flex flex-col pr-[10px]">
        <h2 className="text-lg font-semibold leading-[15px] text-black">{props.name}</h2>
        <div className=" mt-1 text-gray-400">
          <span className="text-md mr-[10px]">{price}</span>
          <span className="text-md">x {props.amount}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-red-600 text-white rounded-md px-3 py-1 transition duration-300 ease-in-out hover:bg-red-700"
          onClick={props.onRemove}
        >
          −
        </button>
        <button
          className="bg-green-600 text-white rounded-md px-3 py-1 transition duration-300 ease-in-out hover:bg-green-700"
          onClick={props.onAdd}
        >
          +
        </button>
      </div>
    </li>
  );
};

export default BuyItem;
