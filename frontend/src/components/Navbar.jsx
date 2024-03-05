import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={{boxShadow:"0px 0px 4px grey",backgroundColor:"rgba(95, 95, 95, 0.281"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="/" style={{fontSize:"1.5rem",marginLeft:"10px",fontWeight:"600",fontFamily:"cursive",color:"white",textShadow:"0px 0px 4px black"}}>TaskOn</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active mx-5" aria-current="page" href="/"style={{fontStyle:"italic",fontSize:"1.05rem",fontWeight:"600",color:"white",textShadow:"0px 0px 4px black"}}>Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active mx-5" aria-current="page" href="/"style={{fontStyle:"italic",fontSize:"1.05rem",fontWeight:"600",color:"white",textShadow:"0px 0px 4px black"}}>About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active mx-5" aria-current="page" href="/"style={{fontStyle:"italic",fontSize:"1.05rem",fontWeight:"600",color:"white",textShadow:"0px 0px 4px black"}}>Complaint</a>
        </li>
        

      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
