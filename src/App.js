import React, { useContext } from 'react'

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

import MainAfter from './pages/auth/main/MainAfter'
import AuthProvider from './provider/AuthProvider'
import Market from './pages/auth/market/Market'
import UserInterstings from './pages/unAuth/registration/userIntretings/select-group-tags/UserInterstings'
import FinilyChoices from './pages/unAuth/registration/userIntretings/select-tags/FinilyChoices'
import { OverlayContext } from './context/OverlayContext'
import MyNotificationsSettings from './pages/auth/settings/my-notifications/MyNotificationsSettings'
import Post from './pages/auth/post/Post'
import ClientError from './pages/404/ClientError'
import CreativeStudio from "./pages/auth/analytics/CreativeStudio";
import PostAnalytics from './pages/auth/analytics/post-analytics/PostAnalytics'
import AvtorAnalytics from './pages/auth/analytics/avtor-analytics/AvtorAnalytics'
import Form from './pages/temp/A-Temp/Form'



// axios.defaults.baseURL = 'https://192.168.1.121:5000'
// axios.defaults.withCredentials = true

/** манал это Route перделаай плиз */

function App () {
  // const { overlay } = useContext(OverlayContext) // overlay находится в layouts
  return (
    <div  className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/settings" element={<Layout type={'settings'}/>}>
              <Route path="/settings/temp" element={<TempPAge/>}/>
              <Route path="/settings/myprofile" element={<MyProfileSettings/>}/>
              <Route path="/settings/mysubs" element={<MySubscribeSettings/>}/>
              <Route path="/settings/mynoti" element={<MyNotificationsSettings/>}/>
              <Route path="/settings/creative_studio" element={<CreativeStudio/>}/>
              <Route path="/settings/post/analytics/" element={<PostAnalytics/>}/>
              <Route path="/settings/post/analytics/:id" element={<PostAnalytics/>}/>

              <Route path="/settings/avtor/analytics" element={<AvtorAnalytics/>}/>
              <Route path="/settings/avtor/analytics/:id" element={<AvtorAnalytics/>}/>
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
              <Route path="/select/tags" element={<UserInterstings/>}/>
              <Route path="/select/creative_tags" element={<FinilyChoices/>}/>
              <Route path="/login" element={<Authorization/>}/>
            </Route>

            <Route path="/" element={<Layout type={'settings'}/>}>
              <Route path={'/create/playlist'} element={<PlaylistCreate/>}/>
              <Route path={'my/group'} element={<MyGroupTags/>}/>
              <Route path={'my/tags'} element={<MyTags/>}/>
            </Route>

            <Route path="/" element={<Layout type={'auth'}/>}>
              <Route path="/auth" element={<>auth</>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
              <Route path={'/post/:id'} element={<Post/>}/>
            </Route>
            <Route path="/" element={<Layout post type={'auth'}/>}>
              <Route path={'/post/:id'} element={<Post/>}/>
            </Route>

            <Route path="/" element={<Layout type={'form'}/>}>
              <Route path={'/create/post'} element={<CreatePost/>}/>
              <Route path={'/group'} element={<SelectGroupTagsPage/>}/>
              <Route path={'/tags'} element={<SelectTagsPage/>}/>
              <Route path={'/market'} element={<Market/>}/>
              <Route path={'/a_temp'} element={<Form/>}/>
            </Route>

            <Route path="*" element={<ClientError/>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
