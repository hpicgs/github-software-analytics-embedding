import { useState, useEffect } from "react";

export default function Metrics() {
  const [data, setData] = useState([]);

   const getData = async () => {
    const response = await fetch("test.json")
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Metrics</h1>
      <span>{ data }</span>
    </div>
  );
}
