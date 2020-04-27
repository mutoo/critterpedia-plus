import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Flex, Box } from 'rebass';
import Insects from 'assets/images/insects.svg';
import Fish from 'assets/images/fish.svg';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-id-swiper';
import { chunk } from 'lodash';
import CategoryTab from './components/category-tab';
import FishPreview from './components/fish-preview';
import InsectPreview from './components/insect-preview';
import { name as key, reducer, updateActiveTab } from './slice';
import saga from './saga';
import selector from './selectors';

const CritterpediaPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { fish, insects, activeTab } = useSelector(selector);
  const dispatch = useDispatch();
  const setActiveTab = useCallback(tab => dispatch(updateActiveTab(tab)), []);
  const previewSlides = useMemo(() => {
    let category = [];
    switch (activeTab) {
      case 'Fish':
        category = fish;
        break;
      case 'Insects':
        category = insects;
        break;
      default:
        return category;
    }
    return chunk(category, 5);
  }, [fish, insects, activeTab]);
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (swiper) swiper.update();
  }, [swiper, previewSlides]);
  let CategoryPreview = null;
  switch (activeTab) {
    case 'Fish':
      CategoryPreview = FishPreview;
      break;
    case 'Insects':
      CategoryPreview = InsectPreview;
      break;
    default:
  }
  return (
    <Box p="lg">
      <Flex mb="lg">
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
      <Swiper
        containerClass="swiper-container acnh-critterpedia-slides"
        slidesPerView="auto"
        spaceBetween={0}
        mousewheel
        getSwiper={setSwiper}
      >
        {previewSlides.map((slide, idx) => (
          <Flex
            className="acnh-critterpedia-slide"
            flexDirection="column"
            width="120px"
            sx={{
              '&+&': {
                ml: '-2px',
              },
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={`${activeTab}-slide-${idx}`}
          >
            {slide.map(i => (
              <CategoryPreview data={i} key={`${activeTab}-preview-${i.id}`} />
            ))}
          </Flex>
        ))}
      </Swiper>
    </Box>
  );
};

export default CritterpediaPage;
