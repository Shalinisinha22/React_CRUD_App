import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '././redux/store';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate  persistor={persistor}>
           <AppNavigator></AppNavigator>
           </PersistGate>
        </Provider>
    
   
        <StatusBar
        backgroundColor='white'
        barStyle={"dark-content"}
        translucent={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
 
  },
});
