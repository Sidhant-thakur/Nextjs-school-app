import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get("/api/getSchools").then((res) => {
      setSchools(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          <h1 className="text-center font-bold text-2xl m-3">Schools List</h1>
          <br />
          <Link href="/addSchool">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
              ➕ Add School
            </button>
          </Link>
          <br />
          {schools.map((school) => (
            <div key={school.id} className="card">
              <img src={`/schoolImages/${school.image}`} alt={school.name} />
              <h2>{school.name}</h2>
              <p>
                {school.address}, {school.city}, {school.state}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
