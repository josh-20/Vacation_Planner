

export default function Header() {
  return (
    <>
        <div><h1 className="text-center header-title">TravelR</h1></div>
        <header>
        <nav>
          <ul className="row nav-ctn">
            <li className="col-sm-3 text-center home"><a className="home"href="#home">Home</a></li>
            <li className="col-sm-3 text-center about"><a className="about"href="#about">About</a></li>
            <li className="col-sm-3 text-center services"><a className="services"href="#services">Services</a></li>
            <li className="col-sm-3 text-center contact"><a className="contact"href="#contact">Contact</a></li>
          </ul>
        </nav>
    </header>
    </>
  )
}