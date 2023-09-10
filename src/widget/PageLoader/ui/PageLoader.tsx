export const PageLoader = () => {
  return (
    <div className='w-full h-full fixed inset-0 flex flex-col justify-center items-center z-10 bg-white/50'>
      <div
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  )
}
