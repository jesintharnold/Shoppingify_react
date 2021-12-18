const Joi=require('joi');
const getAllItemSchema=Joi.object().keys({
    userID:Joi.string().trim().max(24).required()
});

const addItemSchema=Joi.object().keys({
    name:Joi.string().required(),
    note:Joi.string().trim(),
    imageURL:Joi.string().trim(),
    category:Joi.string().trim().required(),
    userID:Joi.string().trim().max(24).required(),
    categoryID:Joi.string().trim().max(24)
});

const deleteItemSchema=Joi.object().keys({
    categoryID:Joi.string().trim().max(24).required(),
    itemID:Joi.string().trim().max(24).required(),
    userID:Joi.string().trim().max(24).required()
});

const historyCartSchema=Joi.object().keys({
    userID:Joi.string().trim().max(24).required()
});

const postCartSchema=Joi.object().keys({
cartID:Joi.string().trim().max(24),
listName:Joi.string().trim(),
activeList:Joi.boolean().required(),
status:Joi.string(),
userID:Joi.string().trim().max(24).required(),
items:Joi.array().items(Joi.object({
    category_ID:Joi.string().trim().max(24).required(),
    item_ID:Joi.string().trim().max(24).required(),
    quantity:Joi.number().required(),
    checked:Joi.boolean().required()
})).required()
});

module.exports={
    getAllItemSchema,
    addItemSchema,
    deleteItemSchema,
    historyCartSchema,
    postCartSchema
}