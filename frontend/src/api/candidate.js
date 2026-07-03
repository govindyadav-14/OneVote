import api from "./axios";

export const getCandidates = () => api.get("/candidate/lists");
export const voteCandidate = (id) => api.post(`/candidate/vote/${id}`);
export const getResults = () => api.get("/candidate/vote/count");

// Admin
export const addCandidate = (data) => api.post("/candidate", data);
 