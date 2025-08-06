import React, { useEffect, Suspense, lazy } from 'react';
import { useSubtitle } from './subTitlecontext'

const subtitleComponents = {
  match: () => import('../../../descriptions/matchDescription'),
} as const;

type SubtitleKey = keyof typeof subtitleComponents;

interface PageContainerProps {
  subtitleComponentName?: SubtitleKey;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ subtitleComponentName, children }) => {
  const { setSubtitle } = useSubtitle();

  useEffect(() => {
    if (!subtitleComponentName) return;

    const load = async () => {
      const Component = lazy(subtitleComponents[subtitleComponentName]);
      setSubtitle(
        <Suspense fallback={<div>Загрузка описания...</div>}>
          <Component />
        </Suspense>
      );
    };

    load();

    return () => setSubtitle(null); // очищаем при выходе со страницы
  }, [subtitleComponentName]);

  return <div>{children}</div>;
};
export default PageContainer;