import Header from "../header/header";
import Footer from "../footer/footer";
import { Outlet } from "react-router-dom";
import style from "./layout.module.css";
import Side from "../../ui/sideBanner/sideComponent";
import { usePageMeta } from "../../title/titleContext";
import Wrapper from "../../wrapper/wrapper";
import SideBar from "../../ui/sideBar/sideBar";

const Layout: React.FC = () => {
  const { title, description } = usePageMeta();
  return (
    <div className={style.layout}>
      <Header />
      <div className={style.cBannerPartnerBranding}>
        <Side position="left">dsfsdfsdffs</Side>
        <Side position="right">right</Side>
      </div>
      <div className={style.uWrapperGlobal}>
        <div className={style.cBannerCustomTop}>afdfsdf</div>
      </div>

      <Wrapper baseStyle="o-wrapper" modifiers={["global", "container"]}>
        <div className={style.title}>
          <h2>{title || "Default Title"}</h2>
        </div>
        <div className={style.contentContainer}>
          <div className={style.mainBox}>
            <div className={style.tableGroup}>
              <Outlet />
            </div>
            <div className={style.information}>{description}</div>
          </div>
          <SideBar />
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default Layout;
