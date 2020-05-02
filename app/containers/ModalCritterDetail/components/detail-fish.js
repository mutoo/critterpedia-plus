import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Image, Text, Button } from 'rebass';
import NameTag from 'components/name-tag';
import Seasonality from 'components/seasonality';
import { fishImage } from 'utils/data';
import ActiveHours from 'components/active-hours';
import Heading from 'components/heading';
import Container from 'containers/Container';
import ArrowLeftIcon from 'assets/icons/arrow-circle-left.svg';
import ArrowRightIcon from 'assets/icons/arrow-circle-right.svg';
import QuestionIcon from 'assets/icons/question-circle.svg';
import { useDispatch, useSelector } from 'react-redux';
import selector from 'containers/ModalCritterDetail/selectors';
import { openCritterDetail } from 'containers/ModalCritterDetail/slice';
import { HemisphereContext } from 'utils/contexts';
import FishShadow from 'components/fish-shadow';

const DetailFish = ({ data }) => {
  const { category, nextId, prevId, collection } = useSelector(selector);
  const [hemisphere] = useContext(HemisphereContext);
  const [shouldPreviewShadow, previewShadow] = useState(false);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '960px',
      }}
      onClick={() => previewShadow(false)}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        p="30px"
        sx={{
          borderBottom: '4px double',
          borderBottomColor: 'grey-99',
        }}
      >
        <NameTag names={data.name} fontSize="16px" mb="10px" />
        <Box
          sx={{
            width: '100%',
            maxWidth: '640px',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '100%',
              paddingBottom: '50%',
            },
          }}
        >
          <Image
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
            }}
            src={fishImage(data.id)}
            key={`fish-${data.id}`}
          />
        </Box>
        {prevId !== nextId && (
          <Flex
            sx={{
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Button
              sx={{ color: 'grey-33', background: 'transparent' }}
              onClick={() =>
                dispatch(
                  openCritterDetail({
                    category,
                    id: prevId,
                    collection,
                  }),
                )
              }
            >
              <ArrowLeftIcon width={32} height={32} />
            </Button>
            <Button
              sx={{ color: 'grey-33', background: 'transparent' }}
              onClick={() =>
                dispatch(
                  openCritterDetail({
                    category,
                    id: nextId,
                    collection,
                  }),
                )
              }
            >
              <ArrowRightIcon width={32} height={32} />
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex
        py="24px"
        sx={{
          borderBottom: '1px solid',
          borderBottomColor: 'grey-99',
        }}
      >
        <Container>
          <Seasonality
            availableMonths={
              data.availability[`month-${hemisphere.toLowerCase()}`]
            }
          />
        </Container>
        <Container>
          <ActiveHours
            availableMonths={
              data.availability[`month-${hemisphere.toLowerCase()}`]
            }
            availableHours={data.availability.time}
          />
        </Container>
      </Flex>
      <Flex flexWrap="wrap" py="24px">
        <Container flex="0 0 50%" mb="lg">
          <Heading mr="lg">Location</Heading>
          <Text
            as="span"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {data?.availability?.location}
          </Text>
        </Container>
        <Container flex="0 0 50%" mb="lg">
          <Heading mr="lg">Shadow Size</Heading>
          <Text
            as="span"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
              position: 'relative',
            }}
          >
            {data?.shadow ? (
              <Box
                as="span"
                sx={{ cursor: 'pointer' }}
                onClick={e => {
                  previewShadow(true);
                  e.stopPropagation();
                }}
              >
                {data.shadow} <QuestionIcon width={14} height={14} />
                {shouldPreviewShadow && (
                  <FishShadow
                    description={data.shadow}
                    sx={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translate(-50%, -20px)',
                      borderRadius: '40%',
                      overflow: 'hidden',
                      zIndex: 3,
                      boxShadow: '0 5px 10px 0px rgba(0,0,0,0.5)',
                    }}
                  />
                )}
              </Box>
            ) : (
              'Unknown'
            )}
          </Text>
        </Container>
        <Container flex="0 0 50%" mb="lg">
          <Heading mr="lg">Price</Heading>
          <Text
            as="span"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {data?.price} bells ( {data?.['price-cj']} when sell to C.J. )
          </Text>
        </Container>
        <Container flex="0 0 50%" mb="lg">
          <Heading mr="lg">Rarity</Heading>
          <Text
            as="span"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {data?.availability?.rarity}
          </Text>
        </Container>
      </Flex>
    </Box>
  );
};

export default DetailFish;

DetailFish.propTypes = {
  data: PropTypes.object.isRequired,
};
