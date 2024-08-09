import { Suspense } from 'react';
import Loader from '../../Loader/Loader.jsx';
import css from './SharedLayout.module.css';

export const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};
