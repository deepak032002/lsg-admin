import { useDispatch } from "react-redux";
import { useDataSelector } from "reduxStore/store";

const Dashboard: React.FC = () => {
  const { token } = useDataSelector("auth");

  const dispatch = useDispatch();

  return <div>Dashboard</div>;
};

export default Dashboard;
