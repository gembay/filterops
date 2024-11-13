import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const RoomFilter = () => {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    area: "",
    water_daily: null,
    price: "",
  });

  // List of areas and water availability options
  const areas = [
    { value: "kay", label: "Kayole" },
    { value: "buru", label: "Buruburu" },
    { value: "lucky", label: "LuckySummer" },
    { value: "kan", label: "Kangemi" },
    { value: "baba", label: "Babadogo" },
  ];

  const waterOptions = [
    { value: true, label: "Has Water Daily" },
    { value: false, label: "No Water Daily" },
  ];

  // Fetch rooms when filters change
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let query = `?`;

        // Add filters to the query string
        if (filters.area) query += `area=${filters.area}&`;
        if (filters.water_daily !== null) query += `water_daily=${filters.water_daily}&`;
        if (filters.price) query += `price=${filters.price}&`;

        // Remove the trailing '&' if any
        query = query.slice(0, -1);

        // Call the backend API
        const response = await axios.get(`http://127.0.0.1:8000/api/accounts${query}`);
        setRooms(response.data.rooms); // Update the rooms state with filtered data
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [filters]); // Re-run the effect when filters change

  // Handle changes in filters
  const handleAreaChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      area: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleWaterChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      water_daily: selectedOption ? selectedOption.value : null,
    }));
  };

  const handlePriceChange = (event) => {
    setFilters((prev) => ({ ...prev, price: event.target.value }));
  };

  return (
    <div>
      <h1>Available Rooms</h1>

      <div className="filters">
        {/* Area filter */}
        <Select
          options={areas}
          onChange={handleAreaChange}
          placeholder="Select Area"
        />

        {/* Water availability filter */}
        <Select
          options={waterOptions}
          onChange={handleWaterChange}
          placeholder="Select Water Availability"
        />

        {/* Price filter */}
        <input
          type="number"
          value={filters.price}
          onChange={handlePriceChange}
          placeholder="Max Price"
        />
      </div>

      <ul>
        {rooms.length === 0 ? (
          <p>No rooms available with these filters.</p>
        ) : (
          rooms.map((room) => (
            <li key={room.id}>
              <h3>{room.name}</h3>
              <p>Price: {room.price}</p>
              <p>Area: {room.area}</p>
              <p>{room.has_water_daily ? "Has Water Daily" : "No Water Daily"}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RoomFilter;
