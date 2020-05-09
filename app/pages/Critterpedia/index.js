import React, { useMemo, useRef, useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { useParams, useHistory } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import Container from 'containers/Container';
import ModalCritterDetail from 'containers/ModalCritterDetail';
import { HemisphereContext } from 'utils/contexts';
import { DiscussionEmbed } from 'disqus-react';
import { changeHemisphere, changeLanguage } from 'containers/App/slice';
import {
  CATEGORY_FISH,
  CATEGORY_INSECTS,
  LANGUAGES,
  MODE_ALL,
  MODE_COLLECTION,
  MODE_DISCOVERY,
} from 'utils/const';
import Heading from 'components/heading';
import HemispherePicker from 'components/hemisphere-picker';
import {
  name as key,
  reducer,
  updateFilterMonth,
  updateFilterHour,
} from 'pages/Critterpedia/slice';
import SvgIcon from 'components/svg-icon';
import { Bling as GPT } from 'react-gpt';
import MonthPicker from './components/month-picker';
import HourPicker from './components/hour-picker';
import Statistic from './components/statistic';
import CategoryTab from './components/category-tab';

import saga from './saga';
import selector from './selectors';
import GridView from './components/grid-view';
import { trackCategoryEvent } from '../../configureGA';

const CritterpediaPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    hemisphere,
    filters: { month, hour },
    language,
  } = useSelector(selector);
  const modeAnchorRef = useRef();
  const scrollToMode = useMemo(
    () => () => {
      if (modeAnchorRef.current)
        modeAnchorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    },
    [],
  );
  const { mode, category } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [view /* , setView */] = useState('Grid');
  const disqus = useMemo(
    () => (
      <DiscussionEmbed
        key="critterpedia-plus-disqus"
        shortname="critterpedia-plus"
        config={{
          url: 'https://critterpedia-plus.mutoo.im',
          identifier: 'critterpedia-plus-guestbook',
          title: 'Critterpedia Plus',
        }}
      />
    ),
    [],
  );
  return (
    <HemisphereContext.Provider
      value={[hemisphere, h => dispatch(changeHemisphere(h))]}
    >
      <Helmet>
        <title>Critterpedia Plus</title>
      </Helmet>
      <Box my="50px">
        <Container maxWidth="660px">
          <Box as="section" mb="50px">
            <Heading as="h1">Critterpedia Plus</Heading>
            <Text fontSize="18px">
              <p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Hello everyone! I'm Ninja from HiddenLeaf island. I built this
                app to provide an interactive way to inspect critterpedia. Which
                helps you easily <b>finding new critters</b>.
              </p>
              <p>
                If you are curious about these questions below, it would be a
                great time for you to find out the answer:
              </p>
              <ul>
                <li>
                  What critters are available <b>at the moment</b>?
                </li>
                <li>
                  What critters are available <b>in the other hemisphere</b>?
                </li>
                <li>
                  What critters will be available <b>next month</b>?
                </li>
              </ul>
              <p>By the way, you can mark your critters in Collection Mode.</p>
            </Text>
          </Box>
          <Box as="section" mb="50px">
            <Heading as="h2">Getting Started</Heading>
            <Text fontSize="18px">
              <p>
                Display critter&apos;s name in this language:{' '}
                <select
                  defaultValue={language}
                  onChange={e => {
                    dispatch(changeLanguage(e.target.value));
                  }}
                >
                  {LANGUAGES.map(lang => (
                    <option
                      key={lang.value}
                      value={lang.value}
                      defaultChecked={lang.value === language}
                    >
                      {lang.label}
                    </option>
                  ))}
                </select>
              </p>
            </Text>
            <Text fontSize="18px">
              <p>
                Which <b>hemisphere</b> do you play on?
              </p>
              <HemispherePicker
                hemisphere={hemisphere}
                setHemisphere={h => {
                  trackCategoryEvent('app', 'setHemisphere', h);
                  return dispatch(changeHemisphere(h));
                }}
                justifyContent="center"
              />
            </Text>
            <Text fontSize="18px">
              <p>You might also want to do some time traveling:</p>
            </Text>
            <MonthPicker
              month={month}
              onChange={m => dispatch(updateFilterMonth(m))}
              mb="lg"
            />
            <HourPicker
              hour={hour}
              onChange={h => dispatch(updateFilterHour(h))}
            />
            <Text fontSize="14px">
              <p>N.B. these settings are only applicable to Discovery Mode.</p>
            </Text>
          </Box>
          <Box ref={modeAnchorRef} />
          {mode === MODE_DISCOVERY && (
            <>
              <Heading as="h2">Discovery Mode</Heading>
              <Text fontSize="18px">
                {' '}
                <p>
                  In this mode, you can view the critters with{' '}
                  <b>availability</b>, based on your selected hemisphere, date,
                  and time, above this section.
                </p>
              </Text>
            </>
          )}
          {mode === MODE_COLLECTION && (
            <>
              <Heading as="h2">Collection Mode</Heading>
              <Text fontSize="18px">
                <p>
                  In this mode, you can <b>mark</b> all the critters you had
                  already caught or donated.
                </p>
                <p>Tips: click on the grid to select the critters.</p>
              </Text>
            </>
          )}
          {mode === MODE_ALL && (
            <>
              <Heading as="h2">All Mode</Heading>
              <Text fontSize="18px">
                <p>
                  In this mode, you can view <b>all the critters</b> in the
                  Animal Crossing: New Horizons game.
                </p>
              </Text>
            </>
          )}
        </Container>
      </Box>
      <Box my="50px">
        <Container>
          <Flex mb="-20px" justifyContent="space-between">
            <Flex mr="50px">
              <CategoryTab
                label="Insects"
                active={category === CATEGORY_INSECTS}
                icon={<SvgIcon icon="insects" />}
                onClick={() => history.push(`/${mode}/${CATEGORY_INSECTS}`)}
              />
              <CategoryTab
                label="Fish"
                active={category === CATEGORY_FISH}
                icon={<SvgIcon icon="fish" />}
                onClick={() => history.push(`/${mode}/${CATEGORY_FISH}`)}
              />
            </Flex>
            <Flex>
              <CategoryTab
                label="Discovery"
                active={mode === MODE_DISCOVERY}
                icon={<SvgIcon icon="compass" />}
                onClick={() => {
                  scrollToMode();
                  history.push(`/${MODE_DISCOVERY}/${category}`);
                }}
              />
              <CategoryTab
                label="Collection"
                active={mode === MODE_COLLECTION}
                icon={<SvgIcon icon="atlas" />}
                onClick={() => {
                  scrollToMode();
                  history.push(`/${MODE_COLLECTION}/${category}`);
                }}
              />
              <CategoryTab
                label="All"
                active={mode === MODE_ALL}
                icon={<SvgIcon icon="eye" />}
                onClick={() => {
                  scrollToMode();
                  history.push(`/${MODE_ALL}/${category}`);
                }}
              />
            </Flex>
          </Flex>
        </Container>
        {view === 'Grid' && <GridView mb="30px" />}
        {view === 'List' && <Box>Building</Box>}
        <Container maxWidth="660px" mb="50px">
          {mode === MODE_DISCOVERY && (
            <>
              <Heading>Graph</Heading>
              <Text fontSize="18px">
                <p>The critters are shown in different status: </p>
                <ul>
                  <li>
                    <b>Colorful</b>: It is available right now! Go and find
                    them!
                  </li>
                  <li>
                    <b>Dark shade</b>: It is available this month, but not at
                    the current hour, try the other time then.
                  </li>
                  <li>
                    <b>Light shade</b>: It is available on the other hemisphere,
                    visit your long-distance friends and pay attention to the
                    critters!
                  </li>
                </ul>
              </Text>
            </>
          )}
          {mode === MODE_COLLECTION && (
            <>
              <Statistic />
            </>
          )}
          {mode === MODE_ALL && (
            <>
              <Statistic />
            </>
          )}
          <Text fontSize="18px" mt="50px">
            <p>If you like this app, please share it with your friends, </p>
            <p>
              or support me via{' '}
              <a
                className="bmc-button"
                target="_blank"
                href="https://www.buymeacoffee.com/mutoo"
              >
                <img
                  src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
                  alt="Buy me a Coca-Cola"
                />
                <span>Buy me a Coca-Cola</span>
              </a>
            </p>
          </Text>
        </Container>
        <Box
          sx={{
            margin: '0 auto',
            maxWidth: '728px',
            backgroundColor: 'title-bg',
            backgroundClip: 'content-box',
            mb: '50px',
          }}
        >
          <GPT
            adUnitPath="/21918258587/critterpedia-index"
            sizeMapping={[
              { viewport: [0, 0], slot: [320, 50] },
              { viewport: [750, 0], slot: [728, 90] },
            ]}
          />
        </Box>
        <Container maxWidth="660px" mb="50px">
          {disqus}
        </Container>
      </Box>
      <ModalCritterDetail />
    </HemisphereContext.Provider>
  );
};

export default CritterpediaPage;
