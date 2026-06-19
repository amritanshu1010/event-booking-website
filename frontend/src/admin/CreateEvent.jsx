import { useState } from "react";

function CreateEvent() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("Music");
const [location, setLocation] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [price, setPrice] = useState("");
const [image, setImage] = useState("");
const [organizer, setOrganizer] = useState("");


  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         body: JSON.stringify({
              title,
              description,
              category,
              location,
              date,
              time,
              image,
              price: Number(price),
              organizer,
            }),
            
        }
      );

      const data = await response.json();

      alert("Event Created Successfully!");
      console.log(data);

      setTitle("");
      setDate("");
      setLocation("");
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

return (
  <section
  className="page-card"
  style={{
    maxWidth: "900px",
    margin: "0 auto",
    padding: "32px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  }}
>
   <p
  style={{
    color: "#c814e8",
    fontWeight: "600",
    marginBottom: "8px",
    letterSpacing: "1px",
  }}
>
  EVENT MANAGEMENT
</p>

<h1
  style={{
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#fff",
  }}
>
  Create New Event
</h1>

<p
  style={{
    color: "rgba(255,255,255,0.65)",
    marginBottom: "30px",
    fontSize: "15px",
  }}
>
  Publish and manage experiences for your audience.
</p>

    <form
      className="auth-form"
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
     <div
       style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  }}
      >
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        Event Title

        <input
          style={inputStyle}
           type="text"
           placeholder="Summer Rooftop Night"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
        />
      </label>
    </div>
    <div 
      style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  }}>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        Date

        <input
            style={inputStyle}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        Location

        <input
            style={inputStyle}
            type="text"
            placeholder="City Hall Plaza"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        />
      </label>
    </div>
      {/* Description, category, time, price, image, organizer --- IGNORE --- */}
     <div
       style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    }}>
      <label>
        Description
        <textarea
             style={inputStyle}
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             rows="4"
        />
      </label>
      <label>
        Category
        <select
          style={inputStyle}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Music</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Workshop</option>
          <option>Sports</option>
        </select>
      </label>
      </div>

      <div
        style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  }}>
      <label>
        Time
        <input
          style={inputStyle}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <label>
        Price
        <input
          style={inputStyle}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="4999"
        />
      </label>
      </div>

      <div
        style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}>

      <label>
        Image URL
        <input
          style={inputStyle}
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
        />
      </label>
      {image && (
  <div
    style={{
      marginTop: "20px",
      borderRadius: "16px",
      overflow: "hidden",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <img
      src={image}
      alt="Event Preview"
      style={{
        width: "100%",
        height: "220px",
        objectFit: "cover",
      }}
    />

    <div style={{ padding: "16px" }}>
      <h3 style={{ marginBottom: "8px" }}>
        {title || "Event Title"}
      </h3>

      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          marginBottom: "8px",
        }}
      >
        {location || "Location"}
      </p>

      <p
        style={{
          color: "#c814e8",
          fontWeight: "600",
        }}
      >
        ₹{price || "0"}
      </p>
    </div>
  </div>
)}
      
      <label>
        Organizer
        <input
          style={inputStyle}
          type="text"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          placeholder="EventHub"
        />
      </label>
      </div>
      <button
        type="button"
        className="btn-primary"
        onClick={handleSubmit}
       onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-3px)";
          e.target.style.boxShadow = "0 10px 25px rgba(200,20,232,0.5)";
        }}
       onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "";
        }}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "16px",
          fontWeight: "700",
        }}
      >
        Publish Event
      </button>
    </form>
  </section>
);
}

export default CreateEvent;