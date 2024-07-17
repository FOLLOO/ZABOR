import React, { useEffect } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Main from './pages/unAuth/main/Main'
import Authorization from './pages/unAuth/authorization/Authorization'
import Registration from './pages/unAuth/registration/Registration'
import Temp from './pages/temp/Temp'
import TipTapEditor from './components/temp/TipTapEditor'
import Layout from './components/layouts/Layout'
import TempPAge from './pages/temp/TempPAge'
import CreatePost from './pages/auth/froms/post-create/CreatePost'
import Profile from './pages/auth/profile/Profile'
import MyProfileSettings from './pages/auth/settings/my-profile-settings/MyProfileSettings'
import MySubscribeSettings from './pages/auth/settings/my-subscribe-settings/MySubscribeSettings'
import PlaylistCreate from './pages/auth/froms/playlist-create/PlaylistCreate'
import SelectGroupTagsPage from './pages/auth/froms/select-group-tags/SelectGroupTagsPage'
import SelectTagsPage from './pages/auth/froms/select-tags/SelectTagsPage'
import MyGroupTags from './pages/auth/settings/my-tags/group/MyGroupTags'
import MyTags from './pages/auth/settings/my-tags/tags/MyTags'

import { Provider, useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import store from './redux/store'
import MainAfter from './pages/auth/main/MainAfter'
import { fetchAuth, SelectIsAuth } from './redux/slices/user'
import AuthProvider, { useAuth } from './provider/AuthProvider'
import Market from './pages/auth/market/Market'
import { TagsProvider } from './context/TagsContext'

// axios.defaults.baseURL = 'https://192.168.1.121:5000'
// axios.defaults.withCredentials = true

/** манал это Route перделаай плиз */

function App () {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/settings" element={<Layout type={'settings'}/>}>
              <Route path="/settings/temp" element={<TempPAge/>}/>
              <Route path="/settings/myprofile" element={<MyProfileSettings/>}/>
              <Route path="/settings/mysubs" element={<MySubscribeSettings/>}/>
            </Route>
            <Route path={'/main'} element={<Layout type={'auth'}/>}>
              <Route path="/main" element={<MainAfter/>}/>
            </Route>
            <Route path="/temp" element={<Temp/>}/>
            <Route path="/temp2" element={<TipTapEditor/>}/>

            <Route path="/" element={<Layout type={'notAuth'}/>}>
              <Route path="/" element={<Main/>}/>
            </Route>

            <Route path="/" element={<Layout type={'login'}/>}>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/login" element={<Authorization/>}/>
            </Route>

            <Route path="/" element={<Layout type={'settings'}/>}>
              <Route path={'create/playlist'} element={<PlaylistCreate/>}/>
              <Route path={'my/group'} element={<MyGroupTags/>}/>
              <Route path={'my/tags'} element={<MyTags/>}/>

            </Route>

            <Route path="/" element={<Layout type={'auth'}/>}>
              <Route path="/auth" element={<>auth</>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
              <Route path={'/post/:id'} element={<PlaylistCreate/>}/>
            </Route>
            <Route path="/" element={<Layout type={'form'}/>}>
              <Route path={'/create/post'} element={<CreatePost/>}/>
              <Route path={'/group'} element={<SelectGroupTagsPage/>}/>
              <Route path={'/tags'} element={<SelectTagsPage/>}/>
              <Route path={'/market'} element={<Market/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
