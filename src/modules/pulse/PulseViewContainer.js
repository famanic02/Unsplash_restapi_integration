import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  FlatList,
  RefreshControl
} from 'react-native';

import { fonts, colors } from '../../styles';
import CustomText from '../../components/Text';
import { connect } from 'react-redux'
import styles from './PulseScreenStyle'
import unsplashService from '../../../src/services/API';
import Thumbnail from '../../components/Thumbnail';
import Modal from 'react-native-modal';
import GallerySwiper from "react-native-gallery-swiper";

const BATCH_SIZE = 24;
const NUM_COLUMNS = 4;
const THUMBNAIL_WIDTH = Dimensions.get('window').width / NUM_COLUMNS - 6;

const tempData = [
  {
    "urls": {
      "raw": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
      "full": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
      "regular": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=92f3e02f63678acc8416d044e189f515",
      "small": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb",
      "thumb": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=8aae34cf35df31a592f0bef16e6342ef"
    }
  }
]

class PulseScreen extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: false,
      page: 1,
      error: null,
      isRefreshing: false,
      imagePreview : false,
      photo : {  }
    };

    this.dataArray = [];

    const { navigation } = this.props;
    this.userData = navigation.getParam('userData');

  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const { page } = this.state;

    this.setState({ isLoading: true });

    unsplashService.listPhotos(page, BATCH_SIZE)
      .then(unsplashService.toJson)
      .then((data) => {
        console.log(data);
        if(data.errors)
        {
          data = tempData;
        }
        this.dataArray = page === 1 ? data : [...this.dataArray, ...data];
        this.setState({
          error: data.error || null,
          isLoading: false,
          isRefreshing: false,
        });
      })
      .catch((error) => {
        this.setState({ error, isLoading: false });
      });
  };

  _toggleImagePreview = (photo) => {
    console.log(photo);
    this.setState({imagePreview:!this.state.imagePreview,photo});
  }


  handleLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 }, () => {
      this.makeRemoteRequest();
    });
  };

  handleRefresh = () => {
    this.setState({ page: 1, isRefreshing: true }, () => {
      this.makeRemoteRequest();
    });
  };

  renderHeader = () => {

    return (
      <View style={{ padding: 20, flexDirection: "row",borderBottomColor:colors.gray,borderBottomWidth:0.5 }}>
        <View style={styles.profileImage}>
        <Image             
            source={this.userData.avatarImage}
            resizeMode={'contain'}
            style={styles.profileImage} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5
          }}
        >
          <View
            style={{
              width: "80%",
              marginLeft: 1,
              marginBottom:10,
              alignItems: "flex-start"
            }}
          >
            <CustomText style={styles.userName}>
                {this.userData.userName}
            </CustomText>
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <CustomText>39</CustomText>
              <CustomText>Posts</CustomText>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <CustomText>339</CustomText>
              <CustomText>followers</CustomText>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <CustomText>393</CustomText>
              <CustomText>following</CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderItem = ({ item, index }) => {
    const columnIndex = index % 4;
    return (
      <View style={{ marginLeft: columnIndex > 0 ? 8 : 0 }} key={'image_list_'+index}>
        <Thumbnail
          photo={item}
          width={THUMBNAIL_WIDTH}
          _toggleImagePreview={this._toggleImagePreview}
        />
      </View>
    );
  }

  renderFooter = () => {
    const { isLoading } = this.state;

    if (!isLoading) return null;

    return (
      <ActivityIndicator
        style={{ marginVertical: 24 }}
        size="large"
        color={colors.blue}
      />
    );
  };

  getItemLayout = (data, index) => ({
    length: THUMBNAIL_WIDTH,
    offset: THUMBNAIL_WIDTH * index,
    index,
  });

  render() {

    const { error, isRefreshing } = this.state;

    if (error) {
      return (
        <View>
          <CustomText style={{ fontSize: 16, color: colors.grey }}>
            {'Yikes, something went wrong! :o'}
          </CustomText>
          <Button
            onPress={this.makeRemoteRequest}
            title="Try Again"
            color={colors.primary}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <FlatList
          data={this.dataArray}
          renderItem={this.renderItem}
          keyExtractor={(item,index) => 'image_list_'+index}
          getItemLayout={this.getItemLayout}
          maxToRenderPerBatch={BATCH_SIZE}
          windowSize={BATCH_SIZE}
          numColumns={NUM_COLUMNS}
          removeClippedSubviews
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.handleRefresh}
              tintColor={colors.blue}
            />
          )}
          columnWrapperStyle={{ marginBottom: 8 }}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmptyComponent}
        />  
        <Modal 
              isVisible={this.state.imagePreview} 
              style={{backgroundColor:colors.white,}}
              onBackdropPress={() => this.setState({ imagePreview: false })}
              onBackButtonPress={() => this.setState({ imagePreview: false })}
              onRequestClose={() => this.setState({ imagePreview: false })}
              transparent={true}
              style={{height:0}}
            >
          <View >
            {this.state.photo.urls && 
                <Image
                    source={{uri: this.state.photo.urls.full}}
                    resizeMode={'contain'}
                    width={'100%'}
                    height={'100%'}
                    style={{
                      height:'100%',
                      width:'100%'
                    }}
                />
            }
          </View>
        </Modal>      
      </View>
    );
  }

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PulseScreen)