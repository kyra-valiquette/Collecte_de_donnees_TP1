import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({
  collection: 'reviews',
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
      const json = ret as Record<string, unknown>;
      delete json._id;
      delete json.__v;
      return json;
    },
  },
})
export class Review {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, index: true })
  placeId: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
