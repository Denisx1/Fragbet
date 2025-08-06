import styles from "./switcher.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems: { path: string; label: string }[] = [
  { path: "/stat", label: "Stats" },
  { path: "/matches", label: "Matches" },
  { path: "/players", label: "Players" },
  { path: "/teams", label: "Teams" },
];

const Switcher: React.FC = () => {
  return (
    <ul className={styles.ulList}>
      {navItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          {label}
        </NavLink>
      ))}
    </ul>
  );
};
export default Switcher;
