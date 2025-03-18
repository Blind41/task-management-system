export interface UserModel {
  id: string;
  name: string;
  createdAt: Date;
}

export class User {
  private readonly _id: string;
  private _name: string;
  private readonly _createdAt: Date;

  constructor(userModel: UserModel) {
    this._id = userModel.id;
    this._name = userModel.name;
    this._createdAt = userModel.createdAt;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  updateName(name: string): void {
    this._name = name;
  }
}
