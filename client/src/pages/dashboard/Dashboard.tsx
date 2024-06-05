import { useEffect, useState } from "react";
import { TransformToTableData, useDashboardData } from "../../shared/hooks";
import { BasicTable, Header } from "../../shared/components";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

export const Dashboard = () => {
  const [meetings, setMeetings] = useState<TransformToTableData[]>([]);
  const { transformToTableData, deleteMeeting } = useDashboardData();

  useEffect(() => {
    (async () => {
      const tableData = await transformToTableData();
      setMeetings(tableData);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteMeeting(id);
    window.location.reload();
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"end"}
          minHeight="20vh"
        >
          <Typography sx={{ mb: 1.5 }} variant="h5">
            Reuniões
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            component={Link}
            to="/new-meeting"
          >
            Nova reunião
          </Button>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center">
          <BasicTable rows={meetings} handleDelete={handleDelete} />
        </Box>
      </Container>
    </>
  );
};
