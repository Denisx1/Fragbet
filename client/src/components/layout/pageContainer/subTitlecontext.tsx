import React, { createContext, useContext, useState } from 'react';

const SubtitleContext = createContext<{
  setSubtitle: (subtitle: React.ReactNode) => void;
}>({ setSubtitle: () => {} });

export const useSubtitle = () => useContext(SubtitleContext);

export const SubtitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subtitle, setSubtitle] = useState<React.ReactNode>(null);

  return (
    <SubtitleContext.Provider value={{ setSubtitle }}>
      {children}
      {/* Это место, где будет рендериться описание */}
      <div id="subtitle-wrapper">{subtitle}</div>
    </SubtitleContext.Provider>
  );
};