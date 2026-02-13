function NGOFilter({ state, setState, service, setService }) {
  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      
      {/* State Filter */}
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">All States</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Delhi">Delhi</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Maharashtra">Maharashtra</option>
      </select>

      {/* Service Filter */}
      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="">All Services</option>
        <option value="Orphanage">Orphanage Support</option>
        <option value="Elderly">Elderly Care</option>
        <option value="Digital">Digital Support</option>
      </select>

    </div>
  );
}

export default NGOFilter;
