import { LogoExpanded, Typography } from "@/shared/ui"
import styles from "./Signup.module.css"
import { Link } from "react-router-dom"
import { SignupForm } from "./SignupForm/SignupForm"

const Signup = () => {
  return (
    <div className={styles.Signup}>
      <div className={styles.title}>
        <Typography variant='h1' className='mr-4'>
          Добро пожаловать в
        </Typography>
        <LogoExpanded className='mt-2' />
      </div>
      <Typography variant='p' as='h2' className='mt-4 text-center max-w-md mx-auto'>
        Уже есть аккаунт? Тогда проосто <Link to='/login'>войдите</Link> в систему. Если нет, то
        зарегистрируйтесь
      </Typography>
      <div className={styles.formWrapper}>
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup
