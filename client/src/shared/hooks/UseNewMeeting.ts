import axios from "axios";
import { api } from "../services/api";

interface IHandlePostMeetingProps {
  participants: Array<{ id: string | undefined }>;
  startTime: string;
  endTime: string;
}

interface IGetBrokerListDTO {
  id: string;
  givenName: string;
  familyName: string;
}

export const useNewMeeting = () => {
  const postNewMeeting = async ({
    participants,
    startTime,
    endTime,
  }: IHandlePostMeetingProps): Promise<{
    message: string | undefined;
  } | void> => {
    try {
      const newMeeting = await api.post("meetings", {
        participants,
        startTime,
        endTime,
      });
      return newMeeting.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const thisError = error.response?.data;
        return { message: thisError?.message };
      } else {
        console.error("Ocorreu um erro desconhecido:", error);
      }
    }
  };

  const getBrokerList = async (): Promise<
    Array<{ id: string; fullName: string }>
  > => {
    const { data } = await api.get("users/brokers");

    if (!data) return [];

    return data.map((broker: IGetBrokerListDTO) => {
      return {
        id: broker.id,
        fullName: `${broker.givenName} ${broker.familyName}`,
      };
    });
  };

  return { postNewMeeting, getBrokerList };
};
