import { Typography } from "@/shared/ui"
import { useEffect } from "react"

export const PaymentSuccess = () => {
  const seconds = 10
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/"
    }, seconds * 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='px-12 py-10 '>
        <div>
          <Typography variant='h2' className='text-primary mb-1'>
            Оплата прошла успешно
          </Typography>
          <Typography variant='h4'>Спасибо за покупку!</Typography>

          <Typography variant='p' className='mt-4 max-w-lg'>
            Ваша подписка должна быть активирована в течение ближайшего времени. Переадресация на
            главную страницу произойдет автоматически через {seconds} секунд. Если этого не
            произошло, пожалуйста, перейдите по <a href='/'>этой ссылке</a>.
          </Typography>

          <Typography variant='small' className='text-gray-500 mt-10 block'>
            В случае возникновения проблем, пожалуйста, свяжитесь с технической поддержкой.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
