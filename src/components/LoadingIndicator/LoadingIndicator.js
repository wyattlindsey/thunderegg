import * as React from 'react'
import { connect } from 'react-redux'
import { LOADING_STATES } from 'constants/loading'

class LoadingIndicator extends React.PureComponent {
  render() {
    const { loading } = this.props

    return (
      <div>
        {Object.keys(loading).map((k, i) => (
          <div
            key={`$loading-indicator-${i}`}
          >{`${k}${loading[k] === LOADING_STATES.PENDING
            ? ' loading...'
            : ''}${loading[k] === LOADING_STATES.LOADED
            ? ' loaded'
            : ''}`}</div>
        ))}
      </div>
    )
  }
}

export default connect(state => {
  return {
    loading: state.loading,
  }
})(LoadingIndicator)
