import React from "react";
import { api } from "y/utils/api";

const Dashboard = () => {
  const { data: request } = api.user.getRequest.useQuery();
  console.log(request);
  return <div>Dashboard</div>;
};

export default Dashboard;
