/**
 *
 * ModalCritterDetail
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'redux-injectors';
import Modal from 'react-modal';
import BackgroundImg from 'assets/images/background.jpg';
import { Box } from 'rebass';
import { HemisphereContext } from 'utils/contexts';
import styles from './style.css';
import selector from './selectors';
import { name as key, reducer, closeCritterDetail } from './slice';
import DetailFish from './components/detail-fish';
import DetailInsect from './components/detail-insect';

function ModalCritterDetail() {
  useInjectReducer({ key, reducer });
  const { isModalCritterDetailOpen, category, data, hemisphere } = useSelector(
    selector,
  );
  const [thatHemisphere, setHemisphere] = useState(hemisphere);
  const dispatch = useDispatch();
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
          {data && category === 'Fish' && <DetailFish data={data} />}
          {data && category === 'Insects' && <DetailInsect data={data} />}
        </Box>
      </HemisphereContext.Provider>
    </Modal>
  );
}

ModalCritterDetail.propTypes = {};

export default ModalCritterDetail;
