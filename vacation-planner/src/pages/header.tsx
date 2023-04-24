export default function Header() {
  return (
    <>
        <div className="header-title-ctn">
          <div className="text-center header-title">TravelR</div>
        </div>
        <header>
        <nav>
          <ul className="row nav-ctn">
            <li className="col-sm-3 text-center nav-item"><a className="nav-item"href="./Home">Home</a></li>
            <li className="col-sm-3 text-center nav-item"><a className="nav-item"href="./Planner">Planner</a></li>
            <li className="col-sm-3 text-center nav-item"><a className="nav-item"href="#services">Services</a></li>
            <li className="col-sm-3 text-center nav-item"><a className="nav-item"href="#contact">Contact</a></li>
          </ul>
        </nav>
    </header>
    </>
  )
}