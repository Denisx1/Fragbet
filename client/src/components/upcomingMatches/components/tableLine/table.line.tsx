import style from "./table.module.css";

interface TableComponentProps {
  layout: string;
}
const TableLine: React.FC<TableComponentProps> = ({ layout }) => {
  return (
    <div className={style.matchesTitle}>
      <div className={style.time}>TIME</div>
      <div className={style.match}>MATCH</div>
      {layout === "two-columns" ? (
        <div className={style.prediction}>PRED.</div>
      ) : (
        <div className={style.prediction}>PREDICTION</div>
      )}
    </div>
  );
};

export default TableLine;
