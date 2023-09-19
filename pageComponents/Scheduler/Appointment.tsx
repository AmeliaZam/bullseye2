import React from 'react';

// @ts-ignore
export default function Appointment({ data }) {
  const { appointmentData } = data;

  return (
    <div>
      <p>{appointmentData.text}</p>
      <p>{appointmentData.number}</p>
      <p>{appointmentData.address}</p>
    </div>
  );
}
