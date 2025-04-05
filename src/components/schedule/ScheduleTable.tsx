import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

interface Schedule {
  id: string;
  date: string;
  time: string;
  student: string;
  subject: string;
  status: "예정" | "완료" | "취소";
}

const mockSchedules: Schedule[] = [
  {
    id: "1",
    date: "2024-03-20",
    time: "14:00",
    student: "김학생",
    subject: "수학",
    status: "예정",
  },
  {
    id: "2",
    date: "2024-03-21",
    time: "16:00",
    student: "이학생",
    subject: "영어",
    status: "예정",
  },
  {
    id: "3",
    date: "2024-03-22",
    time: "15:00",
    student: "박학생",
    subject: "과학",
    status: "예정",
  },
];

export const ScheduleTable = () => {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        이번 달 수업 일정
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>날짜</TableCell>
              <TableCell>시간</TableCell>
              <TableCell>학생</TableCell>
              <TableCell>과목</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>{schedule.time}</TableCell>
                <TableCell>{schedule.student}</TableCell>
                <TableCell>{schedule.subject}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: schedule.status === "예정" ? "info.light" : schedule.status === "완료" ? "success.light" : "error.light",
                      color: schedule.status === "예정" ? "info.dark" : schedule.status === "완료" ? "success.dark" : "error.dark",
                    }}
                  >
                    {schedule.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
