import * as React from 'react'
import Loadable from 'react-loadable'

import Store from 'store'
import { setLoaded, setPending } from 'actions/loading'
import { LOADING_TARGETS } from 'constants/loading'

import LoadingIndicator from 'components/LoadingIndicator'

const loadingStyles = {
  alignItems: 'center',
  backgroundColor: 'black',
  color: 'gray',
  display: 'flex',
  flexDirection: 'row',
  height: '512px',
  justifyContent: 'center',
  fontSize: '1.5rem',
  width: '100%',
}

const Loader = Loadable.Map({
  delay: 500,
  loader: {
    ThreeViewport: async () => {
      Store.dispatch(setPending(LOADING_TARGETS.THREE_VIEWPORT))
      const ThreeViewport = await import('components/ThreeViewport')
      Store.dispatch(setLoaded(LOADING_TARGETS.THREE_VIEWPORT))
      return ThreeViewport
    },
    ShapeViewport: async () => {
      Store.dispatch(setPending(LOADING_TARGETS.SHAPE_VIEWPORT))
      const ShapeViewport = await import('components/ShapeViewport')
      Store.dispatch(setLoaded(LOADING_TARGETS.SHAPE_VIEWPORT))
      return ShapeViewport
    },
  },
  loading: props =>
    props.pastDelay && (
      <div style={loadingStyles}>
        <LoadingIndicator {...props} />
      </div>
    ),
  render(loaded, props) {
    const ThreeViewport = loaded.ThreeViewport.default
    const ShapeViewport = loaded.ShapeViewport.default

    return (
      <ThreeViewport {...props}>
        <ShapeViewport />
      </ThreeViewport>
    )
  },
  timeOut: 20000,
})

export default Loader
