import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Box } from 'rebass';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-id-swiper';
import { chunk } from 'lodash';
import { openCritterDetail } from 'containers/ModalCritterDetail/slice';
import PreviewFish from './preview-fish';
import PreviewInsect from './preview-insect';
import selector from '../selectors';

const GridView = () => {
  const { fish, insects, activeTab } = useSelector(selector);
  const dispatch = useDispatch();
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
      CategoryPreview = PreviewFish;
      break;
    case 'Insects':
      CategoryPreview = PreviewInsect;
      break;
    default:
  }
  return (
    <Box
      sx={{
        padding: '60px 0',
        backgroundColor: 'rgba(248, 211, 193, 0.1)',
        borderTop: '2px solid',
        borderTopColor: 'grey-99',
        borderBottom: '2px solid',
        borderBottomColor: 'grey-99',
      }}
    >
      <Swiper
        containerClass="swiper-container acnh-critterpedia-slides"
        slidesPerView="auto"
        spaceBetween={0}
        mousewheel
        getSwiper={setSwiper}
      >
        <Box
          sx={{
            width: 'calc((100vw - 1600px) / 2)',
            minWidth: ['20px', '', '30px', '50px'],
          }}
        />
        {previewSlides.map((slide, idx) => (
          <Flex
            className="acnh-critterpedia-slide"
            flexDirection="column"
            width="100px"
            sx={{
              '&+&': {
                ml: '-2px',
              },
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={`${activeTab}-slide-${idx}`}
          >
            {slide.map(i => (
              <CategoryPreview
                data={i}
                key={`${activeTab}-preview-${i.id}`}
                onClick={() =>
                  dispatch(
                    openCritterDetail({
                      category: activeTab,
                      id: i.id,
                    }),
                  )
                }
              />
            ))}
          </Flex>
        ))}
        <Box
          sx={{
            width: 'calc((100vw - 1600px) / 2)',
            minWidth: ['20px', '', '30px', '50px'],
          }}
        />
      </Swiper>
    </Box>
  );
};

export default GridView;
