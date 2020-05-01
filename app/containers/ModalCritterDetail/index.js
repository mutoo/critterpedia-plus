/**
 *
 * ModalCritterDetail
 *
 */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'redux-injectors';
import Modal from 'react-modal';
import BackgroundImg from 'assets/images/background.jpg';
import { Box } from 'rebass';
import { HemisphereContext } from 'utils/contexts';
import { CATEGORY_FISH, CATEGORY_INSECTS } from 'utils/const';
import styles from './style.css';
import selector from './selectors';
import {
  name as key,
  reducer,
  closeCritterDetail,
  openCritterDetail,
} from './slice';
import DetailFish from './components/detail-fish';
import DetailInsect from './components/detail-insect';

function ModalCritterDetail() {
  useInjectReducer({ key, reducer });
  const {
    isModalCritterDetailOpen,
    category,
    data,
    nextId,
    prevId,
    collection,
    hemisphere,
  } = useSelector(selector);
  const [thatHemisphere, setHemisphere] = useState(hemisphere);
  const dispatch = useDispatch();
  useEffect(() => {
    const onKeyDown = e => {
      if (nextId !== prevId) {
        switch (e.key) {
          case 'ArrowRight':
            dispatch(
              openCritterDetail({
                category,
                id: nextId,
                collection,
              }),
            );
            break;
          case 'ArrowLeft':
            dispatch(
              openCritterDetail({
                category,
                id: prevId,
                collection,
              }),
            );
            break;
          default:
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [nextId, prevId]);
  return (
    <Modal
      isOpen={isModalCritterDetailOpen}
      onAfterOpen={() => {
        setHemisphere(hemisphere);
      }}
      onRequestClose={() => {
        dispatch(closeCritterDetail());
      }}
      className={styles.modal__content}
      overlayClassName={styles.modal__overlay}
    >
      <HemisphereContext.Provider
        value={[thatHemisphere, h => setHemisphere(h)]}
      >
        <Box
          sx={{
            backgroundImage: `url(${BackgroundImg})`,
          }}
        >
          {data && category === CATEGORY_FISH && <DetailFish data={data} />}
          {data && category === CATEGORY_INSECTS && (
            <DetailInsect data={data} />
          )}
        </Box>
      </HemisphereContext.Provider>
    </Modal>
  );
}

ModalCritterDetail.propTypes = {};

export default ModalCritterDetail;
