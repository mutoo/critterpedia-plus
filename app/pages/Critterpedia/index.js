import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { useParams, useHistory } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import Container from 'containers/Container';
import ModalCritterDetail from 'containers/ModalCritterDetail';
import { HemisphereContext } from 'utils/contexts';
import { changeHemisphere, changeLanguage } from 'containers/App/slice';
import {
  CATEGORY_FISH,
  CATEGORY_INSECTS,
  CATEGORY_SEA,
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
import MonthPicker from './components/month-picker';
import HourPicker from './components/hour-picker';
import Statistic from './components/statistic';
import CategoryTab from './components/category-tab';

import saga from './saga';
import selector from './selectors';
import GridView from './components/grid-view';
import { trackCategoryEvent } from '../../configureGA';
import { persistor } from '../../configureStore';

const CritterpediaPage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    persistor.persist();
  }, []);
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
                Hello everyone! I'm Ninja from HiddenLeaf Island. I built this
                app as an interactive way to explore your Critterpedia and help
                you <b>find new critters</b> more easily.
              </p>
              <p>
                If you have ever wondered about any of these questions, this app
                can help you find the answers:
              </p>
              <ul>
                <li>
                  What critters are available <b>at the moment</b>?
                </li>
                <li>
                  What critters are available <b>in the opposite hemisphere</b>?
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
                Display critter names in:{' '}
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
                Which <b>hemisphere</b> is your island in?
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
              <p>You might also want to do some time-traveling:</p>
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
              <p>Note: These settings apply only to Discovery Mode.</p>
            </Text>
          </Box>
          <Box ref={modeAnchorRef} />
          {mode === MODE_DISCOVERY && (
            <>
              <Heading as="h2">Discovery Mode</Heading>
              <Text fontSize="18px">
                {' '}
                <p>
                  In this mode, you can see which critters are <b>available</b>{' '}
                  based on the hemisphere, date, and time selected above.
                </p>
              </Text>
            </>
          )}
          {mode === MODE_COLLECTION && (
            <>
              <Heading as="h2">Collection Mode</Heading>
              <Text fontSize="18px">
                <p>
                  In this mode, you can <b>mark</b> critters as caught or
                  donated.
                </p>
                <p>Tip: Click on the grid to select critters.</p>
              </Text>
            </>
          )}
          {mode === MODE_ALL && (
            <>
              <Heading as="h2">All Mode</Heading>
              <Text fontSize="18px">
                <p>
                  In this mode, you can view <b>all the critters</b> in Animal
                  Crossing: New Horizons.
                </p>
              </Text>
            </>
          )}
        </Container>
      </Box>
      <Box mt="50px" pb="50px">
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
              <CategoryTab
                label="Sea Creatures"
                active={category === CATEGORY_SEA}
                icon={<SvgIcon icon="sea-creatures" />}
                onClick={() => history.push(`/${mode}/${CATEGORY_SEA}`)}
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
        {view === 'List' && <Box>Not implemented yet.</Box>}
        <Container maxWidth="660px" mb="50px">
          {mode === MODE_DISCOVERY && (
            <>
              <Heading>Graph</Heading>
              <Text fontSize="18px">
                <p>Critters are shown with different statuses:</p>
                <ul>
                  <li>
                    <b>Colorful</b>: These critters are available right now. Go
                    and find them!
                  </li>
                  <li>
                    <b>Dark shade</b>: These critters are available this month,
                    but not at the selected hour. Try a different time.
                  </li>
                  <li>
                    <b>Light shade</b>: These critters are available in the
                    opposite hemisphere. Visit your long-distance friends and
                    keep an eye out for them.
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
            <p>If you like this app, please share it with your friends</p>
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
        <Container maxWidth="660px" mb={0}>
          <Text fontSize="14px">
            <p>
              <b>Disclaimer:</b>
            </p>
            <p>
              Critterpedia Plus is a fan-made API and website. It claims no
              ownership of any intellectual property associated with Nintendo or
              Animal Crossing. All assets found on the site and in the
              repository are the sole property of Nintendo and are used only for
              non-commercial and educational purposes.
            </p>
          </Text>
        </Container>
      </Box>
      <ModalCritterDetail />
    </HemisphereContext.Provider>
  );
};

export default CritterpediaPage;
