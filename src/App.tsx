import React, { useState, useEffect, createContext } from 'react';
import './scss/styles.scss'
import Main from './pages/Main';
import NavbarComp from './components/Navbar';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { currentUser } from './state/userSlice'
import { user } from './types';

type appContextType = {
  navToWorkSpace: () => void,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<appContextType>({
  navToWorkSpace: () => { },
  setIsFetching: () => { }
})

export default function App() {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const navigate = useNavigate();
  const currentUser1 = useSelector(currentUser)
  const navToWorkSpace = () => navigate(`user/${currentUser1.id}`, { replace: true });
  const navInit = () => navigate('user', { replace: true })

  const [activeUser, setActiveUser] = useState({
    email: "berioo20003@gmail.com",
    firstName: "Yosef",
    id: "63fb2d871f4ca39432fd455a",
    lastName: "Hershberg",
    registerDate: "2023-02-26T09:59:35.268Z",
    updatedDate: "2023-02-26T09:59:35.268Z",
  })

  useEffect(() => {
    navInit()
    // navToWorkSpace()
  }, []);

  return (
    <div className="app">
      <AppContext.Provider value={{ navToWorkSpace: navToWorkSpace, setIsFetching: setIsFetching }}>
        <NavbarComp isFetching={isFetching} />
        <Main />
      </AppContext.Provider>
    </div>
  )
}