import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://team-of-users.onrender.com";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamDetails();
  }, [id]);

  const fetchTeamDetails = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/team/${id}`);
    setTeam(data);
  };

  if (!team) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 bg-white py-4">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-200 hover:bg-indigo-300 text-white py-2 px-4 rounded-md mb-4 text-black"
        >
          Back to Home
        </button>

        <h1 className="text-2xl mb-4">Team {team.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-8">
        {team.members.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 mb-4"
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h2 className="text-lg font-semibold">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">Domain: {user.domain}</p>
            <p className="text-sm text-gray-600">
              Available: {user.available ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
