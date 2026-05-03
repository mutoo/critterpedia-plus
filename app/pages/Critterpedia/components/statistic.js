import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Heading from 'components/heading';
import { Text } from 'rebass';
import { useSelector } from 'react-redux';
import selectors, { getCollectionStatus } from 'pages/Critterpedia/selectors';
import { createStructuredSelector } from 'reselect';
import {
  CATEGORY_FISH,
  CATEGORY_INSECTS,
  CATEGORY_SEA,
  COLLECTION_CAUGHT,
  COLLECTION_DONATED,
} from 'utils/const';

const Statistic = () => {
  const { fish, insects, sea } = useSelector(selectors);
  const { category } = useParams();
  const activeCategory = {
    [CATEGORY_FISH]: fish,
    [CATEGORY_INSECTS]: insects,
    [CATEGORY_SEA]: sea,
  }[category];
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
      <Heading>Statistics</Heading>
      <Text fontSize="18px">
        <p>
          In the {category} category, you have caught {caught} of {total} and
          donated {donated} of {total}.
        </p>
        {donated < total && <p>Keep going! {total - donated} to go!</p>}
      </Text>
    </>
  );
};

Statistic.propTypes = {};

export default Statistic;
