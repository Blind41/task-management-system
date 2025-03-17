import { TaskStatus } from "../value-objects/TaskStatus";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string;
}

export class Task {
  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _status: TaskStatus;
  private _assignedTo: string;

  constructor(props: TaskProps) {
    this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._status = props.status;
    this._assignedTo = props.assignedTo;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get assignedTo(): string {
    return this._assignedTo;
  }

  updateTitle(title: string): void {
    this._title = title;
  }

  updateDescription(description: string): void {
    this._description = description;
  }

  updateStatus(status: TaskStatus): void {
    this._status = status;
  }

  updateAssignedTo(assignedTo: string): void {
    this._assignedTo = assignedTo;
  }
}
