import * as uuidv4 from "uuid/v4";

export default class MessageModel {
  public id: string;
  public message: string;
  public userId: string;
  public created: string;

  public constructor(
    message: string,
    userId: string,
    created: string
  ) {
    this.id = uuidv4();
    this.message = message;
    this.userId = userId;
    this.created = created;
  }
}
