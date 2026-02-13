function NGOCard({ ngo }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px"
    }}>
      <h3>{ngo.name}</h3>
      <p><strong>State:</strong> {ngo.state}</p>
      <p><strong>Service:</strong> {ngo.service}</p>
      <p>{ngo.description}</p>
    </div>
  );
}

export default NGOCard;
