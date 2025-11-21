import React from "react";
import "./Shopcreation.css";      // uses your existing CSS
import bgImage from "./onwer4.jpg";   // change file name if you use a different image

export default function ShopCreation() {
return (
<div
        className="shop-page"
style={{ backgroundImage: `url(${bgImage})` }}>
    <div className="overlay">
        <header className="logo">
            <span className="logo-text">Farm2Door</span>
            <span className="logo-underline"></span>
        </header>

        <main className="form-wrapper">
            <h1 className="form-title">Shop Creation</h1>

            <form className="shop-form">
                <label className="input-pill">
                    <span>Shop name</span>
                    <input type="text" placeholder="Shop name" />
                </label>

                <label className="input-pill">
                    <span>Shop Address</span>
                    <input type="text" placeholder="Shop Address" />
                </label>

                <label className="input-pill">
                    <span>Contact Number</span>
                    <input type="tel" placeholder="Contact Number" />
                </label>

                <label className="input-pill">
                    <span>Contact Email</span>
                    <input type="email" placeholder="Contact Email" />
                </label>

                <label className="input-pill textarea-pill">
                    <span>Shop description</span>
                    <textarea placeholder="Shop description" />
                </label>
            </form>
        </main>
    </div>
</div>
);
}
