import React, { PureComponent } from 'react';
import {
  StyleSheet, TouchableWithoutFeedback, FlatList, RefreshControl, Text, View, Linking,
} from 'react-native';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { RepositoryListItem, Separator } from '../components/RepositoryListItem';

import { apiGetGitHubList } from '../actions/apiGitHubRepositoryList';

import { URL_LIST_REPOSITORIES } from '../sagas/apiSagas';

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 16,
    marginHorizontal: 18,
  },
});

class RepositoryList extends PureComponent {
  componentWillMount() {
    this.getRepositoryList();
  }

  getRepositoryList = () => {
    this.props.dispatch(apiGetGitHubList(100));
  };

  onPressRepositoryItem = (idRepository) => {
    const url = `${URL_LIST_REPOSITORIES}/${idRepository}`
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert('Não foi possível visualizar mais detalhes do repositório. Tente novamente.');
      }
    });
  };

  renderEmptyList = () => {

    if(this.props.isApiSubmiting) {
      return <Text style={styles.emptyList}>Carregando...</Text>
    } else {
      return this.props.apiResultData && this.props.apiResultData.Errors ? 
      <Text style={styles.emptyList}>Ocorreu um erro ao obter a lista de repositórios. Tente novamente.</Text>
      : <Text style={styles.emptyList}>Nenhum repositório foi encontrado.</Text> 
    }
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles.flatList}
          data={this.props.apiResultData && !this.props.apiResultData.Errors ? this.props.apiResultData : null}
          renderItem={({ item }) => (
            <RepositoryListItem
              onPress={() => this.onPressRepositoryItem(item.id)}
              title={item.name}
              ownerLogin={item.owner.login}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={
            <TouchableWithoutFeedback onPress={this.getRepositoryList}>
              {this.renderEmptyList()}
            </TouchableWithoutFeedback>
          }
          refreshControl={(
            <RefreshControl
              refreshing={this.props.isApiSubmiting}
              onRefresh={() => this.getRepositoryList()}
              tintColor="#53B5E1"
              colors={["#53B5E1"]}
            />
          )}
        />
      </View>
    );
  }
}

RepositoryList.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  apiResultData: PropTypes.any,
  isApiSubmiting: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...state.apiGitHubRepositoryList,
});

export default connect(mapStateToProps)(RepositoryList);
