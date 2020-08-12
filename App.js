/** 
 * javascript comment 
 * @Author: Freddy Mendez 
 * @Date: 2020-03-28 13:05:35 
 * @Desc: Wrapper file to load the views
 */
import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles';
import createStore from './src/redux/stores/index';

const { store, persistor } = createStore();

import AppView from './src/modules/AppViewContainer';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <View style={styles.container}>
            <ActivityIndicator color={colors.red} />
          </View>
        }
        persistor={persistor}
      >
        <AppView />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
