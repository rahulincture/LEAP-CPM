import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Header from './component/Header'
import EmpAssignment from './component/EmpAssignment'
import Signin from './pages/Sigin'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path={'/'} element={<Signin />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/sign-in'} element={<Signin />} />
        <Route path={'/sign-up'} element={<Signup />} />
        <Route path={'/check'} element={<EmpAssignment />} />
      </Routes>
    </>
  )
}

export default App
