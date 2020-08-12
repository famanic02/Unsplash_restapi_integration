import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../sagas'
import { reducer as StoryReducer } from './stories/reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    stories: StoryReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
