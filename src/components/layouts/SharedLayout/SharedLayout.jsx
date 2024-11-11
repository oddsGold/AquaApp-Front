import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <div className={css.container}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
