import React, { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
export const PageMetaContext = createContext({
  title: null,
  description: null,
  setMeta: (_title: ReactNode, _description: ReactNode) => {},
});

export const usePageMeta = () => useContext(PageMetaContext);

export const PageMetaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<ReactNode>(null);
  const [description, setDescription] = useState<ReactNode>(null);

  const setMeta = useCallback((newTitle: ReactNode, newDescription: ReactNode) => {
    setTitle(newTitle);
    setDescription(newDescription);
  }, []);

  return (
    <PageMetaContext.Provider value={{ title, description, setMeta }}>
      {children}
    </PageMetaContext.Provider>
  );
};
