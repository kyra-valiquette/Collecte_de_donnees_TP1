import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlaceDocument = HydratedDocument<Place>;

@Schema({
  collection: 'places',
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
export class Place {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, index: true })
  category: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [String], default: [] })
  services: string[];

  @Prop({ required: true, default: 'ACTIVE' })
  status: string;

  @Prop({ type: Number, default: null, nullable: true })
  averageRating: number | null;

  @Prop({ type: Number, default: 0 })
  reviewCount: number;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
