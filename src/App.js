import { Container } from './components/Container/Container';
import { AppBar } from './components/AppBar/AppBar';
import PrivateRoute from './components/Routes/PrivateRoute';
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
          <Route path="/" element={<HomeView />} />
          <Route path={"/contacts"} element={<PrivateRoute component={ContactsView} />} />
          <Route path="/login" element={<LoginView/>}/>
          <Route path="/register" element={<RegisterView/>}/>
        </Routes>
      </Suspense>
    </Container>
    )
}

export default App;