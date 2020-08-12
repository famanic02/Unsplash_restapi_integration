/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { StoryTypes } from './actions'

export const fetchStoriesLoading = (state) => ({
  ...state,
  storyIsLoading: true,
  storyErrorMessage: null,
})

export const fetchStoriesSuccess = (state, { data }) => ({
  ...state,
  data: data,
  storyIsLoading: false,
  storyErrorMessage: null,
})

export const fetchStoriesFailure = (state, { errorMessage }) => ({
  ...state,
  data: {},
  storyIsLoading: false,
  storyErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [StoryTypes.FETCH_STORIES_LOADING]: fetchStoriesLoading,
  [StoryTypes.FETCH_STORIES_SUCCESS]: fetchStoriesSuccess,
  [StoryTypes.FETCH_STORIES_FAILURE]: fetchStoriesFailure,
})
