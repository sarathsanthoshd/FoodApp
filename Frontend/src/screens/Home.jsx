import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import food_items from "./data/food_items.json";
import foodCategory from "./data/food_categories.json";

// import Carousel from "../components/Carousel";
import { ToastContainer } from "react-toastify";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {/* Carousel */}
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75"
                  type="search"
                  style={{ backgroundColor: "#EEF5FF", color: "#161A1F" }}
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn text-white searchButton"
                  onClick={() => setSearch("")}
                >
                  Search
                </button>
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZvb2R8ZW58MHx8MHx8fDA%3D"
                className="d-block w-100"
                style={{ filter: "brightness(100%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1521897039857-a696adc0ee4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMG9uJTIwdGFibGV8ZW58MHx8MHx8fDA%3D"
                className="d-block w-100"
                style={{ filter: "brightness(100%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1536184071535-78906f7172c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2QlMjBvbiUyMHRhYmxlfGVufDB8fDB8fHww"
                className="d-block w-100"
                style={{ filter: "brightness(100%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1627615275925-f597ef41988c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZCUyMG9uJTIwdGFibGV8ZW58MHx8MHx8fDA%3D"
                className="d-block w-100"
                style={{ filter: "brightness(100%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1509460181860-1f17dd8cb0b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGZvb2QlMjBvbiUyMHRhYmxlfGVufDB8fDB8fHww"
                className="d-block w-100"
                style={{ filter: "brightness(100%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1518133683791-0b9de5a055f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGZvb2QlMjBvbiUyMHRhYmxlfGVufDB8fDB8fHww"
                className="d-block w-100"
                style={{ filter: "brightness(100%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Card Display for all the food category */}
      <div className="container">
        {foodCategory &&
        Array.isArray(foodCategory) &&
        foodCategory.length > 0 ? (
          foodCategory.map((data) => (
            <div key={data.id} className="row">
              <div className="fs-3 m-3" style={{ color: "#161A1F" }}>
                {data.CategoryName}
              </div>
              <hr
                id="hr-success"
                style={{
                  height: "4px",
                  backgroundImage:
                    "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                }}
              />
              {food_items &&
              Array.isArray(food_items) &&
              food_items.length > 0 ? (
                food_items
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => (
                    <div
                      key={filteredItem.id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodName={filteredItem.name}
                        item={filteredItem}
                        options={filteredItem.options[0]}
                        ImgSrc={filteredItem.img}
                      />
                    </div>
                  ))
              ) : (
                <div className="text-center mt-5 text-black">
                  <p>Loading...</p>
                  <p>
                    Please wait while we fetch the data, It takes Some Time.
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center mt-5 text-black">
            <p>Loading...</p>
            <p>Please wait while we fetch the data, It takes Some Time.</p>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>

      <ToastContainer />

      <style>
        {`
         .searchButton{
          transition:color 0.3s ease-in-out;
          background-color:#FB641B;
         }
         .searchButton:hover{
          background-color:#CC514F;
         }
        `}
      </style>
    </div>
  );
}
