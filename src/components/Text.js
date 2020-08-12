import React,{Component} from 'react';
import { 
    Text
}  from 'react-native';

import { fonts, colors } from '../../src/styles';

export default class CustomText extends Component{
    constructor(props){
      super(props);
    }
    
    render(){
      return(
        <Text {...this.props} style={[{fontFamily: fonts.primaryRegular}, this.props.style]}>{this.props.children}</Text>
      )
    }
}

