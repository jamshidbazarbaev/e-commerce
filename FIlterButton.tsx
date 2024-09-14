interface FilterButtonProps {
  onFilterByPrice: () => void;
  onFilterByPriceRange: () => void;
  onShowUsers: () => Promise<void>;
  showUsers: boolean;
}

  
const FilterButtons: React.FC<FilterButtonProps> = ({
  onFilterByPrice,
  onFilterByPriceRange,
  onShowUsers,
  showUsers,
}) => {
  return (
    <div className="flex space-x-4 ">
      <button onClick={onFilterByPrice} className="bg-blue-500  text-white px-4 py-2  rounded-md hover:bg-blue-600 transition duration-300">Filter by Price (10-100)</button>
      <button onClick={onFilterByPriceRange} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transitio  duration-300">
        Filter by Price Range (900-1200)
      </button>
      <button onClick={onShowUsers} className={`px-4 py-2  rounded-md  ${showUsers ? "bg-red-500 text-white hover:bg-red-600"  : "bg-blue-500 text-white hover:bg-blue-600" }`}>Show Users</button>
    </div>
  );
};

export default FilterButtons;
