import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Flex, Box, Text } from 'rebass';
import Insects from 'assets/images/insects.svg';
import Fish from 'assets/images/fish.svg';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import FishPreview from './components/fish-preview';
import InsectPreview from './components/insect-preview';
import { name as key, reducer, updateActiveTab } from './slice';
import saga from './saga';
import selector from './selectors';

const Tab = ({ label, active, icon, ...props }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    p="lg"
    mr="-10px"
    sx={{
      position: 'relative',
      backgroundColor: 'white',
      borderRadius: '50%',
      cursor: 'pointer',
      '& > svg': {
        position: 'relative',
        zIndex: 1,
        color: active ? 'orange' : 'grey-66',
        transform: `scale(${active ? 1.2 : 1})`,
        transition: 'transform ease-out 0.2s',
      },
    }}
    {...props}
  >
    {icon}
    {active && (
      <Text
        sx={{
          position: 'absolute',
          background: 'orange',
          borderRadius: '10px 10px',
          color: 'grey-33',
          bottom: '80%',
          left: '50%',
          whiteSpace: 'nowrap',
          py: 'sm',
          px: 'lg',
          transform: 'translateX(-50%)',
        }}
      >
        {label}
      </Text>
    )}
  </Flex>
);

Tab.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

const CritterpediaPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { fish, insects, activeTab } = useSelector(selector);
  const dispatch = useDispatch();
  const setActiveTab = useCallback(tab => dispatch(updateActiveTab(tab)), []);
  return (
    <Box p="lg">
      <Flex mb="lg">
        <Tab
          label="Insects"
          active={activeTab === 'Insects'}
          icon={<Insects width={32} height={32} />}
          onClick={() => setActiveTab('Insects')}
        />
        <Tab
          label="Fish"
          active={activeTab === 'Fish'}
          icon={<Fish width={32} height={32} />}
          onClick={() => setActiveTab('Fish')}
        />
      </Flex>
      <Flex
        flexDirection="column"
        flexWrap="wrap"
        sx={{
          height: 120 * 5,
        }}
      >
        {activeTab === 'Fish' &&
          fish.map(f => (
            <FishPreview data={f} key={`fish-${f.id}`} mb="-2px" mr="-2px" />
          ))}
        {activeTab === 'Insects' &&
          insects.map(i => (
            <InsectPreview
              data={i}
              key={`insect-${i.id}`}
              mb="-2px"
              mr="-2px"
            />
          ))}
      </Flex>
    </Box>
  );
};

export default CritterpediaPage;
