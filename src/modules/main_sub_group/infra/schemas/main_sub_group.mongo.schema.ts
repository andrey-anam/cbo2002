import { Document, model, Schema } from "mongoose";

export interface IMainSubGroupMongo extends Document {
    label: string;
    big_group_id: number;
}

const mainSubGroupMongoSchema = new Schema<IMainSubGroupMongo>({
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
    big_group_id: {
        type: Number
    }
}, {
    timestamps: true,
    id: true
});

const MainSubGroupModel = model<IMainSubGroupMongo>('MainSubGroup', mainSubGroupMongoSchema, 'main_sub_group');

export default MainSubGroupModel;