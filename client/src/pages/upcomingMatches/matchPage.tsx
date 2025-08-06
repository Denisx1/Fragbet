import {
  getUpcomingMatches,
  type Tier,
} from "../../api/upcomingMatchesApi.ts/upcomingMatches";
import React, { useEffect } from "react";
import styles from "./match.module.css";
import type { MatchCardProps } from "../../api/upcomingMatchesApi.ts/types";

import { usePageMeta } from "../../components/title/titleContext";
import TodayData from "../../components/upcomingMatches/todayData/todayDate";
import MatchTierBlock from "../../components/layout/mainBlock/mainBlock";
import TierComponent from "../../components/upcomingMatches/components/tierComponent/tierComponent";
import MatchCard from "../../components/upcomingMatches/components/upcomingMatches";
import TableLine from "../../components/upcomingMatches/components/tableLine/table.line";
import MatchDescription from "../../descriptions/matchDescription";

export const MatchPage: React.FC = () => {
  const { setMeta } = usePageMeta();

  const [data, setData] = React.useState<Tier | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Локальное состояние для описания
  const [description, setDescription] = React.useState<React.ReactNode>(null);
  const [descriptionLoading, setDescriptionLoading] = React.useState(true);
  // Установка начального title и description
  React.useEffect(() => {
    // При загрузке описание пустое — показываем спиннер
    setDescriptionLoading(true);
    // Через 1 секунду загружаем описание
    const timer = setTimeout(() => {
      setDescription(<MatchDescription />);
      setDescriptionLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (descriptionLoading) {
      setMeta(
        <h3>Заголовок</h3>,
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
        </div>
      );
    } else {
      setMeta(<h3>Заголовок</h3>, description);
    }
  }, [descriptionLoading, description, setMeta]);

  useEffect(() => {
    setMeta(<h3>Match page</h3>, description);
  }, [description, setMeta]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getUpcomingMatches();
        setData(response);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);
  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!data) return <div>Нет данных</div>;

  const matches: MatchCardProps[] = [
    ...(data?.highTier?.matches ?? []),
    ...(data?.lowTier?.matches ?? []),
  ];

  const highTierCodes: { codeValue: string }[] = [
    ...(data?.highTier?.codes ?? []),
  ];
  const lowTierCodes: { codeValue: string }[] = [
    ...(data?.lowTier?.codes ?? []),
  ];

  return (
    <div className={styles.matchContainer}>
      <div className={styles.tierContainer}>
        <TodayData />

        {/* 🔸 Высокие тиры — по одному блоку */}
        {highTierCodes.map((tier) => {
          const matchesForTier = matches.filter(
            (match) => match.tier === tier.codeValue
          );
          if (matchesForTier.length === 0) return null;

          return (
            <React.Fragment key={tier.codeValue}>
              <MatchTierBlock
                tier={tier.codeValue}
                matches={matchesForTier}
                page="match"
                layout="single-column"
              />
            </React.Fragment>
          );
        })}

        {/* 🔹 Низкие тиры — два блока с делением */}
        {lowTierCodes.map((tier) => {
          const tierMatches = matches.filter(
            (match) => match.tier === tier.codeValue
          );
          if (tierMatches.length === 0) return null;

          const mid = Math.ceil(tierMatches.length / 2);
          const left = tierMatches.slice(0, mid);
          const right = tierMatches.slice(mid);

          return (
            <React.Fragment key={tier.codeValue}>
              <TierComponent codeValues={tier.codeValue} />
              <div className={styles.doubleLine}>
                <div className={styles.leftBlock}>
                  <TableLine layout="two-columns" />
                  {left.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      layout="two-columns"
                    />
                  ))}
                </div>
                <div className={styles.rightBlock}>
                  <TableLine layout="two-columns" />
                  {right.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      layout="two-columns"
                    />
                  ))}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
