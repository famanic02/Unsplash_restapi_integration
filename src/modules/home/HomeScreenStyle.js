import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection:'column',
  },
  resultContainer :  {
    flex:0.90,
    flexDirection:'column',
    paddingHorizontal:"3%",
    paddingTop:"3%",
    backgroundColor:colors.bluish
  },
  brandingLogo:{
    position:'absolute',
    left:"-1%",
    width:40,
    height:40,
    resizeMode:'contain'
  },
  avatarImage:{
    width:40,
    height:40,
    marginRight:10,
    borderRadius:40,
    resizeMode:'contain'
  },
  userName : {
    fontFamily:fonts.primarySemiBold,
    fontSize:18
  },
  userTitle : {
    fontFamily:fonts.primaryLight,
    fontSize:15
  },
  userCard : {
    paddingHorizontal:10,
    paddingVertical:15,
    backgroundColor:colors.white,
    borderRadius:5,
    marginBottom:10,
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    elevation:5
  }

});
export default styles;