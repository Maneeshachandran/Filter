import React, {Component} from 'react';
import { Grid, Menu, Icon, Label } from 'semantic-ui-react';
import '../styles/style.css';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

class AppBar extends Component{
  constructor(props){
    super(props);
  }
  render(){
    //console.log('cart count',this.props.cartDetails.count);

    return(
      <div style={{overflow:'hidden'}}>

      <Grid style={{position:'fixed',top:0,zIndex:100,width:'106%'}}>
        <Grid.Row
            only="mobile"
            style={{ paddingBottom: "5%" }}
          >
            <Grid.Column width={16}>

              <Menu secondary style={{backgroundColor:'#DF4B37', color:'#FFFFFF'}}>
                  <Menu.Item style={{color:'#FFFFFF'}}><Icon size="large" name="bars" /></Menu.Item>
                  <Menu.Item name='Aquaberry' style={{color:'white',fontSize:'24px'}}>
                    Aquaberry
                  </Menu.Item>
                  {/* <Menu.Item header id="titleText" style={{fontWeight:'normal', letterSpacing:'3px', textTransform:'capitalize', color:"#FFFFFF", float:"left", fontSize:'140%'}} name='Aquaberry' /> */}
                  <Menu.Menu position='right'>
                    <Link to='/wishlist'>
                    <Menu.Item name="Signin" style={{marginTop:'15%'}}><Icon size="large" name="empty heart" style={{color:'#FFFFFF'}} />
                    <Label color="red" circular style={{position: 'absolute',zIndex: 100, marginTop: '-23%',marginLeft: '25%'}}>{this.props.cartDetails.count}</Label>
                  </Menu.Item>
                  </Link>
                    <Menu.Item name="Signin"><Icon size="large" name="shopping cart" style={{color:'#FFFFFF'}} />
                    <Label color="red" circular style={{position: 'absolute',zIndex: 100, marginTop: '-23%',marginLeft: '25%'}}>0</Label>
</Menu.Item>
                  </Menu.Menu>
              </Menu>
            </Grid.Column>
          </Grid.Row>
    </Grid>
    </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cartDetails: state.cartReducer
  };
}

export default connect(mapStateToProps, null)(AppBar);
