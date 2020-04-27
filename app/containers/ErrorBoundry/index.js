import React from 'react';
import PropsType from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div style={{ overflowY: 'scroll' }}>
          <h2>Something went wrong.</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropsType.node,
};

export default ErrorBoundary;
