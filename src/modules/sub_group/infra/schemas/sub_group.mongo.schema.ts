import { Document, model, Schema } from "mongoose";

export interface ISubGroupMongo extends Document {
    _id: number;
    label: string;
    main_sub_group_id: number;
}

const subGroupSchema = new Schema<ISubGroupMongo>({
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
    main_sub_group_id: {
        type: Number
    }
}, {
    timestamps: true,
    id: true
});

const SubGroupModel = model<ISubGroupMongo>('SubGroup', subGroupSchema, 'sub_group');

export default SubGroupModel;