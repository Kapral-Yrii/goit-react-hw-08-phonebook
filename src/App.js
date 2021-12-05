import { Container } from './components/Container/Container';
import { AppBar } from './components/AppBar/AppBar';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from './redux/auth/auth-selectors'
import { useCurrentUserMutation } from './redux/authAPI'
import Loader from "react-loader-spinner"
import * as actions from './redux/auth/auth-actions'
import s from './App.module.css'

const HomeView = lazy(() => import('./views/HomeView/HomeView'))
const ContactsView = lazy(() => import('./views/ContactsView/ContactsView'))
const RegisterView = lazy(() => import('./views/RegisterView/RegisterView'))
const LoginView = lazy(() => import('./views/LoginView/LoginView'))
const PageNotFound = lazy(() => import('./views/PageNotFound/PageNotFound'))


function App() {
  const token = useSelector(getToken)
  const dispatch = useDispatch()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [getCurrentUser] = useCurrentUserMutation()

  const refreshCurrentUser = useCallback(async () => {
    try {
      setIsRefreshing(true)
      const response = await getCurrentUser(token)
      dispatch(actions.user(response.data))
      dispatch(actions.isLoggedIn(true))
      setIsRefreshing(false)
    } catch (error) {
      setIsRefreshing(false)
      console.log(error);
    }
  }, [dispatch, getCurrentUser, token])

  useEffect(() => {
    if (!token) {
      return
    }
    refreshCurrentUser()
  }, [dispatch, getCurrentUser, refreshCurrentUser, token])

  return (
    <>
      {!isRefreshing &&
        <Container>
          <AppBar />
          <Suspense fallback={<div className={s.loader}><Loader type="Oval" color="#1976d2" height={50} width={50}/></div>}>
            <Routes>
              <Route exact path="/" element={<PublicRoute component={HomeView} />} />
              <Route path="/contacts" element={<PrivateRoute component={ContactsView} navigateTo="/login" />} />
              <Route path="/login" element={<PublicRoute component={LoginView} restricted navigateTo="/contacts" />} />
              <Route path="/register" element={<PublicRoute component={RegisterView} restricted navigateTo="/contacts" />} />
              <Route path="*" element={<PublicRoute component={PageNotFound} />}/>
            </Routes>
          </Suspense>
        </Container>}
      </>
    )
}

export default App;