import { api } from "../services/api";

interface MeetingsDTO {
  id: string;
  startTime: string;
  endTime: string;
  participants: ParticipantsDTO[];
}

interface ParticipantsDTO {
  id: string;
  familyName: string;
  givenName: string;
  role: string;
}

export interface TransformToTableData {
  id: string;
  data: string;
  hora: string;
  corretor: string;
}

interface IUseDashboardData {
  transformToTableData: () => Promise<Array<TransformToTableData>>;
  deleteMeeting: (id: string) => void;
}

export const useDashboardData = (): IUseDashboardData => {
  const getMeetings = async () => {
    const { data } = await api.get("meetings");
    return data;
  };

  const transformToTableData = async () => {
    const meetings = await getMeetings();

    if (!meetings) return [];

    return meetings.map((meeting: MeetingsDTO) => {
      const date = meeting.startTime.slice(0, 10);
      const startTime = meeting.startTime.slice(11, 17);
      const endTime = meeting.endTime.slice(11, 17);
      const broker = meeting.participants.find(
        (participant) => participant.role === "broker"
      );
      return {
        id: meeting.id,
        data: date,
        hora: `${startTime} - ${endTime}`,
        corretor: `${broker?.givenName} ${broker?.familyName}`,
      };
    });
  };

  const deleteMeeting = async (id: string) => {
    await api.delete(`meetings/${id}`);
  };

  return { transformToTableData, deleteMeeting };
};
