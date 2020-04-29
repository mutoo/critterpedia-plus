import React, { useCallback, useState } from 'react';
import { Flex, Box } from 'rebass';
import Insects from 'assets/icons/insects.svg';
import Fish from 'assets/icons/fish.svg';
import Grid from 'assets/icons/grip-horizontal.svg';
import List from 'assets/icons/list-ul.svg';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import Container from 'containers/Container';
import ModalCritterDetail from 'containers/ModalCritterDetail';
import CategoryTab from './components/category-tab';
import { name as key, reducer, updateActiveTab } from './slice';
import saga from './saga';
import selector from './selectors';
import GridView from './components/grid-view';

const CritterpediaPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { activeTab } = useSelector(selector);
  const dispatch = useDispatch();
  const setActiveTab = useCallback(tab => dispatch(updateActiveTab(tab)), []);
  const [mode, setMode] = useState('Grid');
  return (
    <>
      <Helmet>
        <title>Critterpedia</title>
      </Helmet>
      <Box py="50px">
        <Container>
          <Flex mb="-20px">
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
            {null && (
              <Flex>
                <CategoryTab
                  label="Grid"
                  active={mode === 'Grid'}
                  icon={<Grid width={32} height={32} />}
                  onClick={() => setMode('Grid')}
                />
                <CategoryTab
                  label="List"
                  active={mode === 'List'}
                  icon={<List width={32} height={32} />}
                  onClick={() => setMode('List')}
                />
              </Flex>
            )}
          </Flex>
        </Container>
        {mode === 'Grid' && <GridView />}
        {mode === 'List' && <Box>Building</Box>}
      </Box>
      <ModalCritterDetail />
    </>
  );
};

export default CritterpediaPage;
