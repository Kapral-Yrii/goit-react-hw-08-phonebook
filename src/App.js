import { Container } from './components/Container/Container';
import { AppBar } from './components/AppBar/AppBar';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomeView = lazy(() => import('./views/HomeView/HomeView'))
const ContactsView = lazy(() => import('./views/ContactsView/ContactsView'))
const RegisterView = lazy(() => import('./views/RegisterView/RegisterView'))
const LoginView = lazy(() => import('./views/LoginView/LoginView'))


function App() {
  
  return (
    <Container>
      <AppBar/>
      <Suspense fallback={'Loading...'}>
        <Routes>
          <Route exact path="/" element={<PublicRoute component={HomeView}/>}/>
          <Route path="/contacts" element={<PrivateRoute component={ContactsView}/>}/>
          <Route path="/login" element={<PublicRoute component={LoginView} restricted/>}/>
          <Route path="/register" element={<PublicRoute component={RegisterView} restricted/>}/>
        </Routes>
      </Suspense>
    </Container>
    )
}

export default App;