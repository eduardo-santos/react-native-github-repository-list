import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const RepositoryListItem = ({
  onPress, title, ownerLogin,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.row}>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {ownerLogin}
        </Text>
      </View>
      <View style={styles.infoContainerIndicator}>
        <Text style={styles.indicator}> + detalhes</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

RepositoryListItem.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  ownerLogin: PropTypes.string,
};

export default RepositoryListItem;
