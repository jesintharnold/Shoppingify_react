const Joi=require('joi');
const getAllItemSchema=Joi.object().keys({
    userID:Joi.string().trim().max(24).required()
});

const addItemSchema=Joi.object().keys({
    name:Joi.string().required(),
    note:Joi.string().trim(),
    imageURL:Joi.string().trim(),
    category:Joi.string().trim().required(),
    userID:Joi.string().trim().max(24).required()
});

const deleteItemSchema=Joi.object().keys({
    categoryID:Joi.string().trim().max(24).required(),
    itemID:Joi.string().trim().max(24).required(),
    userID:Joi.string().trim().max(24).required()
});

const historyCartSchema=Joi.object().keys({
    userID:Joi.string().trim().max(24).required()
});



module.exports={
    getAllItemSchema,
    addItemSchema,
    deleteItemSchema,
    historyCartSchema
}