import Logout from "./Logout"
import useAuth from "./useAuth"

export const Dashboard = ({code}) => {
  const accessToken = useAuth(code)
  return (
    <> 
    <div>Dashboard</div>
    <div></div>
    <Logout />
    </>
  )
}
