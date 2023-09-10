import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Success = () => {
  const navigate = useNavigate()
  toast.success("Успех! Ввойдите в систему")
  useEffect(() => {
    navigate("/login")
  }, [])
  return null
}

export default Success
