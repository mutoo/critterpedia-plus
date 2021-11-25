import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { waitAndScrollByElement } from './utils';

/**
 * Redirect to disqus comment when it's ready /comment-5621046783
 */
const DisqusRedirect = () => {
  // TODO: redirect to comment id
  // const { commentId } = useParams();
  const history = useHistory();
  useEffect(() => {
    history.push('/');
    return () => {
      waitAndScrollByElement('#disqus_thread').catch(() => {});
    };
  }, []);

  return <></>;
};

DisqusRedirect.propTypes = {};

export default DisqusRedirect;
