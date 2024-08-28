import React from "react";

const UserCard = ({ user, onSelect }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
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
      <button
        onClick={() => onSelect(user)}
        className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
      >
        Add to Team
      </button>
    </div>
  );
};

export default UserCard;
