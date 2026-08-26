import React, { useState } from "react";
import {
  Heart,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./Wishlist.css";

const Wishlist = () => {
  const [search, setSearch] = useState("");

  const [propertyType, setPropertyType] = useState("All Properties");

  const [sortOption, setSortOption] = useState("Sort By");

  const [showFilter, setShowFilter] = useState(false);

  const [showSort, setShowSort] = useState(false);


  const handleFilter = (type) => {
    setPropertyType(type);
    setShowFilter(false);
  };


  const handleSort = (option) => {
    setSortOption(option);
    setShowSort(false);
  };


  return (
    <div className="wishlist-page">

      {/* ================= HERO SECTION ================= */}

      <section className="wishlist-hero">

        <div className="wishlist-overlay">

          <div className="wishlist-hero-content">

            <div className="hero-heart">

              <Heart
                size={28}
                fill="white"
                color="white"
              />

            </div>


            <p className="hero-label">
              YOUR SAVED PROPERTIES
            </p>


            <h1>
              My <span>Wishlist</span>
            </h1>


            <p className="hero-description">
              Save your favorite properties and find your perfect home easily.
            </p>

          </div>

        </div>

      </section>


      {/* ================= SAVED PROPERTIES ================= */}

      <section className="saved-section">


        {/* HEADING */}

        <div className="saved-header">

          <div>

            <p className="saved-label">
              MY FAVORITES
            </p>

            <h2>
              Saved Properties
            </h2>

          </div>


          <div className="property-count">

            <Heart
              size={18}
              fill="#e69a3c"
              color="#e69a3c"
            />

            <span>
              0 Properties
            </span>

          </div>

        </div>


        {/* ================= SEARCH + FILTER ================= */}

        <div className="wishlist-controls">


          {/* SEARCH */}

          <div className="search-box">

            <Search size={20} />

            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          {/* PROPERTY FILTER */}

          <div className="dropdown-container">

            <button
              className="filter-box"
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
            >

              <SlidersHorizontal size={19} />

              <span>
                {propertyType}
              </span>

              <ChevronDown
                size={18}
                className={showFilter ? "rotate-icon" : ""}
              />

            </button>


            <div
              className={`dropdown-menu ${
                showFilter ? "show-dropdown" : ""
              }`}
            >

              <button
                onClick={() =>
                  handleFilter("All Properties")
                }
              >
                All Properties
              </button>

              <button
                onClick={() =>
                  handleFilter("Apartment")
                }
              >
                Apartment
              </button>

              <button
                onClick={() =>
                  handleFilter("House")
                }
              >
                House
              </button>

              <button
                onClick={() =>
                  handleFilter("Villa")
                }
              >
                Villa
              </button>

              <button
                onClick={() =>
                  handleFilter("Plot")
                }
              >
                Plot
              </button>

            </div>

          </div>


          {/* SORT */}

          <div className="dropdown-container">

            <button
              className="sort-box"
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
            >

              <span>
                {sortOption}
              </span>

              <ChevronDown
                size={18}
                className={showSort ? "rotate-icon" : ""}
              />

            </button>


            <div
              className={`dropdown-menu sort-dropdown ${
                showSort ? "show-dropdown" : ""
              }`}
            >

              <button
                onClick={() =>
                  handleSort("Newest")
                }
              >
                Newest
              </button>

              <button
                onClick={() =>
                  handleSort("Price: Low to High")
                }
              >
                Price: Low to High
              </button>

              <button
                onClick={() =>
                  handleSort("Price: High to Low")
                }
              >
                Price: High to Low
              </button>

            </div>

          </div>

        </div>


        {/* ================= EMPTY WISHLIST CARD ================= */}

        <div className="empty-wishlist-card">


          {/* RED HEART */}

          <div className="empty-heart">

            <Heart
              size={58}
              color="#e75b67"
              strokeWidth={2}
            />

          </div>


          <h3>
            Your Wishlist is Empty
          </h3>


          <p>
            Explore properties and save your favorite ones here.
          </p>


          <Link
            to="/properties"
            className="browse-btn"
          >

            Browse Properties

            <ArrowRight size={21} />

          </Link>

        </div>

      </section>

    </div>
  );
};

export default Wishlist;