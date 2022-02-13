import { useParams } from "react-router-dom";
import React from "react";
import VisualizeSimulated from "../../../templates/VisualizeSimulated";
import Loading from "../../../components/Loading";

export default function UpdateSimulatedPage() {
  const { uuidSimulado } = useParams<{ uuidSimulado: string }>();

  return <VisualizeSimulated uuidSimulado={uuidSimulado} />;
}
