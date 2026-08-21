import React, { useState } from "react";
import {
  Search,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  IndianRupee,
  X,
  SlidersHorizontal,
  ArrowRight
} from "lucide-react";

import property1 from "../../assets/property1.jpg";
import property2 from "../../assets/property2.jpg";
import property3 from "../../assets/property3.jpg";
import property4 from "../../assets/property4.jpg";

import "./Wishlist.css";

const Wishlist = () => {

  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern Luxury Apartment",
      location: "Kothrud, Pune",
      type: "Apartment",
      price: 4500000,
      beds: 2,
      baths: 2,
      area: "1050",
      image: property1
    },
    {
      id: 2,
      title: "Beautiful Family Villa",
      location: "Baner, Pune",
      type: "Villa",
      price: 8500000,
      beds: 3,
      baths: 3,
      area: "1850",
      image: property2
    },
    {
      id: 3,
      title: "Spacious Family House",
      location: "Wakad, Pune",
      type: "House",
      price: 6200000,
      beds: 3,
      baths: 2,
      area: "1500",
      image: property3
    },
    {
      id: 4,
      title: "Premium City Apartment",
      location: "Viman Nagar, Pune",
      type: "Apartment",
      price: 7200000,
      beds: 2,
      baths: 2,
      area: "1200",
      image: property4
    }
  ]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("default");

  const removeProperty = (id) => {
    setProperties(
      properties.filter((property) => property.id !== id)
    );
  };

  let filteredProperties = properties.filter((property) => {

    const searchMatch =
      property.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      property.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const typeMatch =
      type === "All" || property.type === type;

    return searchMatch && typeMatch;
  });

  if (sort === "low") {
    filteredProperties.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProperties.sort(
      (a, b) => b.price - a.price
    );
  }

  const clearFilters = () => {
    setSearch("");
    setType("All");
    setSort("default");
  };

  return (
    <div className="wishlist-page">

      {/* HERO */}

      <section className="wishlist-hero">

        <div className="wishlist-hero-content">

          <div className="wishlist-icon">
            <Heart size={28} fill="currentColor" />
          </div>

          <span>YOUR SAVED PROPERTIES</span>

          <h1>
            My <strong>Wishlist</strong>
          </h1>

          <p>
            Save your favorite properties and find
            your perfect home easily.
          </p>

        </div>

      </section>


      {/* WISHLIST */}

      <section className="wishlist-content">

        <div className="wishlist-heading">

          <div>
            <span className="section-label">
              MY FAVORITES
            </span>

            <h2>Saved Properties</h2>
          </div>

          <div className="property-count">
            <Heart size={18} fill="currentColor" />
            {properties.length} Properties
          </div>

        </div>


        {/* SEARCH + FILTER */}

        <div className="filter-bar">

          <div className="search-box">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search property or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                onClick={() => setSearch("")}
              >
                <X size={17} />
              </button>
            )}

          </div>


          <div className="filter-box">

            <SlidersHorizontal size={18} />

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="All">
                All Types
              </option>

              <option value="Apartment">
                Apartment
              </option>

              <option value="Villa">
                Villa
              </option>

              <option value="House">
                House
              </option>
            </select>

          </div>


          <div className="filter-box">

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
            >
              <option value="default">
                Sort By
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>
            </select>

          </div>


          {(search ||
            type !== "All" ||
            sort !== "default") && (

            <button
              className="clear-btn"
              onClick={clearFilters}
            >
              <X size={16} />
              Clear
            </button>

          )}

        </div>


        <p className="result-text">
          Showing{" "}
          <strong>
            {filteredProperties.length}
          </strong>{" "}
          saved properties
        </p>


        {/* CARDS */}

        {filteredProperties.length > 0 ? (

          <div className="wishlist-grid">

            {filteredProperties.map((property) => (

              <div
                className="wishlist-card"
                key={property.id}
              >

                <div className="wishlist-image">

                  <img
                    src={property.image}
                    alt={property.title}
                  />

                  <span className="property-type">
                    {property.type}
                  </span>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeProperty(property.id)
                    }
                  >
                    <Heart
                      size={20}
                      fill="currentColor"
                    />
                  </button>

                </div>


                <div className="wishlist-card-content">

                  <h3>
                    {property.title}
                  </h3>

                  <div className="location">

                    <MapPin size={16} />

                    <span>
                      {property.location}
                    </span>

                  </div>


                  <div className="price">

                    <IndianRupee size={18} />

                    <strong>
                      ₹{property.price.toLocaleString("en-IN")}
                    </strong>

                  </div>


                  <div className="property-details">

                    <span>
                      <BedDouble size={17} />
                      {property.beds} Beds
                    </span>

                    <span>
                      <Bath size={17} />
                      {property.baths} Baths
                    </span>

                    <span>
                      <Maximize size={17} />
                      {property.area} sq.ft
                    </span>

                  </div>


                  <button className="view-btn">
                    View Property
                    <ArrowRight size={17} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="empty-wishlist">

            <Heart size={42} />

            <h3>No Properties Found</h3>

            <p>
              Try changing your search or filter.
            </p>

            <button onClick={clearFilters}>
              Clear Filters
            </button>

          </div>

        )}

      </section>

    </div>
  );
};

export default Wishlist;