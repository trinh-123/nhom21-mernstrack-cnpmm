import { useState } from 'react';
import PageLoading from '../PageLoading/index';

const UsePageLoading = () => {
  const [loading, setLoading] = useState(false);

  return [loading ? <PageLoading /> : null, () => setLoading(true), () => setLoading(false)];
};

export default UsePageLoading;
