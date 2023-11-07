import { Typography } from "@/shared/ui"
import React, { lazy, useEffect } from "react"

export const PaymentFailure = () => {
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
          <Typography variant='h2' className='text-red-600 mb-1'>
            Что-то пошло не так
          </Typography>
          <Typography variant='h4'>
            При оплате произошла ошибка. Пожалуйста, попробуйте еще раз.
          </Typography>

          <Typography variant='p' className='mt-4 max-w-lg'>
            Произошла ошибка при оплате. Пожалуйста, попробуйте еще раз или обратитесь в службу
            поддержки. Переадресация на главную страницу произойдет автоматически через {seconds}{" "}
            секунд. Если этого не произошло, пожалуйста, перейдите по <a href='/'>этой ссылке</a>.
          </Typography>

          <Typography variant='small' className='text-gray-500 mt-10 block'>
            В случае возникновения проблем, пожалуйста, свяжитесь с технической поддержкой.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailure
