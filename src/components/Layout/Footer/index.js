const Footer = () => {
  return (
    <div className="pt-16 text-sm text-center md:text-left fade-in bottom-5 absolute bottom-10">
      <span className="text-gray-500 no-underline hover:no-underline">&copy; App {new Date().getFullYear()} </span>
      - Created by
      <a href="https://maxos.finance/" className="text-gray-500 no-underline hover:no-underline ml-2" target="_blank" rel="noreferrer">
        Maxos Team
      </a>
    </div>
  )
}

export default Footer;