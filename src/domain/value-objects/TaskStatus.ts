export class TaskStatus {
  private readonly validStatuses = ["pending", "in-progress", "completed"];

  constructor(private readonly value: string) {
    if (!this.validStatuses.includes(value)) {
      throw new Error(`Invalid status: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TaskStatus): boolean {
    return this.value === other.getValue();
  }

  toString(): string {
    return this.value;
  }
}
