import { SiRedux } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import './Footer.css'

function Footer() {
  return (
    <>
      <div className='footer'>
        <img className='footer-image' src='../../images/footer.png' />
        <div className='footer-heading'>
          <div className="dev-heading" >Developers
            <div className='devs'>
              <div>
                <a href='https://www.linkedin.com/in/carmenshiu/'>
                  <span className="icons">
                    <i className="fa-brands fa-linkedin fa-lg" />
                  </span>
                </a>&nbsp;&nbsp;
                <a href="https://github.com/craftycarmen">
                  <span className="icons">
                    <i className="fa-brands fa-github fa-lg" />
                  </span>
                </a>
                <span className="names">&nbsp;&nbsp;Carmen Shiu</span>
              </div>
              <div>
                <a href='https://www.linkedin.com/in/simon-sammel/'>
                  <span className="icons">
                    <i className="fa-brands fa-linkedin fa-lg" />
                  </span>
                </a>&nbsp;&nbsp;
                <a href="https://github.com/bssammel">
                  <span className="icons">
                    <i className="fa-brands fa-github fa-lg" />
                  </span>
                </a>
                <span className="names">&nbsp;&nbsp;Simon Sammel</span>
              </div>
              <div>
                <a href='https://www.linkedin.com/in/tracey-beard/'>
                  <span className="icons">
                    <i className="fa-brands fa-linkedin fa-lg" />
                  </span>
                </a>&nbsp;&nbsp;
                <a href="https://github.com/traceybee23">
                  <span className="icons">
                    <i className="fa-brands fa-github fa-lg" />
                  </span>
                </a>
                <span className="names">&nbsp;&nbsp;Tracey Beard</span>
              </div>
            </div>
          </div>
          <div className='dev-heading'>Technologies
            <div className='techs'>
              <div className='backend'>
                <a href='https://docs.python.org/3/'>
                  <i className="fa-brands fa-python fa-lg" />
                </a>
                <a href='https://flask.palletsprojects.com/en/3.0.x/'>
                  <img className='flask' src="https://img.icons8.com/ios/50/5F5BA8/flask.png" alt="flask" />
                </a>
                <a className="postgres" href='https://www.postgresql.org/docs/' >
                  <SiPostgresql />
                </a>
                <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'>
                  <i className="fa-brands fa-js fa-lg" />
                </a>
                <a href='https://react.dev/'>
                  <i className="fa-brands fa-react fa-lg" />
                </a>
                <a href='https://redux.js.org/'>
                  <SiRedux />
                </a>
                <a href='https://www.w3.org/Style/CSS/Overview.en.html'>
                  <i className="fa-brands fa-html5 fa-lg"/>
                </a>
                <a href='https://www.w3.org/Style/CSS/Overview.en.html'>
                  <i className="fa-brands fa-css3-alt fa-lg" />
                </a>
              </div>
            </div>
          </div>
          <div className='dev-heading'>Docs
            <div className='docs'>
              <a className="docs-links" href='https://github.com/ballisticbutterflies/The-Paw'>
                Repository
              </a>
              <a className="docs-links" href='https://github.com/ballisticbutterflies/The-Paw/wiki'>
                Wiki
              </a>
              <a className="docs-links" href='https://www.canva.com/design/DAF-sAfmzW0/19OFQL2f7szQz104swZt0w/view?utm_content=DAF-sAfmzW0&utm_campaign=designshare&utm_medium=link&utm_source=editor'>
                Wireframe
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;