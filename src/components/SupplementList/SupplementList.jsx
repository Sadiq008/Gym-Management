import { useState, useEffect } from "react";
import axios from "axios";

const SupplementList = () => {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://trackapi.nutritionix.com/v2/search/instant",
          {
            headers: {
              "x-app-id": "dd753764",
              "x-app-key": "f137c37dd70c5acad3767049fa14846c",
              "Content-Type": "application/json",
            },
            params: {
              query: "protein powder",
            },
          }
        );
        setSupplements(response.data.branded);
      } catch (error) {
        console.error("Error fetching supplement data:", error);
        setError("Failed to fetch supplement data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error)
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Supplement List
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {supplements.map((supplement) => {
          return (
            <div
              key={supplement.nix_item_id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                margin: "10px",
                width: "200px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "140px", // Set a fixed height for the image container
                  overflow: "hidden", // Prevent overflow
                  backgroundColor: "#f9f9f9", // Light background for the image container
                }}
              >
                <img
                  src={
                    supplement.photo
                      ? supplement.photo.thumb
                      : "https://via.placeholder.com/200"
                  }
                  alt={supplement.food_name}
                  style={{
                    maxWidth: "100%", // Ensure the image does not exceed the container width
                    maxHeight: "100%", // Ensure the image does not exceed the container height
                    objectFit: "contain", // Maintain aspect ratio without cropping
                  }}
                />
              </div>
              <div style={{ padding: "10px" }}>
                <h3 style={{ fontSize: "1.2em", margin: "0", color: "#333" }}>
                  {supplement.food_name}
                </h3>
                <p style={{ color: "#555", margin: "5px 0" }}>
                  {supplement.brand_name}
                </p>
                {/* Removed Add to Cart button */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupplementList;
