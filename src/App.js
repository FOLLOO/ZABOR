import React from 'react';


import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/unAuth/main/Main'
import Authorization from './pages/unAuth/authorization/Authorization'
import Registration from './pages/unAuth/registration/Registration'
import Temp from './pages/temp/Temp'
import TempEditor from './pages/temp/TempEditor'
import Layout from './components/layouts/Layout'
import TempPAge from './pages/temp/TempPAge'
import CreatePost from './pages/auth/froms/post-create/CreatePost'
import Profile from './pages/auth/profile/Profile'


function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <Routes >
        <Route path="/temp" element={<Temp/>}/>
        <Route path="/temp2" element={<TempEditor/>}/>

        <Route path="/" element={<Layout type={'notAuth'}/>}>
          <Route path="/" element={<Main/>}/>
        </Route>

        <Route path="/" element={<Layout type={'login'}/>}>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/login' element={<Authorization/>}/>
        </Route>

        <Route path="/" element={<Layout type={'settings'}/>}>
          <Route path='/settings' element={<TempPAge/>}/>
        </Route>

        <Route path="/" element={<Layout type={'auth'}/>}>
          <Route path='/auth' element={<>auth</>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
        </Route>

        <Route path="/" element={<Layout type={'form'}/> }>
          <Route path={'create'} element={<CreatePost/>}/>
        </Route>

      </Routes>
      </BrowserRouter>
      {/*<Header/>*/}
      {/*<Main/>*/}
      {/*<Authorization/>*/}
      {/*<Footer/>*/}
    </div>
  );
}

export default App;
