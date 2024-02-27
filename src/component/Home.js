import React, { useEffect, useState } from "react";
import CardBox from "../element/CardBox";

const Home = () => {
  const [foodItemsData, setFoodItemsData] = useState([]);
  const [foodCategoryData, setFoodCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Biryani/Rice");
  const [searchField, setSearchField] = useState("");
 
  useEffect(() => {
    const fetchingFoodData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/foodData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setFoodItemsData(responseData[0]);
        setFoodCategoryData(responseData[1]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Display an error message on the UI
      }
    };

    fetchingFoodData();
  }, []);

  const handleChoose = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchFoodItems = (event) => {
    setSearchField(event.target.value);
  };

  const filteredItems = foodItemsData.filter((item) => {
    if (searchField) {
      return item.name.toLowerCase().includes(searchField.toLowerCase());
    } else {
      return item.CategoryName === selectedCategory;
    }
  });

  return (
    <div className="h-[auto] mt-[100px]">
      <div className="flex float-right m-7 w-[50%]">
        <input
          onChange={handleSearchFoodItems}
          className="w-[100%] bg-transparent text-white border-2 border-gray-400 rounded-lg px-4 py-2"
          type="text"
          placeholder="Search Food Items"
          name="search"
          value={searchField}
        />
        <h1 className="mx-2 text-4xl">🔎</h1>
      </div>
      <div className="flex flex-col items-center w-[100%] z-50 text-white p-8 ">
        {!searchField && (
          <span className="bg-transparent p-3 border-[1px] border-y-0 border-white">
            {foodCategoryData.map((category) => (
              <button
                key={category.id}
                onClick={() => handleChoose(category.CategoryName)}
                className={`text-white bg-transparent p-1 mx-5 font-bold tracking-wider border-b-2 ${
                  selectedCategory === category.CategoryName
                    ? "hover:border-white"
                    : "border-green-800"
                } hover:border-b-2 text-xl`}
              >
                {category.CategoryName}
              </button>
            ))}
          </span>
        )}
        <div className="mt-20 flex flex-wrap">
          {filteredItems.length > 0 ? (
            filteredItems.map((foodData) => (
              <CardBox
                id={foodData._id}
                name={foodData.name}
                image={foodData.img}
                description={foodData.description}
                dropdownItems={foodData.options}
              />
            ))
          ) : (
            <p className="text-red-300 text-lg font-semibold">Nothing to show...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
