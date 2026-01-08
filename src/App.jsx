import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase client initialization
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or key is missing! Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [resumeData, setResumeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch resume data from Supabase
  const fetchResume = async () => {
    try {
      const { data, error } = await supabase.from("resume").select("*");
      if (error) {
        console.error("Error fetching resume data:", error.message);
      } else {
        setResumeData(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>My Resume Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : resumeData.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>LinkedIn</th>
              <th>Achievements</th>
            </tr>
          </thead>
          <tbody>
            {resumeData.map((row) => (
              <tr key={row.resume_id}>
                <td>{row.full_name}</td>
                <td>{row.title}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.location}</td>
                <td>
                  <a href={row.linkedin_url} target="_blank">
                    LinkedIn
                  </a>
                </td>
                <td>{row.achievements}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
