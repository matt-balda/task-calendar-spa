import React, { useState } from 'react';
import axios from 'axios';

const Filter = ({ filter, setFilter, setSort, setTasks }) => {
  const [expanded, setExpanded] = useState(false);
  const [typeDate, setTypeDate] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  
  const handleFilter = async (e) => {
    e.preventDefault();

    const params = {
        period: typeDate,
        date: date
    }

    try {
        const response = await axios.get("http://localhost:3008/tasks/view/day-week-month",{params});
        setAmount(response.data.length)
        setTasks(response.data);
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  return (
    <div className="filter">
      <h2 onClick={() => setExpanded(!expanded)}>Filter ⬇️</h2>
      {expanded && (
        <div className="filter-options">
          <div className="filter-option">
            <p>Status</p>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="complete">Complete</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <div className="filter-option">
            <p>Alphabetical order</p>
            <div>
              <button onClick={() => setSort("Asc")}>Asc</button>
              <button onClick={() => setSort("Desc")}>Dsc</button>
            </div>
          </div>
          <div className="filter-option">
            <p>Date filter</p>
            <div>
              <select value={typeDate} onChange={(e) => setTypeDate(e.target.value)}>
                <option value="" disabled>Type date</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
              <button onClick={handleFilter}>Filter</button>
              <p style={{display: "inline", color: "#6b3da0"}}>{amount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
