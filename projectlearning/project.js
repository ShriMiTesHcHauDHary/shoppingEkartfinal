//=======================api 1 ===============================

// const parsedAddress = JSON.parse(body.address);
//json.parse :-
// "a common use of json is to exchange the data to/from web server"

// "when receiving data from web Server, the data is always a string"

// parser the data with JSON.parse() and the data become a javascript Object
// const transformedObj1 = JSON.parse('[1,5,{"s":1}]')
  
//   console.log(transformedObj1); 

//   const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
//   console.log(obj);

//bcrypt(npm i bycrpt)
//bcrpyt , scrpyt use slow processing tech to beat hacking
//password made up of 
//prefix/work factor/salt/hash
//salt number must be more than 8 max 12 because it will take more time to generate and make it more complicated
//take a plaintext pasword and creat fingerprint with it this called hashing
//const passwordHash = await bcrypt.hash(body.password, 10);  //12
//body.password = passwordHash

//================================api 2=======================
// const token = jwt.sign(
//     {
//       userId: user._id,
//       iat: Math.floor(Date.now() / 1000),//mill sec to sec
//       exp: Math.floor(Date.now() / 1000) + 60 * 180,//add  60 times and 180 sec which is almost 3 hours
//     },
//     "Group-26"
//   );
//   res.setHeader("Authorization", token);//headers auth authentication method


//=================================api4==========================================
// const updatedUser = await userModel.findOneAndUpdate(
//     { _id: req.userId },
//     newData,
//     { new: true }
//   );

//   if (data.address) {
//     const shipping = data.address.shipping;
//     if (shipping) {
//       if (shipping.street) {
//         updatedUser.address.shipping.street = shipping.street;
//       }
//       if (shipping.city) {
//         updatedUser.address.shipping.city = shipping.city;
//       }
//       if (shipping.pincode) {
//         updatedUser.address.shipping.pincode = shipping.pincode;
//       }
//     }

//     const billing = data.address.billing;
//     if (billing) {
//       if (billing.street) {
//         updatedUser.address.billing.street = billing.street;
//       }
//       if (billing.city) {
//         updatedUser.address.billing.city = billing.city;
//       }
//       if (billing.pincode) {
//         updatedUser.address.billing.pincode = billing.pincode;
//       }
//     }
//   }

//   updatedUser.save();
//if data as an input coming as string from form data first convert it to json.parse  in obj
//then update it one by one with validation with destructing method which help us to update each key because it won't be pssible if done together



//==========================================api 1 product===================================
// if (availableSizes) {
//     if (Array.isArray(isValidSize(availableSizes))) {
//         data.availableSizes = isValidSize(availableSizes)
//     } else {
//         return res.status(400).send({ status: false, message: `size should be one these only ${["S", "XS", "M", "X", "L", "XXL", "XL"]}` })
//     }
// }
//Array.isArray :- inbuit function to find out given data type is array or not
// let ghg = [1,2,3,4,5,6,7,8,9]
// console.log(Array.isArray(ghg));
//const validSize = size.split(",").map(x => x.toUpperCase().trim())
// let size = "x"

//     let check = size.toUpperCase().trim().split(",")
//     // let collection = ["S", "XS", "M", "X", "L", "XXL", "XL"]
//     // if(!check.includes(collection)){
//     //     return false 
//     // }else{
//     //     return check
//     // }
//     console.log(check);
// let validSize = ["S", "XS", "M", "X", "L", "XXL", "XL"]
// let uniqueValidSize = validSize.filter((item,
//     index) => validSize.indexOf(item) === index);
//     console.log(uniqueValidSize);

// let full = [1,2,3,4,5]
// let newjun = [1,2,7]
// for(const i of newjun){
//     let check = full.includes(i) ? `true `+i : `false `+i
//     console.log(check);
// }
//include function
//oldpedestialdata.include(newjuniordata)

//=================================2 api =============================================
//if key is there but with no value inside then delet the key
// for (const [key, value] of Object.entries(data)) {
//     if (key) {
//         if (!value.trim()) {
//             delete data[key];
//         }
//     }
// }


//===============================api 1 cart===========================================
//as input we have userid,productid,quantity,cartid(optional)
//valid userid,productid,quantity(regex)
//make new object fill update in it {
//     userid :id,
//     items :{
//         productid : productid,
//         quantity : quantity(regex)
//     },
//     price :item.price*quantity(regex)
//  }
//cartid valid cart already exist
//findcart cartmodel({id})
//for(let i = 0 ; i<findcart.item;i++)
//if(findcart.items[i].productid == findprodeuctid){
//findcart.item.quantity = quamtity + 1
//findcart.item.price = (finditem.price*q)+finditem.price
// let first ={
//     userid : 12345,
//     items :{
//         productid : 12345,
//         quantity : 0,
//     },
//     price : 100

// }
// let pid = 12345
// let quantity = 1

// for(let i =0;i< first.length;i++){
//     if(first.items.productid === pid){
//         let first1 ={
//             userid : 12345,
//             items :{
//                 productid : 12345,
//                 quantity : quantity,
//             },
//             price : 100*quantity
        
//         }
//         return console.log(first1);

//     }
// }
//============================================api 2========================================
//findcar from cartmodel is permant to reach the doc
//if (removeProduct == 1 && findCart.items[i].quantity > 1) {
//only two condition works here one 
//removed 1 when qantity > 1
//removed 1 when quantity is = 1