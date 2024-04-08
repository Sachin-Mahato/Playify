import { useEffect } from "react"
import { getToken } from "../utils/Spotify"

const useAuth = (code) => {
useEffect(() => {
  (async () => {
    await getToken(code)
  })()
},[code])
}

export default useAuth