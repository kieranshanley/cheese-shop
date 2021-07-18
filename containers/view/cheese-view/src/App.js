import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { useTable } from 'react-table'
import Table from "./Table";
import "./App.css";

const App = (props) => {
  const [cheese, setCheeseStock] = useState([]);
  const [hasError, setErrors] = useState(false);

  async function fetchData() {
    const res = await fetch("http://localhost:8080/api/cheeseApi/");
    res
      .json()
      .then(res => setCheeseStock(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Colour',
        accessor: 'colour',
      },
      {
        Header: 'Price / Kg',
        accessor: 'pricePerKg',
      },
    ],
    []
  )
  
  return (
    <div className="App">
      <Table columns={columns} data={cheese} />
    </div>
  );

}

render(<App />, document.getElementById("root"));

export default App;