import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import { Point } from 'pixi.js';
import {
  Container,
  SimpleRope,
  Sprite,
  Stage,
  useTick,
} from '@inlet/react-pixi';
import Float from 'assets/images/float.png';
import FloatSplash0 from 'assets/images/float-splash-0.png';
import FloatSplash1 from 'assets/images/float-splash-1.png';
import FloatSplash2 from 'assets/images/float-splash-2.png';
import Water from 'assets/images/water.png';
import ShadowImg from 'assets/images/fish-shadow.png';
import ShadowFinImg from 'assets/images/fish-shadow-fin.png';

const FloatSprite = ({ ...props }) => {
  const [floatY, setFloatY] = useState(0);
  const [splashXs, setSplashXs] = useState([
    { o: 0, a: 0 },
    { o: 0, a: 0 },
    { o: 0, a: 0 },
  ]);
  // eslint-disable-next-line no-unused-vars
  const timeLapse = useRef(0);
  useTick(delta => {
    timeLapse.current += delta;
    setFloatY(-2 + Math.sin(timeLapse.current / 25) * 2);
    const xs = splashXs.map((_, i) => {
      const t = Math.PI;
      const o = (i / 3) * t;
      const n = (timeLapse.current / 50 + o) / t;
      const x = n - Math.floor(n);
      const a = 1 - (1 + Math.cos(x * 2 * Math.PI)) / 2;
      return {
        a,
        x,
      };
    });
    setSplashXs(xs);
  });
  return (
    <Container {...props}>
      <Sprite anchor={0.5} image={FloatSplash2} />
      <Sprite anchor={0.5} y={floatY} image={Float} />
      <Sprite anchor={0.5} image={FloatSplash1} />
      {splashXs.map(({ x, a }, idx) => (
        <Sprite
          anchor={0.5}
          x={-15 + x * 50}
          scale={{ x: 1 + x * 0.4, y: 1 + x * 0.4 }}
          alpha={a}
          image={FloatSplash0}
          // eslint-disable-next-line react/no-array-index-key
          key={`splash_${idx}`}
        />
      ))}
    </Container>
  );
};

const Shadow = ({
  length,
  hasFin,
  thickness,
  curvedness,
  segment,
  amp,
  ...props
}) => {
  const initialPts = useMemo(
    () =>
      Array.from(
        { length: segment },
        (_, idx) => new Point((idx / segment) * length, 0),
      ),
    [],
  );
  const timelapse = useRef(Math.random() * 30);
  useTick(delta => {
    timelapse.current += delta;
    initialPts.forEach((p, idx) => {
      const i = idx / segment;
      // eslint-disable-next-line no-param-reassign
      p.y =
        i ** 2 *
        Math.sin(timelapse.current / 10 - i * 2 * Math.PI * curvedness) *
        amp;
    });
  });
  return (
    <SimpleRope
      points={initialPts}
      image={hasFin ? ShadowFinImg : ShadowImg}
      alpha={0.6}
      scale={{ x: 1, y: thickness / 30 }}
      {...props}
    />
  );
};

const shadows = [
  {
    segment: 20,
    thickness: 12,
    curvedness: 0.3,
    amp: 5,
    length: 30,
  },
  {
    segment: 20,
    thickness: 20,
    curvedness: 0.3,
    amp: 5,
    length: 50,
  },
  {
    segment: 20,
    thickness: 30,
    curvedness: 0.2,
    amp: 10,
    length: 70,
  },
  {
    segment: 20,
    thickness: 35,
    curvedness: 0.2,
    amp: 10,
    length: 90,
  },
  {
    segment: 20,
    thickness: 40,
    curvedness: 0.2,
    amp: 10,
    length: 100,
  },
  {
    segment: 20,
    thickness: 40,
    curvedness: 0.35,
    amp: 10,
    length: 120,
  },
  {
    segment: 20,
    thickness: 20,
    curvedness: 2,
    amp: 10,
    length: 130,
  },
];

const FishShadow = ({ description, ...props }) => {
  const shadow = useMemo(() => {
    if (description.search(/narrow/i) !== -1)
      return shadows[shadows.length - 1];
    const match = /\((\d)\)/.exec(description);
    if (match) {
      const size = match[1];
      return shadows[size - 1];
    }
    return null;
  }, [description]);
  const [hasFin, setHasFin] = useState(false);
  useEffect(() => {
    setHasFin(description.search(/with fin/i) !== -1);
  }, [description]);
  return (
    <Box {...props}>
      <Stage width={300} height={300}>
        <Sprite image={Water} />
        <FloatSprite position={[75, 150]} scale={0.4} />
        {shadow && (
          <Shadow
            position={[125, 150]}
            segment={shadow.segment}
            thickness={shadow.thickness}
            curvedness={shadow.curvedness}
            amp={shadow.amp}
            length={shadow.length}
            hasFin={hasFin}
          />
        )}
      </Stage>
    </Box>
  );
};
FishShadow.propTypes = {
  description: PropTypes.string.isRequired,
};

export default FishShadow;

Shadow.propTypes = {
  hasFin: PropTypes.bool,
  segment: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  curvedness: PropTypes.number.isRequired,
  amp: PropTypes.number.isRequired,
};
