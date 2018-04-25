import React, {Component} from 'react';
import { Grid, Segment, Image ,Input,Dropdown,Header,Icon,Button,Divider,Menu,Label,Modal,Accordion,Form,Checkbox,Radio,Message} from 'semantic-ui-react';
import AppBar from './AppBar.jsx';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer } from "react-toastr";
import AddtoCart from './../../redux/actions/addItem.js';
import filterItem from './../../redux/actions/filterItem.js';

const sortOptions = [
  {key:'What\'s New' ,text:'What\'s New' ,value:'What\'s New' },
  {key:'By Popularity',text:'By Popularity',value:'By Popularity'},
  {key:'Price - High to Low',text:'Price - High to Low',value:'Price - High to Low'},
  {key:'Price - Low to High',text:'Price - Low to High',value:'Price - Low to High'}
]


var newly =[];
var popularity =[];
var filteredArray =[];
let container;
class WomenCategory extends Component{
  constructor(props){
    super(props);
    this.state={
      open: false,
      sorting:'',
      text:'SORT',
      new:[],
      popularity:[],
      highList:[],
      lowList:[],
      colors:[{
        label:'Red',
        name:'Red',
        value:'red',
        checked:false
      },{
        label:'White',
        name:'White',
         value:'white',
         checked:false
      },{
        label:'Black',
        name:'Black',
         value:'black',
         checked:false
      }],
      size:[{
        label:'Small',
        name:'Small',
         value:'Small'
      },{
        label:'Medium',
        name:'Medium',
         value:'Medium'
      },{
        label:'Large',
        name:'Large',
         value:'Large'
      },{
        label:'X-Large',
        name:'X-Large',
         value:'X-large'
      }],
      filteredArray:[],
      filter:false,
      activeIndex: 0,
      value:'',
      checkedColor:''
    }
    this.applyFilter = this.applyFilter.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open:true});
  }
  handleClose() {
   this.state.colors.map((item,i)=>{
      if(item.checked == true){
        item.checked = false;
      }
    })
    this.setState({filteredArray:[],value:'',colors:this.state.colors});
  }
  handleSize(e,value){
    this.setState({ value:value.value });
  }

  handleClick = (e, titleProps) => {
     const { index } = titleProps
     const { activeIndex } = this.state
     const newIndex = activeIndex === index ? -1 : index
     this.setState({ activeIndex: newIndex })
   }

   getCheckBoxStatus(i, data,item) {
     var checkColor;
     filteredArray = this.state.filteredArray;
     var colors = this.state.colors;
     colors[i].checked = true;
     var listArray = this.props.cartDetails.women.map((item)=>{
          item.filtered = false;
          return item
     });
     if(item.checked == true){
        colors[i].checked = true;
         listArray.map((item1)=>{
           item1.color.map((item2)=>{
             if(item.name == item2){
             filteredArray.push(item1);
           }
           })
       })
       this.setState({filteredArray:filteredArray,colors: colors});
     }else{
       var count=0;
         colors[i].checked = false;
         this.state.filteredArray.map((item1)=>{
           item1.color.map((item2)=>{
             if(item2 == item.name){
               count +=1;
             }
           })
         })
       this.state.filteredArray.map((item1)=>{
         item1.color.map((item2)=>{
           if(item1.color == item.name){
             filteredArray.splice(this.state.filteredArray.indexOf(item1),count);
           }
         })
       })
       this.setState({filteredArray:filteredArray,colors: colors});
     }

   }
   applyFilter(){
     // this is called when all the filters are applied
     var size = this.state.value;
     var filter = this.state.filteredArray;
     //pass value to redux
     this.props.filterItem(filter,size);
     this.setState({filter:true,open:false});
   }
   callAlert(){
     // call when no data found
     container.error(
       `Sorry! No Results Found..!!! ReLoading the page..!!`, ``, {
         timeOut: 30000,
         extendedTimeOut: 10000,
         allowHtml: true,
         closeButton: true,
         })
          // the timeout for the popup
          setTimeout(this.pushtohome, 3000);
   }
   pushtohome() {
     // reloads the page when no results found after applying the filter
   location.reload();
 }
render(){
  // combination of filter and wishlist components
   const { activeIndex } = this.state;
  if(this.state.filter == true){
    // this renders when the filter is applied.
    if(this.props.cartDetails.filteredProducts.length !=0){
      var womanCategory = this.props.cartDetails.filteredProducts.map((item, key) => {
            var iconComponent = item.checked ? (
              <Icon
                name="heart"
                style={{ position: "absolute", top: "8px", right: "16px" }}
                size="large"
                color="red"
                onClick={() => this.props.AddtoCart(item)}
              />
            ) : (
              <Icon
                name="empty heart"
                style={{
                  position: "absolute",
                  color: "red",
                  top: "8px",
                  right: "16px"
                }}
                size="large"
                onClick={() => this.props.AddtoCart(item)}
              />
            );

            return (
              <Grid.Column width={7}>
                <Image src={item.imgurl} alt="" />
                {iconComponent}
                <div>
                  <center>
                    <p className="WomenCategoryWebViewTitle">{item.name}</p>
                  </center>
                  <center>
                    <p className="WomenCategoryWebViewPrice">{item.price}</p>
                  </center>
                </div>
              </Grid.Column>
            );
          });
    }else{
      // this function calls react toastr
      this.callAlert();
    }
  }else{
    var womanCategory = this.props.cartDetails.women.map((item, key) => {
          var iconComponent = item.checked ? (
            <Icon
              name="heart"
              style={{ position: "absolute", top: "8px", right: "16px" }}
              size="large"
              color="red"
              onClick={() => this.props.AddtoCart(item)}
            />
          ) : (
            <Icon
              name="empty heart"
              style={{
                position: "absolute",
                color: "red",
                top: "8px",
                right: "16px"
              }}
              size="large"
              onClick={() => this.props.AddtoCart(item)}
            />
          );

          return (
            <Grid.Column width={7}>
              <Image src={item.imgurl} alt="" />
              {iconComponent}
              <div>
                <center>
                  <p className="WomenCategoryWebViewTitle">{item.name}</p>
                </center>
                <center>
                  <p className="WomenCategoryWebViewPrice">{item.price}</p>
                </center>
              </div>
            </Grid.Column>
          );
        });
  }
    var colorFilter = (this.state.colors.map((item, index) => {
      return(<div>
        <Checkbox style={{marginBottom:'2%'}} checked={item.checked} label={item.label} name={item.name} value={item.value} key={index} onChange={this.getCheckBoxStatus.bind(this,index)} />
      </div>)
    }));
    var sizeFilter =(this.state.size.map((item,index)=>{
      return(<div>
        <Radio style={{marginBottom:'2%'}} label={item.label} name={item.name} value={item.value} checked={this.state.value === item.value} onChange={this.handleSize} />
      </div>)
    })
  )
  return(
    <div style={{overflow:'hidden'}}>
      <AppBar/>
      <Grid>
      <Grid.Row style={{backgroundColor:'#ccced1',color:'black',position:'fixed',top:50,zIndex:'100',marginTop:'0%',width:'100%',marginLeft:'3.5%',height:'6vh'}}>
        <Grid.Column width={1} />
        <Grid.Column width={7}>
          <Dropdown text={this.state.text} options={sortOptions} />
        </Grid.Column>
        <Grid.Column width={7} >
          <h4 style={{textAlign:'right', fontFamily: 'Raleway'}} onClick={this.handleToggle.bind(this)} >REFINE</h4>
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid.Row>
    </Grid>
    <Grid centered columns={2}>
      <Grid.Row style={{marginTop:'25%',marginBottom:'15%'}} >
        {womanCategory}
      </Grid.Row>
    </Grid>
    {/*The below Modal is for the filtering.
        Here only two filters is given.
        To add more filter property <Menu.Item> has to added with increase in index value.
        content is the attribute where you provide values for particular filter property.
       */}
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Modal open={this.state.open} onClose={()=>{this.setState({open:false})}} >
            <Modal.Header style={{background:'#DF4B37',color:'white'}} >
              <center>
                <h2 >Filter</h2>
              </center>
              {/* <Icon size='small' style={{float:'right'}} name='close' onClick={()=>{this.setState({open:false})}}></Icon> */}
            </Modal.Header>
            <Modal.Content scrolling>
              <Accordion as={Menu} vertical style={{width:'26rem'}}>
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 0}
                    content='Size'
                    index={0}
                    onClick={this.handleClick}
                  />
                <Accordion.Content active={activeIndex === 0} content={sizeFilter} />
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                    active={activeIndex === 1}
                    content='Colors'
                    index={1}
                    onClick={this.handleClick}
                  />
                  <Accordion.Content active={activeIndex === 1} content={colorFilter} />
                </Menu.Item>
              </Accordion>
            </Modal.Content>
            <Modal.Actions>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Button.Group attached='bottom'>
                      <Button color='black' style={{background:'#DF4B37',color:'white'}} onClick={this.handleClose}>Clear</Button>
                      <Button style={{border:'1px solid black',color:'#DF4B37'}} onClick={this.applyFilter}>Apply</Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid.Row>
      {/* React toastr - the pop up which appears when no result found after apply the filter */}
      <Grid.Row>
        <Grid.Column width={3}/>
        <Grid.Column width={11}>
          <center>
          <ToastContainer
        ref={ref => container = ref}
      />
      </center>
        </Grid.Column>
        <Grid.Column width={2}/>
      </Grid.Row>
    </Grid>
  </div>
  );
}
}

function mapStateToProps(state){
  return {
    cartDetails: state.cartReducer,
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    AddtoCart:AddtoCart,
    filterItem:filterItem
  },dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(WomenCategory);
