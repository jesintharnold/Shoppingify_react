export const cart_get=async (payload)=>{
    let c=[];
    
    await JSON.parse(JSON.stringify(payload)).cart[0].items.forEach(data=>{
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

   
    return JSON.parse(JSON.stringify(c));
};

export const cart_post=async (data)=>{
let c=[];
await data.forEach(data=>
     data.items.forEach(dat_=>
	 c.push(
	 {
	 category_ID:data.category._Id,
     Item_ID:dat_._Id,
     quantity:dat_.quantity,
     checked:dat_.checked
	 }
	 )
	)
);

return c;
};

export const sort_history=async (payload)=>{

let final_=[];

await payload.forEach(dat=>{
    let DOM=new Date(dat.DateOfCreation).toLocaleString('default', { month: 'long' })+" "+new Date(dat.DateOfCreation).getFullYear();
    let out_=final_.filter(p=>p.DOM===DOM).length;
    if(out_<=0){

        final_.push(
            {
                DOM:DOM.toString(),
                data:[dat]
            }
        );

    }else{
        
        final_.map(p=>{
            if(p.DOM===DOM){
                p.data.push(dat);
            }
        })

    }
});

return final_;
}

export const History_get=async (payload)=>{
    let w=[];
    await JSON.parse(JSON.stringify(payload)).forEach(data=>{
    let o={
	 DateOfCreation:data.DOC,
     Name:data.ListName,
     Status:data.status,
	};
let c=[];
data.items.forEach(dat_=>{
    let Q=c.filter(p=>p.category._Id===dat_.category_ID).length;
    if(Q<=0){
        c.push(
            {
                "category":{
                    "name":dat_.categoryname,
                    "_Id":dat_.category_ID
                },
                "items":[
                    {
                        "name":dat_.ItemName,
                        "quantity":dat_.quantity,
                        "_Id":dat_.Item_ID,
                        "checked":dat_.checked
                    }
                    ]
            })}
    else{
        c.map(p=>{
            if(p.category._Id===dat_.category_ID){
                p.items.push({
                        "name":dat_.ItemName,
                        "quantity":dat_.quantity,
                        "_Id":dat_.Item_ID,
                        "checked":dat_.checked
                })}})};
});
o.cat_item=c;
w.push(o);
});

let oop=await sort_history(w);
return oop;
}