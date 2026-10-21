import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import { RichiedeAccesso, RichiedeGenitore } from './components/RouteGuards.jsx'
import BambinoDetail from './pages/BambinoDetail.jsx'
import Community from './pages/Community.jsx'
import CondizioneDetail from './pages/CondizioneDetail.jsx'
import Condizioni from './pages/Condizioni.jsx'
import Diario from './pages/Diario.jsx'
import Guida from './pages/Guida.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import PostDetail from './pages/PostDetail.jsx'
import Register from './pages/Register.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="guida" element={<Guida />} />
        <Route path="condizioni" element={<Condizioni />} />
        <Route path="condizioni/:id" element={<CondizioneDetail />} />
        <Route path="accedi" element={<Login />} />
        <Route path="registrati" element={<Register />} />

        <Route element={<RichiedeAccesso />}>
          <Route path="community" element={<Community />} />
          <Route path="community/:id" element={<PostDetail />} />
          <Route element={<RichiedeGenitore />}>
            <Route path="diario" element={<Diario />} />
            <Route path="diario/:id" element={<BambinoDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
