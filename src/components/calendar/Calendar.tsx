import { Box, IconButton, Typography, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <Box sx={{ width: 320, p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1 }}>
        <IconButton onClick={handlePrevMonth}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "bold", flex: 1, textAlign: "center" }}>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ChevronRight />
        </IconButton>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
        {days.map((day) => (
          <Typography
            key={day}
            variant="body2"
            sx={{
              fontWeight: "bold",
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pb: 0.5,
            }}
          >
            {day}
          </Typography>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <Box key={`empty-${index}`} sx={{ height: 48 }} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();

          return (
            <Button
              key={day}
              sx={{
                height: 48,
                minWidth: 0,
                p: 0,
                color: isToday ? "white" : "text.primary",
                bgcolor: isToday ? "primary.main" : "transparent",
                "&:hover": {
                  bgcolor: isToday ? "primary.dark" : "action.hover",
                },
              }}
            >
              {day}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
