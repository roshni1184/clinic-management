import React from "react";
import { useParams } from "react-router-dom";
import PatientNotes from "./shared/PatientNotes";

const PatientNotesWrapper = () => {
  const { id } = useParams(); // userId from URL
  return <PatientNotes userId={id} />;
};

export default PatientNotesWrapper;
