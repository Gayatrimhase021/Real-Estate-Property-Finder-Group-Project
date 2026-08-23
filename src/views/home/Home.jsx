import React, { useEffect, useState } from "react";
import "./Home.css";
import homedata from "../../data/homedata.json";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  Navbar,
  HeroSlider,
  CityCard,
  PropertyCard,
  SearchFromMap,
  WhyCard,
} from "../../components/Homecard";
import { FiMessageCircle } from "react-icons/fi";


function Home() {
  const navigate = useNavigate();


  const [properties, setProperties] =
    useState([]);

  const [cities, setCities] =
    useState([]);

  const [whyChooseUs, setWhyChooseUs] =
    useState([]);

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "house", label: "House" },
  ];

  const mapProperties = homedata.properties.map(
    (property, index) => ({
      price: property.price,
      className: `marker-${index + 1}`,
    })
  );

  // useEffect - Load JSON Data
  useEffect(() => {

    setProperties(
      homedata.properties
    );

    setCities(
      homedata.cities
    );

    setWhyChooseUs(
      homedata.features
    );

  }, []);

  return (
    <main className="home">
      {/* ================= HERO ================= */}
      <HeroSlider slides={homedata.slides} />

      {/* ========= EXPLORE BY CITIES ========= */}
      <section className="explore-cities">
        <div className="cities-heading">
          <h2>Explore by Cities</h2>
          <span>
            Discover properties in some of the most popular cities.
          </span>
        </div>

        <div className="cities-grid">
          {cities.map((city, index) => (
            <CityCard
              key={city.name}
              name={city.name}
              image={city.image}
              properties={city.properties}
              description={city.description}
              price={city.price}
              large={index === 0}
            />
          ))}
        </div>
      </section>

      {/* ========= SEARCH FROM MAP =========== */}
      <SearchFromMap
        propertyTypes={propertyTypes}
        mapProperties={mapProperties}
      />

      {/* =========== FEATURED PROPERTIE ========== */}
      <section className="featured-properties">
        <h2>Featured Properties</h2>

        <p className="section-subtitle">
          Discover our handpicked selection of premium properties.
        </p>

        <div className="featured-container">
          {properties.map((property) => {
            const imageSrc = property.image?.startsWith("/")
              ? property.image
              : `/${property.image}`;

            return (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={imageSrc}
                title={property.title}
                type={property.type}
                city={property.city}
                price={property.price}
                rating={property.rating}
              />
            );
          })}
        </div>
      </section>

      {/* ========= CONTACT PROPERTY EXPERT ========== */}
      <section className="agent-section">

        <div className="agent-card">

          <div className="agent-content">

          <div className="agent-icon">
            <FiMessageCircle />
          </div>

          <p className="agent-small-title">NESTFINDER SUPPORT</p>

          <h2>Talk to your property expert today!</h2>

          <p className="agent-highlight">
            Ready to find a home that truly fits your needs?
          </p>

          <p className="agent-description">
            Our trusted property experts make your property search simple, safe and
            stress-free.
          </p>

          <p className="agent-description">
            Start your search today and get helpful guidance from our experienced
            team.
          </p>

          <div className="agent-buttons">
            <button
              className="agent-primary-btn"
              onClick={() => navigate("/about")}
            >
              Book a Free Consultation
              <span>→</span>
            </button>

            <button
              className="agent-secondary-btn"
              onClick={() => navigate("/about")}
            >
              Send Message
              <span>→</span>
            </button>
          </div>
        </div>

        <div className="agent-video">
          <video autoPlay muted loop playsInline>
            <source src="/property-expert.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      </section>

      {/* ========= WHY CHOOSE US ========== */}
      <section className="why-choose-us">
        <div className="why-header">
          <p className="why-small-title">WHY CHOOSE NESTFINDER?</p>

          <p className="why-subtitle">
            We make your property search simple, safe and stress-free.
          </p>
        </div>

        <div className="why-container">
          {whyChooseUs.map((item) => (
            <WhyCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
