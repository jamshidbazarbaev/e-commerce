import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { IProduct, IUser } from "../models/models";
import ProductsList from "./ProductList";
import UserList from "./UserList";
import debounce from 'lodash/debounce';
import UserFormModal from "./UserFormModal";

function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(1000);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const offset = (page - 1) * limit;

  const debouncedFetchProducts = useCallback(
    debounce((searchTerm: string, min: number, max: number) => {
      fetchProducts(searchTerm, min, max);
    }, 300),
    []
  );

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const searchTerm = event.target.value.trim();
    setSearch(searchTerm);
    debouncedFetchProducts(searchTerm, priceMin, priceMax);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'priceMin') {
      setPriceMin(Number(value));
    } else if (name === 'priceMax') {
      setPriceMax(Number(value));
    }
    debouncedFetchProducts(search, Number(name === 'priceMin' ? value : priceMin), Number(name === 'priceMax' ? value : priceMax));
  };

  const fetchProducts = async (searchTerm: string = search, min: number = priceMin, max: number = priceMax) => {
    setLoading(true);
    try {
      const url = `https://api.escuelajs.co/api/v1/products/?title=${searchTerm}&price_min=${min}&price_max=${max}&offset=${offset}&limit=${limit}`;
      const response = await axios.get(url);
      setDisplayedProducts(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserList = async () => {
    if (!users.length) {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/users?limit=3"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    setShowUsers(!showUsers);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);


  const createNewUser = async (newUser: Omit<IUser, 'id'>) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        newUser
      );
      setUsers(prevUsers => [...prevUsers, response.data]);
      setIsModalOpen(false);
      setShowUsers(true);
    } catch (error) {
      console.error("Error creating new user:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 mb-4 border rounded-md"
        onChange={handleSearch}
        value={search}
      />

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Price Range: ${priceMin} - ${priceMax}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            name="priceMin"
            min="0"
            max="1000"
            value={priceMin}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            name="priceMax"
            min="0"
            max="1000"
            value={priceMax}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <button
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded"
        onClick={toggleUserList}
      >
        {showUsers ? 'Hide Users' : 'Show Users'}
      </button>
      <button
        className="px-4 py-2 mb-4 ml-4 bg-green-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Create New User
      </button>

      {showUsers && <UserList users={users} />}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createNewUser}
      />


      {loading ? (
        <h1 className="text-2xl font-semibold text-center">Loading... </h1>
      ) : (
        <>
          <div className="my-8">
            <h2 className="text-xl font-semibold text-center mb-4">
              Product List
            </h2>
            <ProductsList products={displayedProducts} />
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {page}</span>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;