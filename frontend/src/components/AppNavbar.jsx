import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { RUOLO_GENITORE } from '../utils/constants.js'
import Logo from './Logo.jsx'

export default function AppNavbar() {
  const { utente, esci } = useAuth()
  const navigate = useNavigate()
  const eGenitore = utente?.ruolo === RUOLO_GENITORE

  function uscita() {
    esci()
    navigate('/')
  }

  return (
    <Navbar expand="md" className="pc-nav" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/" className="pc-brand me-md-4">
          <Logo />
          Percorsi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principale" aria-label="Apri il menu" />
        <Navbar.Collapse id="menu-principale">
          <Nav className="me-auto">
            {eGenitore && (
              <Nav.Link as={NavLink} to="/diario" eventKey="diario">
                Diario
              </Nav.Link>
            )}
            {utente && (
              <Nav.Link as={NavLink} to="/community" eventKey="community">
                Community
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/condizioni" eventKey="condizioni">
              Condizioni
            </Nav.Link>
            <Nav.Link as={NavLink} to="/guida" eventKey="guida">
              Guida
            </Nav.Link>
          </Nav>
          <Nav className="align-items-md-center gap-md-2 mt-2 mt-md-0">
            {utente ? (
              <>
                <span className="pc-nav-user me-md-2">Ciao, {utente.nome}</span>
                <Button variant="outline-primary" size="sm" onClick={uscita}>
                  Esci
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/accedi" eventKey="accedi">
                  Accedi
                </Nav.Link>
                <Button as={Link} to="/registrati" variant="primary" size="sm">
                  Crea un account
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
