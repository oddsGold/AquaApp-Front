import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { Layout } from '../../components/layouts/Layout/Layout.jsx';
import { useDispatch } from 'react-redux';

import css from './TrackerPage.module.css';
import { useEffect } from 'react';
import { dateToday } from '../../helpers/dateRequire.js';
import { fetchDailyWater } from '../../redux/water/operations.js';

export default function TrackerPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDailyWater(dateToday()));
  }, [dispatch]);

  return (
    <Layout
      leftComponent={{
        component: <WaterMainInfo />,
        bg: 'var(--color-second-bg)',
      }}
      rightComponent={{
        component: <WaterDetailedInfo />,
        bg: 'var(--color-main-bg)',
      }}
    />
  );
}
