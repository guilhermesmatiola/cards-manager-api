import Joi from "joi";

const rechargeValue = Joi.object({
    value: Joi.number().greater(0).required(),
});

export default rechargeValue;