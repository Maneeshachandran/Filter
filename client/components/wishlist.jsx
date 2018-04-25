import React, {Component} from 'react';
import { Grid, Segment, Image ,Input,Dropdown,Header,Icon,Button,Divider,Menu,Label, Card} from 'semantic-ui-react';
import AppBar from './AppBar.jsx';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddtoCart from './../../redux/actions/addItem.js'

class WishList extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

render(){
console.log('checking state',this.props.cartDetails.women);
var checked = this.props.cartDetails.women.map((item,key)=>{
  if(item.checked == true){
    console.log('item data',item);
    console.log('details',item.imgurl, '+' , item.name, '+', item.price);
    return(
      // <Grid.Column width={16}>
      //   <Image src={item.imgurl} alt="" />
      //   <div>
      //              <center>
      //               <p className="WomenCategoryWebViewTitle">{item.name}</p>
      //              </center>
      //              <center>
      //                <p className="WomenCategoryWebViewPrice">{item.price}</p>
      //              </center>
      //            </div>
      // </Grid.Column>
      <Grid.Column width={15}>
        {/* <Card style={{width:'100%'}}> */}
          <Grid>
            <Grid.Row/>
            <Grid.Row style={{marginTop:'-3%'}}>

              <Grid.Column width={6}>
                <Card.Content>
                  <Image floated='left' size='small' src={item.imgurl}/>
                </Card.Content>
              </Grid.Column>
              <Grid.Column width={10}>
                <Card.Description>
          {item.name}
        </Card.Description>
              </Grid.Column>
            </Grid.Row>
          </Grid>

    {/* </Card> */}
      </Grid.Column>
    )
  }
})

  return(
    <div style={{overflow:'hidden'}}>
      <AppBar/>
    <Grid centered columns={1}>
      <Grid.Row style={{marginBottom:'15%'}} >
      {checked}
      {/* <Grid.Column width={1}/> */}

      {/* <Grid.Column width={1}/> */}
      </Grid.Row>
    </Grid>
  </div>
  );
}
}

function mapStateToProps(state){
  return {
    cartDetails: state.cartReducer
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    AddtoCart:AddtoCart
  },dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(WishList);
