import { StackNavigator } from 'react-navigation';

import RepositoryList from '../screens/RepositoryList';

const stackOptions = () => ({
  headerMode: 'screen',
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#3C4146',
    },
    headerTitleStyle: '#EEF4FC',
    headerTintColor: '#EEF4FC',
  }),
});

const RepositoryListStack = StackNavigator(
  {
    RepositoryListScreen: {
      screen: RepositoryList,
      navigationOptions: {
        headerTitle: 'Lista de repositórios',
      },
    },
  },
  stackOptions(),
);

const routeStackNavigator = StackNavigator(
  {
    RepositoryListRoute: { screen: RepositoryListStack },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default routeStackNavigator;
