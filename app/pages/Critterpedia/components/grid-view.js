import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Box } from 'rebass';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-id-swiper';
import { chunk, flatten } from 'lodash';
import { openCritterDetail } from 'containers/ModalCritterDetail/slice';
import {
  CATEGORY_FISH,
  CATEGORY_INSECTS,
  CATEGORY_SEA,
  MODE_COLLECTION,
} from 'utils/const';
import {
  markSelectedAsCaught,
  markSelectedAsDonated,
  clearSelected,
  toggleCritter,
  resetSelected,
} from 'pages/Critterpedia/slice';
import Container from 'containers/Container';
import NetIcon from 'assets/images/net.png';
import SvgIcon from 'components/svg-icon';
import Action from './action';
import PreviewBox from './preview-box';
import selector from '../selectors';
import { trackCategoryEvent } from '../../../configureGA';

const GridView = ({ ...props }) => {
  const { insects, fish, sea, selected } = useSelector(selector);
  const { mode, category } = useParams();
  const activeCategory = {
    [CATEGORY_FISH]: fish,
    [CATEGORY_INSECTS]: insects,
    [CATEGORY_SEA]: sea,
  }[category];
  const dispatch = useDispatch();
  const previewSlides = useMemo(() => chunk(activeCategory, 5), [
    activeCategory,
  ]);
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (swiper) swiper.update();
  }, [swiper, previewSlides]);
  const [hasSelected, setHasSelected] = useState(false);
  useEffect(() => {
    setHasSelected(Object.values(selected).some(Boolean));
  }, [selected]);
  useEffect(() => {
    dispatch(clearSelected());
  }, [category]);
  return (
    <Box
      sx={{
        padding: '60px 0',
        backgroundColor: 'rgba(248, 211, 193, 0.1)',
        borderTop: '2px solid',
        borderTopColor: 'grey-99',
        borderBottom: '2px solid',
        borderBottomColor: 'grey-99',
        width: '100%',
        overflowX: 'hidden',
      }}
      {...props}
    >
      <Swiper
        containerClass="swiper-container acnh-critterpedia-slides"
        slidesPerView="auto"
        spaceBetween={0}
        mousewheel={false}
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
            width={['75px', '', '', '100px']}
            sx={{
              '& + &': {
                ml: ['-1px', '', '', '-2px'],
              },
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={`${category}-slide-${idx}`}
          >
            {slide.map(i => (
              <PreviewBox
                key={`${category}-preview-${i.id}`}
                selected={selected[i.id]}
                data={i}
                onClick={() => {
                  switch (mode) {
                    case MODE_COLLECTION:
                      dispatch(
                        toggleCritter({ id: i.id, selected: !selected[i.id] }),
                      );
                      break;
                    default:
                      dispatch(
                        openCritterDetail({
                          id: i.id,
                          category: i.category,
                          collection: flatten(previewSlides).map(e => e.id),
                        }),
                      );
                  }
                }}
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
      <Container
        mt="30px"
        sx={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform:
            mode === MODE_COLLECTION && hasSelected
              ? 'translateX(-50%) scale(1)'
              : 'translateX(-50%) scale(0)',
          transition: `transform ease-out 0.3s`,
          zIndex: 10,
        }}
      >
        <Flex justifyContent="center">
          <Action
            icon={
              <Box
                width={[24, '', '', 32]}
                height={[24, '', '', 32]}
                sx={{
                  backgroundImage: `url(${NetIcon})`,
                  backgroundSize: 'cover',
                }}
              />
            }
            label="Catch"
            onClick={() => {
              trackCategoryEvent('used', 'catch', category);
              return dispatch(markSelectedAsCaught({ category }));
            }}
          />
          <Action
            icon={<SvgIcon icon="museum" fontSize={[24, '', '', 32]} />}
            label="Donate"
            onClick={() => {
              trackCategoryEvent('used', 'donate', category);
              return dispatch(markSelectedAsDonated({ category }));
            }}
          />
          <Action
            icon={<SvgIcon icon="times-circle" fontSize={[24, '', '', 32]} />}
            label="Clear"
            onClick={() => {
              trackCategoryEvent('used', 'clear', category);
              return dispatch(resetSelected({ category }));
            }}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default GridView;
