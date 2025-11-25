import React from "react";
import "./UpdateInfo.css";
import { useNavigate } from "react-router-dom";

export default function UpdateInfo() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send updated first/last name to backend
    navigate("/user"); // go back to User Management after "saving"
  };

  return (
    <div className="ui-page">
      {/* Header – same family as Home / Categories / UserManagement */}
      <header className="ui-header">
        <div className="ui-logo">Farm2Door</div>

        <nav className="ui-nav">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/categories")}>Categories</button>
          <button onClick={() => navigate("/shop-management")}>Shops</button>
          <button onClick={() => navigate("/user")}>Account</button>
        </nav>
      </header>

      <main className="ui-main">
        <div className="ui-card">
          <div className="ui-card-header">
            <div>
              <p className="ui-eyebrow">Account</p>
              <h1 className="ui-title">Update Info</h1>
              <p className="ui-subtitle">
                You can update your first and last name here.
              </p>
            </div>
          </div>

          <form className="ui-form" onSubmit={handleSubmit}>
            <div className="ui-input-row">
              <div className="ui-input-group">
                <label>First Name</label>
                <input type="text" placeholder="Jane" />
              </div>

              <div className="ui-input-group">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" />
              </div>
            </div>

            <div className="ui-actions">
              <button
                type="button"
                className="ui-btn ui-btn-outline"
                onClick={() => navigate("/user")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ui-btn ui-btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

