import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const PreviewImage = ({ data, width, height }) => {
  const img = useRef(null);
  const [dimension, setDimension] = useState(null);
  const onload = useCallback(() => {
    setDimension(img.current.getBBox());
  }, []);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        filter: 'drop-shadow(0 6px 1px rgba(0,0,0,0.5)',
      }}
    >
      <image
        href={data['image-uri']}
        ref={img}
        x={dimension ? '50%' : '100%'}
        y={dimension ? '50%' : '100%'}
        transform={
          dimension
            ? `translate(${-dimension.width / 2} ${-dimension.height / 2})`
            : undefined
        }
        onLoad={onload}
      />
    </svg>
  );
};

PreviewImage.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default PreviewImage;
