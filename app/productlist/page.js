"use client";

import React, { useEffect, useState } from "react";
import "../styles/ProductList.css";
import ProtectedRoute from "../utils/ProtectedRoute";
import axios from "axios";
import FilterSection from "@/components/FilterSection";
import Navbar from "@/components/Navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    price: null,
    colors: [],
    sizes: [],
    sort: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://coding-assignment-server.vercel.app/products",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Set initial filtered data
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let updatedProducts = [...products];

    // Apply price filter
    if (filters.price) {
      updatedProducts = updatedProducts.filter(
        (product) => product.price <= filters.price
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.colors.some((color) => product.color.includes(color))
      );
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.sizes.some((size) => product.sizes.includes(size))
      );
    }

    // Apply sorting
    if (filters.sort) {
      if (filters.sort === "Price Low - High") {
        updatedProducts.sort((a, b) => a.price - b.price);
      } else if (filters.sort === "Price High - Low") {
        updatedProducts.sort((a, b) => b.price - a.price);
      }
    }

    setFilteredProducts(updatedProducts);
  };

  if (loading)
    return <div className="flex items-center justify-center h-screen">Loading products...</div>;
  if (error) return <div className="text-xl font-bold animate-pulse">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="py-8 border-b border-slate-200 space-y-4">
        <h1 className="text-5xl font-semibold">Collection</h1>
        <p className="text-slate-700 max-w-3xl">
          Explore the latest, trendiest, and coolest collections—shop now and stay ahead
          of the style game! Discover must-have styles that redefine fashion and make a
          statement wherever you go. Don't miss out—shop the coolest collections today!
          🚀🔥
        </p>
      </div>
      <div className="grid grid-cols-8 py-8 gap-10">
        <FilterSection setFilters={setFilters} />
        <div className="col-span-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product, index) => (
              <div key={index}
              // className="border p-4 rounded-lg shadow-md"
              >
                <img src={product.image_url} alt={product.name} className="rounded-md aspect-[4/5] object-cover object-top" />
                <div className="space-y-1">
                  <div>
                    <p className="mt-4 font-medium truncate">{product.name}</p>
                  </div>
                </div>
                {/* <h2 className="font-bold">{product.name}</h2> */}
                <p>Price: ₹{product.price}</p>
                <p>Colors: {product.color.join(", ")}</p>
                <p>Sizes: {product.sizes.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

const page = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <ProductList />
    </ProtectedRoute>
  );
};

export default page;






















