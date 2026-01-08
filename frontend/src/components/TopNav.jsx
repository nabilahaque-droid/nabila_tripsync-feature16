import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/weather", label: "Weather" },
  { to: "/documents", label: "Documents" },
  { to: "/reports", label: "Trip Reports" },
  { to: "/flights", label: "Flight Status" },
];

const TopNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="top-nav">
      <Link to="/" className="nav-brand">
        TripSync
      </Link>

      <div className="top-nav__links">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={pathname === link.to ? "is-active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default TopNav;
