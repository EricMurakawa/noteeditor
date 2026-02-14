export default function LoadingBar() {
  return (
    <div className='w-full h-1 -mt-1 bg-gray-200 overflow-hidden'>
      <div
        className='h-full bg-blue-500'
        style={{
          animation: 'loadingBar 1.2s ease-in infinite',
        }}
      />
    </div>
  )
}
