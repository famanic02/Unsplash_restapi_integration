import { StyleSheet,Dimensions } from 'react-native';
import { fonts, colors } from '../../styles';
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  gridImgContainer: {
    padding: 1,
    backgroundColor: "#CCC"
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.5,
    marginRight: 5
  },
  image: {
    height: width * 0.33,
    width: width * 0.33
  },
  userName : {
    fontFamily:fonts.primaryBold,
    fontSize:18
  },
  userTitle : {
    fontFamily:fonts.primaryLight,
    fontSize:15
  },
});
export default styles;