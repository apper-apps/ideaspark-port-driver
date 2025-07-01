import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Discover from '@/components/pages/Discover'
import Research from '@/components/pages/Research'
import Ideas from '@/components/pages/Ideas'
import Saved from '@/components/pages/Saved'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Discover />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/research" element={<Research />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/saved" element={<Saved />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App