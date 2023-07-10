import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <div className="relative bg-black text-white font-archivo-regular">
      <div className="h-full p-6 min-h-screen">
        <Navbar />
        <div className="container pt-6 mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;