import { Document, model, Schema } from "mongoose";

export interface IFamilyMongo extends Document {
    _id: number;
    label: string;
    sub_group_id: number;
}

const familyMongoSchema = new Schema<IFamilyMongo>({
    _id: {
        type: Number
    },
    label: {
        type: String,
        required: [
            true,
            'Label is required'
        ]
    },
    sub_group_id: {
        type: Number
    }
}, {
    timestamps: true,
    id: true
});

const FamilyModel = model<IFamilyMongo>('Family', familyMongoSchema, 'family');

export default FamilyModel;