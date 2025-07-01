import { Outlet } from 'react-router-dom'
import Header from '@/components/organisms/Header'

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout