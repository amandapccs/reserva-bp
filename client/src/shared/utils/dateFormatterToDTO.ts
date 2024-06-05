import { Dayjs } from "dayjs";

interface IDateFormatterToDTO {
  startDateAndTime: string;
  endDateAndTime: string;
}

export const dateFormatterToDTO = (
  date: Dayjs | null,
  startTime: Dayjs | null,
  endTime: Dayjs | null
): IDateFormatterToDTO => {
  const startTimeFormatted = startTime?.format().slice(11);
  const endTimeFormatted = endTime?.format().slice(11);
  const dateFormatted = date?.format().slice(0, 10);
  const startDateAndTime = `${dateFormatted}T${startTimeFormatted}`;
  const endDateAndTime = `${dateFormatted}T${endTimeFormatted}`;
  return { startDateAndTime, endDateAndTime };
};
