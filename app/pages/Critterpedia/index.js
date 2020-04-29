import React, { useCallback, useState } from 'react';
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
import { MODE_ALL, MODE_COLLECTION, MODE_DISCOVERY } from 'utils/const';
import Heading from 'components/heading';
import HemispherePicker from 'components/hemisphere-picker';
import CategoryTab from './components/category-tab';
import { name as key, reducer, updateActiveTab } from './slice';
import saga from './saga';
import selector from './selectors';
import GridView from './components/grid-view';

const CritterpediaPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { activeTab, hemisphere } = useSelector(selector);
  const dispatch = useDispatch();
  const setActiveTab = useCallback(tab => dispatch(updateActiveTab(tab)), []);
  const [mode, setMode] = useState('Discovery');
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
                Hello everyone! I built this side-project to provide some more
                inside information than critterpedia did.
              </p>
              <p>
                If you are curious about these questions below, it would be a
                great time for you to find out the answer:
              </p>
              <ul>
                <li>What critters are available at the moment?</li>
                <li>What critters will be available in next month?</li>
                <li>What critters are available in the other hemisphere?</li>
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
                  active={activeTab === 'Insects'}
                  icon={<Insects width={32} height={32} />}
                  onClick={() => setActiveTab('Insects')}
                />
                <CategoryTab
                  label="Fish"
                  active={activeTab === 'Fish'}
                  icon={<Fish width={32} height={32} />}
                  onClick={() => setActiveTab('Fish')}
                />
              </Flex>
              <Flex>
                <CategoryTab
                  label={MODE_DISCOVERY}
                  active={mode === MODE_DISCOVERY}
                  icon={<CompassIcon width={24} height={24} />}
                  onClick={() => setMode(MODE_DISCOVERY)}
                />
                <CategoryTab
                  label={MODE_COLLECTION}
                  active={mode === MODE_COLLECTION}
                  icon={<AtlasIcon width={24} height={24} />}
                  onClick={() => setMode(MODE_COLLECTION)}
                />
                <CategoryTab
                  label={MODE_ALL}
                  active={mode === MODE_ALL}
                  icon={<EyeIcon width={24} height={24} />}
                  onClick={() => setMode(MODE_ALL)}
                />
              </Flex>
              {/* (
              <Flex>
                <CategoryTab
                  label="Grid"
                  active={mode === 'Grid'}
                  icon={<GridIcon width={32} height={32} />}
                  onClick={() => setMode('Grid')}
                />
                <CategoryTab
                  label="List"
                  active={mode === 'List'}
                  icon={<ListIcon width={32} height={32} />}
                  onClick={() => setMode('List')}
                />
              </Flex>
            ) */}
            </Flex>
          </Container>
          {view === 'Grid' && <GridView mb="30px" />}
          {view === 'List' && <Box>Building</Box>}
          <Container maxWidth="660px">
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
                  {' '}
                  <p>
                    In this mode, you can view all the critters in the Animal
                    Crossing: New Horizons game.
                  </p>
                </Text>
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
