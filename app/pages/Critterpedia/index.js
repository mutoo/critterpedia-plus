import React, { useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import Insects from 'assets/icons/insects.svg';
import Fish from 'assets/icons/fish.svg';
import CompassIcon from 'assets/icons/compass.svg';
import AtlasIcon from 'assets/icons/atlas.svg';
import EyeIcon from 'assets/icons/eye.svg';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import Container from 'containers/Container';
import ModalCritterDetail from 'containers/ModalCritterDetail';
import { HemisphereContext, ModeContext } from 'utils/contexts';
import { changeHemisphere } from 'containers/App/slice';
import {
  CATEGORY_FISH,
  CATEGORY_INSECTS,
  MODE_ALL,
  MODE_COLLECTION,
  MODE_DISCOVERY,
} from 'utils/const';
import Heading from 'components/heading';
import HemispherePicker from 'components/hemisphere-picker';
import {
  name as key,
  reducer,
  setActiveTab,
  setMode,
  updateFilterMonth,
  updateFilterHour,
} from 'pages/Critterpedia/slice';
import MonthPicker from './components/month-picker';
import HourPicker from './components/hour-picker';
import Statistic from './components/statistic';
import CategoryTab from './components/category-tab';

import saga from './saga';
import selector from './selectors';
import GridView from './components/grid-view';

const CritterpediaPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    activeTab,
    mode,
    hemisphere,
    filters: { month, hour },
  } = useSelector(selector);
  const dispatch = useDispatch();
  const [view /* , setView */] = useState('Grid');
  return (
    <HemisphereContext.Provider
      value={[hemisphere, h => dispatch(changeHemisphere(h))]}
    >
      <ModeContext.Provider value={mode}>
        <Helmet>
          <title>Critterpedia Plus</title>
        </Helmet>
        <Box my="50px">
          <Container maxWidth="660px">
            <Heading>Critterpedia Plus</Heading>
            <Text
              sx={{
                fontSize: '18px',
              }}
            >
              <p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Hello everyone! I'm Ninja from HiddenLeaf island. I built this
                app to provide some more inside information than critterpedia
                does.
              </p>
              <p>
                If you are curious about these questions below, it would be a
                great time for you to find out the answer:
              </p>
              <ul>
                <li>What critters are available at the moment?</li>
                <li>What critters are available in the other hemisphere?</li>
                <li>What critters will be available in next month?</li>
              </ul>
              <p>This app provides some filters for you to play with.</p>
              <p>In addition, you can mark your critters in Collection Mode.</p>
            </Text>
            <Heading>Profile</Heading>
            <Text sx={{ fontSize: '18px' }}>
              <p>Firstly, which hemisphere are you live in?</p>
              <HemispherePicker
                hemisphere={hemisphere}
                setHemisphere={h => dispatch(changeHemisphere(h))}
                justifyContent="center"
              />
            </Text>
          </Container>
        </Box>
        <Box my="50px">
          <Container>
            <Flex mb="-20px" justifyContent="space-between">
              <Flex mr="50px">
                <CategoryTab
                  label="Insects"
                  active={activeTab === CATEGORY_INSECTS}
                  icon={<Insects width={32} height={32} />}
                  onClick={() => dispatch(setActiveTab(CATEGORY_INSECTS))}
                />
                <CategoryTab
                  label="Fish"
                  active={activeTab === CATEGORY_FISH}
                  icon={<Fish width={32} height={32} />}
                  onClick={() => dispatch(setActiveTab(CATEGORY_FISH))}
                />
              </Flex>
              <Flex>
                <CategoryTab
                  label={MODE_DISCOVERY}
                  active={mode === MODE_DISCOVERY}
                  icon={<CompassIcon width={32} height={32} />}
                  onClick={() => dispatch(setMode(MODE_DISCOVERY))}
                />
                <CategoryTab
                  label={MODE_COLLECTION}
                  active={mode === MODE_COLLECTION}
                  icon={<AtlasIcon width={32} height={32} />}
                  onClick={() => dispatch(setMode(MODE_COLLECTION))}
                />
                <CategoryTab
                  label={MODE_ALL}
                  active={mode === MODE_ALL}
                  icon={<EyeIcon width={32} height={32} />}
                  onClick={() => dispatch(setMode(MODE_ALL))}
                />
              </Flex>
            </Flex>
          </Container>
          {view === 'Grid' && <GridView mb="30px" />}
          {view === 'List' && <Box>Building</Box>}
          <Container maxWidth="660px" mb="100px">
            {mode === MODE_DISCOVERY && (
              <>
                <Heading>Discovery Mode</Heading>
                <Text
                  sx={{
                    fontSize: '18px',
                  }}
                >
                  {' '}
                  <p>
                    In this mode, you can view the the critters with
                    availability, based on your selected hemisphere, date, and
                    time.
                  </p>
                </Text>
                <Heading>Filters</Heading>
                <Text fontSize="18px">
                  <p>
                    Here are the filters for you to inspect the details on
                    different dimensions:
                  </p>
                </Text>
                <MonthPicker
                  month={month}
                  onChange={m => dispatch(updateFilterMonth(m))}
                  mb="lg"
                />
                <HourPicker
                  hour={hour}
                  onChange={h => dispatch(updateFilterHour(h))}
                />
              </>
            )}
            {mode === MODE_COLLECTION && (
              <>
                <Heading>Collection Mode</Heading>
                <Text fontSize="18px">
                  <p>
                    In this mode, you can mark all the critters you had already
                    caught or donated.{' '}
                  </p>
                </Text>
                <Statistic />
              </>
            )}
            {mode === MODE_ALL && (
              <>
                <Heading>All Mode</Heading>
                <Text
                  sx={{
                    fontSize: '18px',
                  }}
                >
                  <p>
                    In this mode, you can view all the critters in the Animal
                    Crossing: New Horizons game.
                  </p>
                </Text>
                <Statistic />
              </>
            )}
          </Container>
        </Box>
        <ModalCritterDetail />
      </ModeContext.Provider>
    </HemisphereContext.Provider>
  );
};

export default CritterpediaPage;
