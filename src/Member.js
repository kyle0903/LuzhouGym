import React, { useRef } from "react";
import { useParams } from "react-router-dom";

function Member() {
  const { id } = useParams();

  return <div>{id}</div>;
}

export default Member;
