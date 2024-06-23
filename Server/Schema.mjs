import { Schema} from "mongoose";
export const TransactionSchema = new Schema({
    id:Schema.Types.Number,
    title: Schema.Types.String,
    price: Schema.Types.Number,
    description: Schema.Types.String,
    category: Schema.Types.String,
    image: Schema.Types.String,
    sold: Schema.Types.Boolean,
    month:Schema.Types.Number
});