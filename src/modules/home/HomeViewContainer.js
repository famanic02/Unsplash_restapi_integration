import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

import { fonts, colors } from '../../styles';
import { TextInput } from '../../components/index';
import CustomText from '../../components/Text';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import styles from './HomeScreenStyle'
import HomeScreenActions from '../../redux/stores/stories/actions'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LottieView from 'lottie-react-native';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users : [
            {
                userName : 'Fani Fagialo',
                title : 'Technical Analyst',
                avatarImage : require('../../assets/images/men/1.jpg')
            },
            {
                userName : 'Ferara Arinan',
                title : 'Technical Lead',
                avatarImage : require('../../assets/images/women/1.jpg')
            },
            {
                userName : 'Gahaua Ulalal',
                title : 'Project Manager',
                avatarImage : require('../../assets/images/men/2.jpg')
            },
            {
                userName : 'Globara Nuno',
                title : 'Program Analyst',
                avatarImage : require('../../assets/images/women/2.jpg')
            },
            {
                userName : 'Giziele Dumbo',
                title : 'UI Architecht',
                avatarImage : require('../../assets/images/men/3.jpg')

            },
            {
                userName : 'Gamalie Tapi',
                title : 'Business Analyst',
                avatarImage : require('../../assets/images/women/3.jpg')
            },
            {
                userName : 'Fani Fagialo',
                title : 'Technical Analyst',
                avatarImage : require('../../assets/images/men/4.jpg')
            },
            {
                userName : 'Ferara Arinan',
                title : 'Technical Lead',
                avatarImage : require('../../assets/images/women/4.jpg')
            },
            {
                userName : 'Gahaua Ulalal',
                title : 'Project Manager',
                avatarImage : require('../../assets/images/men/5.jpg')
            },
            {
                userName : 'Globara Nuno',
                title : 'Program Analyst',
                avatarImage : require('../../assets/images/women/5.jpg')
            },
            {
                userName : 'Giziele Dumbo',
                title : 'UI Architecht',
                avatarImage : require('../../assets/images/men/6.jpg')
            },
            {
                userName : 'Gamalie Tapi',
                title : 'Business Analyst',
                avatarImage : require('../../assets/images/men/7.jpg')
            }
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{height:40,marginVertical:"4%",marginHorizontal:"3%"}}>
              <Image
                  source={require('../../assets/images/app_icon.png')}
                  width={40}
                  height={40}
                  resizeMode={'contain'}
                  style={styles.brandingLogo}
                /> 
              <View>
                <TextInput
                    type={'bordered'}
                    placeholderTextColor={'#cbcbcf'}
                    placeholder = "Search Users" 
                    style={{width:"90%",alignSelf:'flex-end',color:colors.black}}
                />  
                <AntDesign name="closecircle" size={25} color={colors.grey} style={{position:'absolute',right:10,top:8}}/>
              </View>              
          </View>
          <ScrollView style={styles.resultContainer} showsVerticalScrollIndicator={false}>

            {this.state.users.length > 0 && 
                this.state.users.map((sD,sI) => {
                  return(
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Pulse',{ userData : sD })} activeOpacity={1}>
                        <View style={styles.userCard} key={'user_list'+sI}>
                            <View style={{flex:0.15}}>
                                <Image             
                                    source={sD.avatarImage}
                                    width={40}
                                    height={40}
                                    resizeMode={'contain'}
                                    style={styles.avatarImage} />
                            </View>
                            <View style={{flex:0.8}}>
                                <CustomText style={styles.userName}>
                                    {sD.userName}
                                </CustomText>
                                <CustomText style={styles.userTitle}>
                                    {sD.title}
                                </CustomText>
                            </View>
                            <View style={{flex:0.05}}>
                                <Entypo name="chevron-thin-right" size={25} color={colors.primary}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                  )
                })
            }
            {this.state.users.length == 0 && 
              <View style={{flex:1,justifyContent:'center'}}>
                  <LottieView 
                        source={require('../../assets/animations/10687-not-found.json')} 
                        autoPlay 
                        loop
                        style={{
                            height:'75%',
                            width:'100%',
                        }} />
                  <CustomText style={{fontSize:15,alignSelf:'center',position:'absolute',top:'60%'}}>
                        No users found matching the given search criteria
                  </CustomText>
              </View>
            }
          </ScrollView>
      </View>
    );
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

HomeScreen.propTypes = {
  data: PropTypes.object,
  storyIsLoading: PropTypes.bool,
  storyErrorMessage: PropTypes.string,
  fetchStories: PropTypes.func
}

const mapStateToProps = (state) => ({
  data: state.stories.data,
  storyIsLoading: state.stories.storyIsLoading,
  storyErrorMessage: state.stories.storyErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchStories: () => dispatch(HomeScreenActions.fetchStories()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)