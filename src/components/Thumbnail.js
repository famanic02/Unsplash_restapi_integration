import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { TouchableHighlight,View,Text } from 'react-native';
import { fonts, colors } from '../styles';
import ImageLoad from './ImageLoad';

class Thumbnail extends React.PureComponent {
  handleNavigate = () => {

    const { photo } = this.props;
    this.props._toggleImagePreview(photo);
  }

  render() {
    const { photo, width } = this.props;

    return (
      <View>
          <TouchableHighlight
            style={{ width, height: width }}
            onPress={this.handleNavigate}
            underlayColor={colors.primary}
          >
            <ImageLoad
              style={{ width: '100%', height: '100%' }}
              source={{ uri: photo.urls.thumb }}
              placeholderColor={photo.color}
            />
          </TouchableHighlight>
      </View>
   
    );
  }
}

Thumbnail.propTypes = {
  navigation: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};

export default withNavigation(Thumbnail);