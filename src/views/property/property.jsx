import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHouse,
    FaHouseChimney,
    FaBuilding,
    FaKey
} from "react-icons/fa6";
import {
    FaRegHeart,
    FaHeart
} from "react-icons/fa";
import properties from "./../../data/property-data";
import "./property.css";
function Property() {
    const navigate = useNavigate();
    const [displayedProperties, setDisplayedProperties] =
        useState([]);
    const [search, setSearch] =
        useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("home");
    const [wishlist, setWishlist] =
        useState([]);
    useEffect(() => {
        const currentUser =
            JSON.parse(
                localStorage.getItem("currentUser")
            );
        if (!currentUser) {
            setWishlist([]);
            return;
        }
        const wishlistKey =
            "wishlist_" +
            currentUser.mobile;
        const savedWishlist =
            JSON.parse(
                localStorage.getItem(
                    wishlistKey
                )
            ) || [];
        setWishlist(
            savedWishlist
        );
    }, []);
    useEffect(() => {
        const category =
            localStorage.getItem(
                "selectedCategory"
            );
        if (category) {
            setSelectedCategory(
                category
            );
            localStorage.removeItem(
                "selectedCategory"
            );
        }
    }, []);
    useEffect(() => {
        let result =
            [...properties];
        if (
            selectedCategory !== "all"
        ) {
            result =
                result.filter(
                    property =>
                        property.category ===
                        selectedCategory
                );
        }
        if (
            search.trim() !== ""
        ) {
            const keyword =
                search.toLowerCase();
            result =
                result.filter(
                    property =>
                        property.name
                            .toLowerCase()
                            .includes(
                                keyword
                            )
                        ||
                        property.description
                            ?.toLowerCase()
                            .includes(
                                keyword
                            )
                        ||
                        property.category
                            ?.toLowerCase()
                            .includes(
                                keyword
                            )
                );
        }
        setDisplayedProperties(
            result
        );
    }, [
        selectedCategory,
        search
    ]);
    const showProperties = (
        category
    ) => {
        setSelectedCategory(
            category
        );
    };
    const isWishlisted = (
        id
    ) => {
        return wishlist.some(
            item =>
                item.id === id
        );
    };
    const toggleWishlist = (
        id
    ) => {
        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );
        if (!currentUser) {
            alert(
                "Please Login First"
            );
            navigate(
                "/login"
            );
            return;
        }
        const wishlistKey =
            "wishlist_" +
            currentUser.mobile;
        let updatedWishlist =
            [...wishlist];
        const exists =
            updatedWishlist.some(
                item =>
                    item.id === id
            );
        if (exists) {
            updatedWishlist =
                updatedWishlist.filter(
                    item =>
                        item.id !== id
                );
            alert(
                "Removed From Wishlist 💔"
            );
        }
        else {
            const property =
                properties.find(
                    item =>
                        item.id === id
                );
            if (!property) {
                return;
            }
            updatedWishlist.push(
                property
            );
            alert(
                "Added To Wishlist ❤️"
            );
        }
        localStorage.setItem(
            wishlistKey,
            JSON.stringify(
                updatedWishlist
            )
        );
        setWishlist(
            updatedWishlist
        );
    };
    const viewDetails = (
        id
    ) => {
        localStorage.setItem(
            "selectedProperty",
            id
        );
        navigate(
            "/property-detail"
        );
    };
    const addToCart = (
        id
    ) => {
        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );
        if (!currentUser) {
            alert(
                "Please Login First"
            );
            navigate(
                "/login"
            );
            return;
        }
        const cartKey =
            "cart_" +
            currentUser.mobile;
        let cart =
            JSON.parse(
                localStorage.getItem(
                    cartKey
                )
            ) || [];
        const property =
            properties.find(
                item =>
                    item.id === id
            );
        if (!property) {
            return;
        }
        const alreadyExists =
            cart.some(
                item =>
                    item.id === id
            );
        if (alreadyExists) {
            alert(
                "Property Already In Cart 🛒"
            );
            navigate(
                "/cart"
            );
            return;
        }
        cart.push(
            property
        );
        localStorage.setItem(
            cartKey,
            JSON.stringify(
                cart
            )
        );
        alert(
            property.name +
            " Added To Cart 🛒"
        );
        navigate(
            "/cart"
        );
    };
    return (
        <div className="property-page">
            {/* =================================================
                HEADER
            ================================================= */}
            <div className="property-header">
                <div>
                    <h1>
                        Find Your Perfect Property
                    </h1>
                    <p>
                        Explore homes, villas,
                        apartments and rental properties.
                    </p>
                </div>
                <button
                    className="wishlist-page-btn"
                    onClick={() =>
                        navigate(
                            "/wishlist"
                        )
                    }
                >
                    <FaHeart />
                    <span>
                        Wishlist
                    </span>
                </button>
            </div>
            {/* =================================================
                SEARCH
            ================================================= */}
            <div className="property-search">
                <input
                    type="text"
                    placeholder="Search property..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />
            </div>
            {/* =================================================
                CATEGORY BUTTONS
            ================================================= */}
            <div className="category-buttons">
                <button
                    className={
                        selectedCategory === "home"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        showProperties("home")
                    }
                >
                    <FaHouse />
                    <span>
                        Home
                    </span>
                </button>
                <button
                    className={
                        selectedCategory === "villa"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        showProperties("villa")
                    }
                >
                    <FaHouseChimney />
                    <span>
                        Villa
                    </span>
                </button>
                <button
                    className={
                        selectedCategory === "apartment"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        showProperties("apartment")
                    }
                >
                    <FaBuilding />
                    <span>
                        Apartment
                    </span>
                </button>
                <button
                    className={
                        selectedCategory === "rent"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        showProperties("rent")
                    }
                >
                    <FaKey />
                    <span>
                        Rent
                    </span>
                </button>
            </div>
            {/* =================================================
                PROPERTY GRID
            ================================================= */}
            <div className="property-grid">
                {}
                {displayedProperties.length === 0 && (
                    <div className="no-properties">
                        <h2>
                            No Properties Found
                        </h2>
                        <p>
                            Try another search or category.
                        </p>
                    </div>
                )}
                {}
                {displayedProperties.map(
                    property => {
                        let discount = 0;
                        if (
                            property.originalPrice &&
                            property.price
                        ) {
                            discount =
                                Math.round(
                                    (
                                        property.originalPrice -
                                        property.price
                                    )
                                    /
                                    property.originalPrice
                                    *
                                    100
                                );
                        }
                        const wishlisted =
                            isWishlisted(
                                property.id
                            );
                        return (
                            <div
                                className="property-card"
                                key={
                                    property.id
                                }
                            >
                                {/* =================================
                                    IMAGE
                                ================================= */}
                                <div className="property-image-container">
                                    <img
                                        src={
                                            property.images?.[0]
                                        }
                                        alt={
                                            property.name
                                        }
                                        className="property-image"
                                    />
                                    {}
                                    <span className="property-category">
                                        {
                                            property.category
                                        }
                                    </span>
                                    {}
                                    <button
                                        className={
                                            wishlisted
                                                ? "wishlist-btn wishlisted"
                                                : "wishlist-btn"
                                        }
                                        onClick={() =>
                                            toggleWishlist(
                                                property.id
                                            )
                                        }
                                        aria-label={
                                            wishlisted
                                                ? "Remove from wishlist"
                                                : "Add to wishlist"
                                        }
                                    >
                                        {wishlisted ? (
                                            <FaHeart className="wishlist-heart filled" />
                                        ) : (
                                            <FaRegHeart className="wishlist-heart" />
                                        )}
                                    </button>
                                </div>
                                {/* =================================
                                    CARD CONTENT
                                ================================= */}
                                <div className="property-card-content">
                                    <h2>
                                        {
                                            property.name
                                        }
                                    </h2>
                                    <p className="property-description">
                                        {
                                            property.description
                                        }
                                    </p>
                                    {/* =================================
                                        PRICE
                                    ================================= */}
                                    <div className="price-box">
                                        {property.originalPrice && (
                                            <del>
                                                ₹
                                                {
                                                    property.originalPrice
                                                        .toLocaleString()
                                                }
                                            </del>
                                        )}
                                        <span className="new-price">
                                            ₹
                                            {
                                                property.price
                                                    .toLocaleString()
                                            }
                                        </span>
                                        {discount > 0 && (
                                            <span className="discount">
                                                {
                                                    discount
                                                }
                                                % OFF
                                            </span>
                                        )}
                                    </div>
                                    {/* =================================
                                        BUTTONS
                                    ================================= */}
                                    <div className="property-buttons">
                                        {}
                                        <button
                                            className="view-details-btn"
                                            onClick={() =>
                                                viewDetails(
                                                    property.id
                                                )
                                            }
                                        >
                                            View Details
                                        </button>
                                        {}
                                        <button
                                            className="cart-btn"
                                            onClick={() =>
                                                addToCart(
                                                    property.id
                                                )
                                            }
                                        >
                                            🛒 Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}
export default Property;
