import { useAuthStore } from "../store/authStore"
const Dashboard = () => {
  const { logout } = useAuthStore();

  return (
    <>
    <nav className='fixed top-0 bg-amber-600 text w-full py-3 px-12 flex items-center justify-between'>
      <a href="#" className='font-bold text-lg text-white'>Navbar</a>

      <div className='flex space-x gap-3'>
        <button>Test</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </nav>
    <div className='text-6xl text-black mt-24 px-12'>Dashboard</div>
  
    </>
    
  )
}

export default Dashboard