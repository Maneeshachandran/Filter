//Details you need for digital catelogue must be added here in women[]


module.exports = (
  state = {
    purchasedProducts: [],
    cartItems: [],
    cartCount: 0,
      size:'',
    count: 0,
    checked:[],
    women: [
      {
        imgurl: "http://media.wallis.co.uk/wcsstore/Wallis/images/catalog/WL099061006_Zoom_M_1.jpg",
        name: "Mia Beige Dress w/  White Top",
        price: "$24.00",
        checked: false,
        stars:4,
        status:'New',
        color:['White'],
        size:'Medium'
      },
      {
        imgurl: "http://media.wallis.co.uk/wcsstore/Wallis/images/catalog/WL093221124_Zoom_M_1.jpg",
        name: "Amy Classic Short Dress",
        price: "$33.00",
        checked: false,
        stars:2,
        status:'New',
        color:['White','Blue','Pink','Red'],
        size:'Small'
      },
      {
        imgurl: "http://media.wallis.co.uk/wcsstore/Wallis/images/catalog/WL096701003_Zoom_M_1.jpg",
        name: "Sia Dress w/ Pockets",
        price: "$33.00",
        checked: false,
        stars:2,
        status:'Old',
        color:['Grey','White'],
        size:'Medium'
      },
      {
        imgurl: "http://media.wallis.co.uk/wcsstore/Wallis/images/catalog/WL204931121_Zoom_M_1.jpg",
        name: "Myrtle Short Sleeveless Dress",
        price: "$50.40",
        checked: false,
        stars:4,
        status:'New',
        color:['Orange','Black','White'],
        size:'Small'
      },
      {
        imgurl: "http://media.wallis.co.uk/wcsstore/Wallis/images/catalog/WL209012024_Zoom_M_1.jpg",
        name: "Clara Broad Striped Short Dress ",
        price: "$35.00",
        checked: false,
        stars:2,
        status:'Old',
        color:['Black'],
        size:'Large'
      },
      {
        imgurl: "http://media.wallis.co.uk/wcsstore/Wallis/images/catalog/WL259381024_Zoom_M_1.jpg",
        name: "Flora Short Dress",
        price: "$25.00",
        checked: false,
        stars:3,
        status:'New',
        color:['Black','Orange','Red','Pink'],
        size:'Large'
      },
      {
        imgurl: "http://media.wallis.co.uk/wcsstore/Wallis/images/catalog/WL250441024_Zoom_M_1.jpg",
        name: "Navy Detail Top",
        price: "$29.00",
        checked: false,
        stars:4,
        status:'New',
        color:['Blue','White'],
        size:'Small'
      },
      {
        imgurl: "http://media.wallis.co.uk/wcsstore/Wallis/images/catalog/WL259651015_Zoom_M_1.jpg",
        name: "Red LongLine Shirt",
        price: "$19.00",
        checked: false,
        stars:2,
        status:'Old',
        color:['Red'],
        size:'Medium'
      }
    ]
  },
  action
) => {
  switch (action.type) {
    case "addItem":
    console.log('cartarray items',state.cartItems);
    console.log('tsrdfgujhkj',action.item);
      var cartArray = [],
        length = 0,
        itemArray;
      cartArray = state.cartItems;
      //based of product checked status item count are getting added to wish list in appbar
      if(action.item.checked == false){
        console.log('action item checked status',action.item.checked);
        cartArray.push(action.item);
        console.log('legth in cart array ',cartArray);
            length=cartArray.length;
      }
      else{
        // cartArray.push(action.item);
        console.log('inside else',action.item.length);
        cartArray.pop(action.item);
        console.log('legth in inside else cart array ',cartArray);
        length = cartArray.length;
      }

      return{
        purchasedProducts:state.purchasedProducts,
        size:state.size,
        cartCount:state.cartCount,
        cartItems:cartArray,
        count:length,
        women:state.women.map((item,key)=>{
          //based on utem name and checked status item are getting added
          if(item.name == action.item.name && item.checked == false){
            item.checked = true;
            return item;
          } else if(item.name== action.item.name && item.checked == true) {
            item.checked = false;
            return item;
          }
          else {
            return item;
          }
        })
      };
      break;

      case "filterItem":
      console.log('action.item1',action.item1);
      console.log('action.item2',action.item2);
      var products=[];
      action.item1.map((item1)=>{
        if(item1.filtered == false || item1.size == action.item2){
          item1.filtered = true;
          products.push(item1);
        }
        else{
           item1.filtered= false;
        }
      })
      return{
        filteredProducts:products,
        women:state.women,
        cartCount:state.cartCount,
        cartItems:cartArray,
        count:state.count
      };

  }
  return state;
};
