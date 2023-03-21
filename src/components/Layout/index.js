import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <>
      <div className="relative bg-gradient-to-r from-black to-slate-900 text-indigo-400">
        <div className="h-full p-6 min-h-screen">
        <Navbar />
        <div className="container pt-6 mx-auto mt-6">
         {children}
          <Footer />
        </div>
        </div>
      </div>
    </>
  )
}

export default Layout;