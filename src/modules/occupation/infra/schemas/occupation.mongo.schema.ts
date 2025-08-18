import { Document, model, Schema } from "mongoose";

export interface IOccupationMongo extends Document {
    _id: number;
    label: string;
    family_id: number;
}

const occupationMongoSchema = new Schema<IOccupationMongo>({
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
    family_id: {
        type: Number
    }
}, {
    timestamps: true,
    id: true
});

const OccupationModel = model<IOccupationMongo>('Occupation', occupationMongoSchema, 'occupation');

export default OccupationModel;