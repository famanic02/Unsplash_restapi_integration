import { takeLatest, all } from 'redux-saga/effects'
import { StoryTypes } from '../stores/stories/actions'
import { fetchStories } from './storiesSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Call `fetchStories()` when a `FETCH_STORIES` action is triggered
    takeLatest(StoryTypes.FETCH_STORIES, fetchStories),
  ])
}
