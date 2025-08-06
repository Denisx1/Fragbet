import style from "./side.module.css";

type SideProps = {
  position: "left" | "right";
  children: React.ReactNode;
};
const Side: React.FC<SideProps> = ({ position, children }) => {
  return (
    <div
      className={`${style.side} ${
        position === "left" ? style.left : style.right
      }`}
    >
      <div>{children}</div>
    </div>
  );
};
export default Side;
