import type { MatchCardProps } from "../../../api/upcomingMatchesApi.ts/types";
import TableLine from "../../upcomingMatches/components/tableLine/table.line";
import TierComponent from "../../upcomingMatches/components/tierComponent/tierComponent";
import MatchCard from "../../upcomingMatches/components/upcomingMatches";
import style from "./block.module.css";

interface MatchTierBlockProps {
  tier: string;
  matches: MatchCardProps[];
  page: string;
  layout: string;
}

const MatchTierBlock: React.FC<MatchTierBlockProps> = ({
  tier,
  matches,
  page,
  layout,
}) => {
  return (
    <>
      {page === "match" && layout === "single-column" ? (
        <TierComponent codeValues={tier} />
      ) : null}
      <div className={style.tierBlock}>
        {page === "match" ? (
          <div className={style.matches}>
            <TableLine layout={layout} />
            {matches.map((match) => (
              
              <MatchCard key={match.id} match={match} layout={layout} />
              
            ))}
          </div>
        ) : // Вариант для других страниц или пусто
        null}
      </div>
    </>
  );
};

export default MatchTierBlock;
