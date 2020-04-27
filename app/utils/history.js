import { createHashHistory } from 'history';
import reactGA from 'react-ga';

const history = createHashHistory();
history.listen(location => {
  const page = location.pathname + location.search;
  reactGA.set({ page });
  reactGA.pageview(page);
});

export default history;
