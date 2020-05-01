import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Flex, Box } from 'rebass';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-id-swiper';
import { chunk, flatten } from 'lodash';
import { openCritterDetail } from 'containers/ModalCritterDetail/slice';
import { ModeContext } from 'utils/contexts';
import { MODE_COLLECTION } from 'utils/const';
import {
  markSelectedAsCaught,
  markSelectedAsDonated,
  toggleCritter,
  resetSelected,
} from 'pages/Critterpedia/slice';
import Container from 'containers/Container';
import ClearIcon from 'assets/icons/times-circle.svg';
import NetIcon from 'assets/images/net.png';
import MuseumIcon from 'assets/icons/museum.svg';
import Action from './action';
import PreviewBox from './preview-box';
import selector from '../selectors';

const GridView = ({ ...props }) => {
  const { activeCategory, activeTab, selected } = useSelector(selector);
  const dispatch = useDispatch();
  const mode = useContext(ModeContext);
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
              <PreviewBox
                key={`${activeTab}-preview-${i.id}`}
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
          maxHeight: mode === MODE_COLLECTION && hasSelected ? '60px' : '0',
          transition: `max-height ease-out 0.3s`,
          overflow: 'hidden',
        }}
      >
        <Flex justifyContent="center">
          <Action
            icon={<ClearIcon width={32} height={32} />}
            label="Clear"
            onClick={() => dispatch(resetSelected())}
          />
          <Action
            icon={
              <Box
                width="32px"
                height="32px"
                sx={{
                  backgroundImage: `url(${NetIcon})`,
                  backgroundSize: 'cover',
                }}
              />
            }
            label="Catch"
            onClick={() => dispatch(markSelectedAsCaught())}
          />
          <Action
            icon={<MuseumIcon width={32} height={32} color="grey-33" />}
            label="Donate"
            onClick={() => dispatch(markSelectedAsDonated())}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default GridView;
