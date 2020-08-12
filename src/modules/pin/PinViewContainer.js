import { compose, withState } from 'recompose';

import PinViewScreen from './PinView';

export default compose(
  withState('radioGroupsState', 'setRadioGroupsState', [0, 0]),
)(PinViewScreen);
