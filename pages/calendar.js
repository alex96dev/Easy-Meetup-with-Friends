"use client"
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const fetcher = (url) => fetch(url).then((res) => res.json());
const Calendar = dynamic(() => import('react-calendar'), { ssr: false });
const CalendarPage = () => {
  const { data: activities } = useSWR('/api/activities', fetcher);
  console.log(activities);
  const [value, setValue] = useState(new Date());
  const formattedDate = value.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(formattedDate);
  const handleDateChange = (date) => {
    setValue(date);
    setSelectedDate(date.toISOString().split('T')[0]);
  };
  const countForMarkedDates = (date) => {
    if (!activities) return 0;
    return activities.filter((activity) => activity.date === date.toISOString().split('T')[0]).length;
  };
  const getColorByCat = (Cat) => {
    const colorMap = {
      'Sports': '#ffadad',
      'Food': '#ffd6a5',
      'Culture': '#fdffb6',
    };
    return colorMap[Cat] || '#f0f0f0';
  };
  return (
    <div>
     < h1>Calendar</h1>
     <button onClick={() => window.open('/', '_blank')}>Back to Home</button>
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileContent={({ date, view }) => {
          const count = countForMarkedDates(date);
          return count > 0 ? <MarkedDates>{count < 2 ? 'x'.repeat(count) : 'xx'}</MarkedDates> : null;
        }}
      />
      <h2>Activities for {selectedDate}</h2>
      <ActivityStashes>
        {selectedDate && activities
          .filter((activity) => activity.date === selectedDate)
          .map((activity, index) => (
            <ActivitySpan key={index} color={getColorByCat(activity.category)} key={index}>{activity.name}</ActivitySpan>
          ))}
      </ActivityStashes>
    </div>
  );
};
export default CalendarPage;

const ActivityStashes = styled.div`
background-color: #f5f5f5;
padding: 1rem;
border-radius: 0.5rem;
text-align: center;
`;
const ActivitySpan = styled.span`
background-color: ${props => props.color || '#f0f0f0'}; 
  border-radius: 5px;
  text-align: center;
  display: block;
`;
const MarkedDates = styled.div`
background-color: #f5f5f5;
color: #000f;
`;