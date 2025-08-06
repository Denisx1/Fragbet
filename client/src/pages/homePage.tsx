import React, { useEffect } from "react";
import { usePageMeta } from "../components/title/titleContext";

const HomePage: React.FC = () => {
  const { setMeta } = usePageMeta();

  useEffect(() => {
    setMeta(
      "Главная страница",
      "Здесь будет основной контент главной страницы."
    );
  }, [setMeta]);

  return <p>Здесь будет основной контент главной страницы.</p>;
};

export default HomePage;
