/**
 *
 * ModalCritterDetail
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'redux-injectors';
import Modal from 'react-modal';
import BackgroundImg from 'assets/images/background.jpg';
import { Box } from 'rebass';
import styles from './style.css';
import selector from './selectors';
import { name as key, reducer, closeCritterDetail } from './slice';
import DetailFish from './components/detail-fish';

function ModalCritterDetail() {
  useInjectReducer({ key, reducer });
  const { isModalCritterDetailOpen, data } = useSelector(selector);

  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isModalCritterDetailOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => {
        dispatch(closeCritterDetail());
      }}
      className={styles.modal__content}
      overlayClassName={styles.modal__overlay}
    >
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImg})`,
        }}
      >
        {data && <DetailFish data={data} />}
      </Box>
    </Modal>
  );
}

ModalCritterDetail.propTypes = {};

export default ModalCritterDetail;
