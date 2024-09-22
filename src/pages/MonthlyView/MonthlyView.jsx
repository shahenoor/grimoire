import * as React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import apiClient from '../../utils/ApiClient';
import './MonthlyView.scss';

async function fetchJobDataForMonth(month) {
  try {
    const data = await apiClient.getJobByMonth(1, month)
    const jobsByDay = data.reduce((acc, item) => {
        acc[item.day] = item.job_count;
        return acc;
    }, {});
    return jobsByDay;
  }
  catch (error) {
    console.error('Error fetching job data:', error);
    return {};
  }
}

const dayColors = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFBD33', '#DAF7A6', 
  '#FFC300', '#581845', '#C70039', '#900C3F', '#FF5733', '#33FF57', 
  '#3357FF', '#FF33A1', '#FFBD33', '#DAF7A6', '#FFC300', '#581845', 
  '#C70039', '#900C3F', '#FF5733', '#33FF57', '#3357FF', '#FF33A1', 
  '#FFBD33', '#DAF7A6', '#FFC300', '#581845', '#C70039', '#900C3F', 
  '#FFC300' 
];


const getColorForDay = (day) => {
  return dayColors[day - 1] || '#CCCCCC'; 
};



function ServerDay(props) {
  const navigate = useNavigate();
  const { jobsByDay = {}, day, outsideCurrentMonth, ...other } = props;
  const badgeColor = getColorForDay(day.date());
  const jobCount = !outsideCurrentMonth && jobsByDay[day.date()] ? jobsByDay[day.date()] : 0;

  const handleNavigation = (day) => {
    const date = day.date();
    const month = day.month() + 1; 
    const year = day.year();

    navigate('/board', {
      state: { date, month, year }
    });
  }

  return (
    <Badge
      badgeContent={jobCount}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: badgeColor, 
          color: 'white',
        },
      }}
      invisible={jobCount === 0} 
      overlap="circular"
    >
      <PickersDay {...other} day={day} outsideCurrentMonth={outsideCurrentMonth} onClick={() => handleNavigation(day)} 
          sx={{ cursor: 'pointer' }}  />
    </Badge>
  );
}

function MonthlyView() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [isLoading, setIsLoading] = React.useState(false);
  const [jobsByDay, setJobsByDay] = React.useState({});

  const fetchJobsForMonth = (month) => {
    setIsLoading(true);
    setJobsByDay({});

    fetchJobDataForMonth(month)
      .then((jobs) => {
        setJobsByDay(jobs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchJobsForMonth(selectedDate.format('YYYY-MM'));
  }, [selectedDate]);

  const handleMonthChange = (newMonth) => {
    setSelectedDate(newMonth);
    fetchJobsForMonth(newMonth.format('YYYY-MM'));
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
            jobsByDay,
          },
        }}
        className="custom-calendar"
      />
    </LocalizationProvider>
  );
}

export default MonthlyView;
