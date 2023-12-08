import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ walletProps, children }) => {
  return (
    <div className="relative bg-black text-white font-archivo-regular">
      <div className="h-full pt-6 min-h-screen flex flex-col">
        <Navbar walletProps={walletProps} />
        <div className="container sm:pt-6 mx-auto pb-8 flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout;