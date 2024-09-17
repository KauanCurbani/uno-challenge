import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class History {
  @Field()
  id: string;
  @Field()
  taskId: string;
  @Field()
  type: string;
  @Field()
  date: Date;
}
