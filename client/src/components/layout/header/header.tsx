import React from "react";
import "./header.module.css";
import styles from "./header.module.css";
import fragbet from "../../../assets/fragbet.png";

import Wrapper from "../../wrapper/wrapper";
import Switcher from "../../ui/tagSwitcher/switcherComponent";

const Header: React.FC = () => {
  return (
    <header className={styles["c-global-main-header"]}>
      <Wrapper baseStyle="o-wrapper" modifiers={["global"]}>
        <a className={styles.logo} href="/">
          <img src={fragbet} alt="Логотип" className={styles.logoImage} />
        </a>

        <Switcher />
        <div className={styles.search}>
          <div>account</div>
          <div>search</div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
