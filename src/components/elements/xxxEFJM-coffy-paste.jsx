const EFJM = () => {

  return (
    <>
      <div className="flex relative">
        <div className="bg"></div>
      </div>

      <div className="logoM-container"
      onClick={() => navigate("/")}>
        <img src={logoM} alt="logo" />
      </div>

      <div className="welcome-container">
        <div className="rotate">
          <h1 className="center">Hello, we are "efjm"</h1>
        </div>


        {/* E L E N I */}
        <div className="efjm-scroll-container">
          <div className="card-container">
            <div className="icon-container icon-top bg-gradL flex center">
              <img src={avatar} className="avatar-icon"/>
            </div>
            <div className="member-card bg-oldwhite">
              <h2 className="efjm-h2">Eleni</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consectetur, esse.</p>

              <div className="circle-container flex row">
                <div className="circle bg-gradL center">
                  <a href="https://www.linkedin.com/in/eleniorfanou" target="_blank">
                    <img src={linkedin} className="sm-icon"></img>
                  </a>
                </div>
                <div className="circle bg-gradL center">
                  <a href="https://www.xing.com/profile/eleni_orfanou3/cv" target="_blank">
                    <img src={xing} className="sm-icon"></img>
                  </a>
                </div>
                <div className="circle bg-gradL center">
                  <a href="https://github.com/elenosis" target="_blank">
                    <img src={github} className="sm-icon"></img>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* F L O R I A N */}
          <div className="card-container">
            <div className="icon-container icon-top bg-gradL flex center">
              <img src={avatar} className="avatar-icon"/>
            </div>
            <div className="member-card bg-oldwhite">
              <h2 className="efjm-h2">Florian</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consectetur, esse.</p>

              <div className="circle-container flex row">
                <div className="circle bg-gradL center">
                  <a href="https://github.com/itzFlorian" target="_blank">
                    <img src={github} className="sm-icon"></img>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* J E F F */}
          <div className="card-container">
            <div className="icon-container icon-top bg-gradL flex center">
              <img src={avatar} className="avatar-icon"/>
            </div>
            <div className="member-card bg-oldwhite">
              <h2 className="efjm-h2">Jeff</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consectetur, esse.</p>

              <div className="circle-container flex row">
                <div className="circle bg-gradL center">
                  <a href="https://www.linkedin.com/in/jeff-braun-0959091a4/" target="_blank">
                    <img src={linkedin} className="sm-icon"></img>
                  </a>
                </div>
                <div className="circle bg-gradL center">
                  <a href="https://www.xing.com/profile/Jeff_Braun2/cv" target="_blank">
                    <img src={xing} className="sm-icon"></img>
                  </a>
                </div>
                <div className="circle bg-gradL center">
                  <a href="https://github.com/BreffJaun" target="_blank">
                    <img src={github} className="sm-icon"></img>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* M A R T I N */}
          <div className="card-container">
            <div className="icon-container icon-top bg-gradL flex center">
              <img src={avatar} className="avatar-icon"/>
            </div>
            <div className="member-card bg-oldwhite">
              <h2 className="efjm-h2">Martin</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consectetur, esse.</p>

              <div className="circle-container flex row">
                <div className="circle bg-gradL center">
                  <a href="https://www.linkedin.com/in/martin-gro%C3%9F-003146255/" target="_blank">
                    <img src={linkedin} className="sm-icon"></img>
                  </a>
                </div>
                <div className="circle bg-gradL center">
                  <a href="https://www.xing.com/profile/Martin_Gross14/cv" target="_blank">
                    <img src={xing} className="sm-icon"></img>
                  </a>
                </div>
                <div className="circle bg-gradL center">
                  <a href="https://github.com/grossesbewirken" target="_blank">
                    <img src={github} className="sm-icon"></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
