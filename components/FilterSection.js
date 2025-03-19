"use client";

import React, { useState } from "react";

const colors = ["red", "green", "blue"];
const sizes = ["S", "M", "L", "XL", "XXL"];
const sortingOrder = ["Price Low - High", "Price High - Low"];

const FilterSection = ({ setFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    price: "",
    colors: [],
    sizes: [],
    sort: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setSelectedFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };

      if (type === "checkbox") {
        if (checked) {
          updatedFilters[name] = [...(prevFilters[name] || []), value];
        } else {
          updatedFilters[name] = prevFilters[name].filter((item) => item !== value);
        }
      } else {
        updatedFilters[name] = value;
      }

      return updatedFilters;
    });

    setFilters((prev) => ({ ...prev, [name]: type === "checkbox" ? [...selectedFilters[name], value] : value }));
  }

  return (
    <div className="col-span-2 space-y-6 sticky top-12 h-fit">
      <div className="border-b pb-4">
        <p className="font-medium mb-4">Price (Max)</p>
        <input
          type="number"
          name="price"
          value={selectedFilters.price}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Enter max price"
        />
      </div>

      <div className="border-b pb-4">
        <p className="font-medium mb-4">Colors</p>
        {colors.map((color) => (
          <label key={color} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="colors"
              value={color}
              checked={selectedFilters.colors.includes(color)}
              onChange={handleChange}
            />
            {color}
          </label>
        ))}
      </div>

      <div className="border-b pb-4">
        <p className="font-medium mb-4">Sizes</p>
        {sizes.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="sizes"
              value={size}
              checked={selectedFilters.sizes.includes(size)}
              onChange={handleChange}
            />
            {size}
          </label>
        ))}
      </div>

      <div className="border-b pb-4">
        <p className="font-medium mb-4">Sorting Order</p>
        {sortingOrder.map((order) => (
          <label key={order} className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value={order}
              checked={selectedFilters.sort === order}
              onChange={handleChange}
            />
            {order}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
