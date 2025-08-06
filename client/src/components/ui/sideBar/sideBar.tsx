import style from "./styles.module.css";
const SideBar: React.FC = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.block1}>Первый блок (прокручивается)</div>
      <div className={style.stickyWrapperScroll}>
        <div className={style.stickyWrapper}>
          <div className={style.block2}>Второй блок (липнет)</div>
          <div className={style.block3}>Третий блок (липнет)</div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
