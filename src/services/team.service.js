import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "https://footballstats-back.onrender.com";

const teamService = {
  searchTeams: (query) => {
    return axios.get(`${API_URL}/api/teams/search`, {
      params: { name: query },
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
  },

  requestJoinTeam: (teamId) => {
    return axios.post(`${API_URL}/api/teams/${teamId}/request`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
  },

  leaveTeam: () => {
    return axios.post(`${API_URL}/api/teams/leave`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
  },
};

export default teamService;
