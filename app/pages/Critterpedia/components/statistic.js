import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Heading from 'components/heading';
import { Text } from 'rebass';
import { useSelector } from 'react-redux';
import selectors, { getCollectionStatus } from 'pages/Critterpedia/selectors';
import { createStructuredSelector } from 'reselect';
import {
  CATEGORY_FISH,
  COLLECTION_CAUGHT,
  COLLECTION_DONATED,
} from 'utils/const';

const Statistic = () => {
  const { fish, insects } = useSelector(selectors);
  const { category } = useParams();
  const activeCategory = category === CATEGORY_FISH ? fish : insects;
  const statusSelector = useMemo(
    () =>
      createStructuredSelector({
        status: getCollectionStatus(category),
      }),
    [category],
  );
  const { status } = useSelector(statusSelector);
  const total = activeCategory.length;
  const values = Object.values(status);
  const caught = values.reduce(
    (sum, i) => sum + (i >= COLLECTION_CAUGHT ? 1 : 0),
    0,
  );
  const donated = values.reduce(
    (sum, i) => sum + (i === COLLECTION_DONATED ? 1 : 0),
    0,
  );
  return (
    <>
      <Heading>Statistic</Heading>
      <Text fontSize="18px">
        <p>
          In category {category}, you had caught {caught} of {total}, donated{' '}
          {donated} of {total}.
        </p>
        {donated < total && <p>Keep moving on! {total - donated} to go!</p>}
      </Text>
    </>
  );
};

Statistic.propTypes = {};

export default Statistic;
