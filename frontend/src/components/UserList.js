import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    available: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page, search, filters]);

  const fetchUsers = async () => {
    const { domain, gender, available } = filters;
    const { data } = await axios.get("/api/users", {
      params: {
        page,
        search,
        domain,
        gender,
        available,
      },
    });
    setUsers(data.users);
    setTotalPages(data.totalPages);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
    setPage(1);
  };

  const handleSelectUser = (user) => {
    const alreadySelected = selectedUsers.some(
      (selectedUser) => selectedUser.id === user.id
    );

    if (!alreadySelected) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const createTeam = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select users to create a team");
      return;
    }

    const teamName = prompt("Enter the team name:");

    if (!teamName) return;

    try {
      const response = await axios.post("/api/team", {
        name: teamName,
        members: selectedUsers,
      });
      alert("Team created successfully!");
      setSelectedUsers([]);

      navigate(`/team/${response.data._id}`);
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Failed to create the team.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="p-2 border rounded w-full"
        />
        <div className="mt-4">
          <select
            name="domain"
            onChange={handleFilterChange}
            value={filters.domain}
            className="p-2 border rounded"
          >
            <option value="">All Domains</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Management">Management</option>
            <option value="UI Designing">UI Designing</option>
          </select>
          <select
            name="gender"
            onChange={handleFilterChange}
            value={filters.gender}
            className="p-2 border rounded ml-2"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Agender">Agender</option>
            <option value="Bigender">Bigender</option>
          </select>
          <select
            name="available"
            onChange={handleFilterChange}
            value={filters.available}
            className="p-2 border rounded ml-2"
          >
            <option value="">All Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onSelect={handleSelectUser} />
        ))}
      </div>
      <div className="mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white py-1 px-3 rounded ml-2"
        >
          Next
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Selected Users:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedUsers.map((user) => (
            <UserCard key={user.id} user={user} onSelect={() => {}} />
          ))}
        </div>
      </div>

      <button
        onClick={createTeam}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        Create Team
      </button>
    </div>
  );
};

export default UserList;
