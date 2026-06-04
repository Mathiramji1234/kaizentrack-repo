export interface ScheduleItem {
  id: number;
  title: string;

  startTime: string;
  endTime: string;

  completed: boolean;

  priority:
    | "High"
    | "Medium"
    | "Low";

  repeatType:
    | "once"
    | "daily"
    | "custom";

  days: string[];
}