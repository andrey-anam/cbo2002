import { Document, model, Schema } from "mongoose";

export interface IBigGroupMongo extends Document {
    _id: number;
    label: string;
}

const bigGroupMongoSchema = new Schema<IBigGroupMongo>({
    _id: {
        type: Number
    },
    label: {
        type: String,
        required: [
            true,
            'Label is required'
        ]
    }
}, {
    timestamps: true,
    id: true
});

const BigGroupModel = model<IBigGroupMongo>('BigGroup', bigGroupMongoSchema, 'big_group');

export default BigGroupModel;