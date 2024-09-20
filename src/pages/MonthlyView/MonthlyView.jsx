import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import './MonthlyView.scss'; 


function fetchHardcodedJobData() {
  return Promise.resolve({
    daysToHighlight: [1, 5, 15],
  });
}

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '📌' : undefined} 
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

function MonthlyView() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchHighlightedDays = () => {
    const controller = new AbortController();
    requestAbortController.current = controller;

    fetchHardcodedJobData({ signal: controller.signal }) 
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Error fetching hardcoded data:', error);
        }
      });
  };

  React.useEffect(() => {
    fetchHighlightedDays(); 
    return () => requestAbortController.current?.abort(); 
  }, []);

  const handleMonthChange = () => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(); 
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate} 
        onChange={handleDateChange} 
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay, 
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
        className="custom-calendar"
      />
    </LocalizationProvider>
  );
}

export default MonthlyView;
