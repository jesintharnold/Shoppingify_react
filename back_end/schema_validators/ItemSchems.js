const Joi=require('joi');
const getAllItemSchema=Joi.object().keys({
    userID:Joi.string().trim().max(24).required()
});

const addItemSchema=Joi.object().keys({
    name:Joi.string().required(),
    note:Joi.string().trim().allow('').optional(),
    imageURL:Joi.string().trim().allow('').optional(),
    category:Joi.string().trim().required(),
    userID:Joi.string().trim().max(24).required(),
    categoryID:Joi.string().trim().max(24).allow('').optional()
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
cartID:Joi.string().trim().allow('').allow(null).max(24).optional(),
listName:Joi.string().trim().optional(),
status:Joi.string().required(),
userID:Joi.string().trim().max(24).required(),
items:Joi.array().items(Joi.object({
    category_ID:Joi.string().trim().max(24).required(),
    Item_ID:Joi.string().trim().max(24).required(),
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