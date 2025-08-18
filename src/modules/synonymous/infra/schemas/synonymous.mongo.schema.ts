import { Document, model, Schema, Types } from "mongoose";

export interface ISynonymousMongo extends Document {
    _id: string;
    label: string;
    occupation_id: number;
}

const synonymousSchema = new Schema<ISynonymousMongo>({
    _id: Types.ObjectId,
    label: {
        type: String,
        required: [
            true,
            'Label is required'
        ]
    },
    occupation_id: {
        type: Number
    }
}, {
    timestamps: true,
    id: true
});

const SynonymousModel = model<ISynonymousMongo>('Synonymous', synonymousSchema, 'synonymous');

export default SynonymousModel;