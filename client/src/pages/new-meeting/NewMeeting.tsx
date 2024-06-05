import { Header } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { decodeToken } from "../../shared/utils";
import { useNewMeeting } from "../../shared/hooks";
import { dateFormatterToDTO } from "../../shared/utils/dateFormatterToDTO";

export const NewMeeting = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [brokerId, setBrokerId] = useState<string>("");
  const [brokerList, setBrokerList] = useState<
    Array<{ id: string; fullName: string }>
  >([]);

  const navigate = useNavigate();
  const { getBrokerList, postNewMeeting } = useNewMeeting();

  useEffect(() => {
    (async () => {
      const brokers = await getBrokerList();
      setBrokerList(brokers);
    })();
  }, []);

  const handleSubmitMeeting = async () => {
    const { startDateAndTime, endDateAndTime } = dateFormatterToDTO(
      date,
      startTime,
      endTime
    );
    const userToken = decodeToken();
    const participants = [{ id: userToken?.id }, { id: brokerId }];

    const postMeeting = await postNewMeeting({
      participants,
      startTime: startDateAndTime,
      endTime: endDateAndTime,
    });

    if (postMeeting?.message) return setErrorMessage(postMeeting.message);
    navigate("/dashboard");
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setBrokerId(event.target.value);
  };

  const enableButton = date && startTime && endTime && brokerId;

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h6">
            Selecione data e horário para a reunião
          </Typography>
          <DatePicker
            value={date}
            onChange={setDate}
            sx={{ minWidth: "90%", mt: 2, backgroundColor: "white" }}
          />
          <Box
            sx={{
              minWidth: "90%",
              flexDirection: "row",
              display: "flex",
              m: 2,
            }}
          >
            <TimePicker
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              sx={{ mr: 2, backgroundColor: "white" }}
            />
            <TimePicker
              value={endTime}
              onChange={setEndTime}
              sx={{ backgroundColor: "white" }}
            />
          </Box>
          <FormControl sx={{ minWidth: "90%" }}>
            <InputLabel id="demo-simple-select-label">Corretor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id={brokerId}
              name={brokerId}
              label="Corretor"
              onChange={handleSelectChange}
              sx={{ backgroundColor: "white" }}
            >
              {brokerList.length > 0 &&
                brokerList.map((broker) => (
                  <MenuItem key={broker.id} value={broker.id}>
                    {broker.fullName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "90%", mt: 3, mb: 2 }}
            onClick={handleSubmitMeeting}
            disabled={!enableButton}
          >
            Criar reunião
          </Button>
          {errorMessage && (
            <Typography color="error" fontSize="0.8rem">
              {errorMessage}
            </Typography>
          )}
          <Typography component="p" color="red" fontSize="0.8rem">
            * Reuniões deverão ter duração mínima de 30 minutos e máxima de 2
            horas.
          </Typography>
        </Box>
      </Container>
    </>
  );
};
