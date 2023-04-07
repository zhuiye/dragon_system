import { useLocation } from 'umi';

function useQuery() {
  const location: any = useLocation();

  return location.query;
}

export { useQuery };
