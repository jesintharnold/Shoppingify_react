let c=[];
let A={
    "_id" : `ObjectId("61b5b1a4acc90fa39ebac276")`,
    "user_ID" : `ObjectId("619a5bd0a01ef280b3b92bd4")`,
    "status" : "completed",
    "DOC" : 'ISODate("2021-12-06T17:04:33.594Z")',
    "ListName" : "Euro`s list",
    "items" : [ 
        {
            "category_ID" :`ObjectId("61acd315ad7a52ad882a9f6b")`,
            "categoryname" : "Vegan's",
            "ItemName" : "Umberlla",
            "checked" : false,
            "quantity" : 1.0,
            "Item_ID" : `ObjectId("61acd315240efab43ce18fb8")`
        }, 
        {
            "category_ID" : `ObjectId("61ace482ad7a52ad882aa3aa")`,
            "categoryname" : "Non-veg",
            "ItemName" : "ChickenLeg",
            "checked" : false,
            "quantity" : 1.0,
            "Item_ID" : `ObjectId("61ace639fb926b664a9f8182")`
        }, 
        {
            "category_ID" : `ObjectId("61ace482ad7a52ad882aa3aa")`,
            "categoryname" : "Non-veg",
            "ItemName" : "Chicken Soup",
            "checked" : false,
            "quantity" : 1.0,
            "Item_ID" : `ObjectId("61ace482256ebf05f3150904")`
        }
    ]
};

A.items.forEach(data=>{
    let Q=c.filter(p=>p.category._Id===data.category_ID).length;
    if(Q<=0){
        c.push(
            {
                "category":{
                    "name":data.categoryname,
                    "_Id":data.category_ID
                },
                "items":[
                    {
                        "name":data.ItemName,
                        "quantity":data.quantity,
                        "_Id":data.Item_ID,
                        "checked":data.checked
                    }
                    ]
            })}
    else{
        c.map(p=>{
            if(p.category._Id===data.category_ID){
                p.items.push({
                     "name":data.ItemName,
                        "quantity":data.quantity,
                        "_Id":data.Item_ID,
                        "checked":data.checked
                })}})};
});

let category;
let B=[];
category.forEach(data=>{
data.items.forEach(dat=>B.push(
{
     "category_ID" :data.category.category_ID,
     "Item_ID" :dat.Item_ID,
     "quantity" : dat.quantity,
     "checked" : dat.checked
}
));
});

// if (ID null){}
// else update all username with active_list to false
//


// {
//     "_id":`ObjectId("61b5b1a4acc90fa39ebac276")`,
//     "ListName":"Euro`s list",
//     "Active_list":true,
//     "DOC":ISODate("2021-12-06T17:04:33.594Z"),
//     "status":"completed",
//     "User_ID":ObjectId("619a5bd0a01ef280b3b92bd4")
// }

// again change array to []