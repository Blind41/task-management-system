import { TaskStatus } from "../value-objects/TaskStatus";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: TaskStatus; // Usamos el Value Object
  assignedTo: string; // User ID
}

export class Task {
  constructor(private props: TaskProps) {}

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get assignedTo(): string {
    return this.props.assignedTo;
  }

  updateStatus(status: TaskStatus): void {
    this.props.status = status;
  }
}
