import React from 'react'

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
import Profile from './pages/auth/profile/profile-page/Profile'
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
// import { OverlayContext } from './context/OverlayContext'
import MyNotificationsSettings from './pages/auth/settings/my-notifications/MyNotificationsSettings'
import Post from './pages/auth/post/Post'
import ClientError from './pages/404/ClientError'
import CreativeStudio from "./pages/auth/analytics/CreativeStudio";
import PostAnalytics from './pages/auth/analytics/post-analytics/PostAnalytics'
import AvtorAnalytics from './pages/auth/analytics/avtor-analytics/AvtorAnalytics'
import Form from './pages/temp/A-Temp/Form'
import UserPosts from "./components/profile/profile-tab-content/user-posts/UserPosts";
import Playlists from "./pages/auth/profile/playlist-page/Playlists";
import AboutMe from "./pages/auth/profile/about/AboutMe";
import Playlist from "./components/post/post-playlist/Playlist";
import Bascet from "./redux/slices/bascet";
import {ProfileLayout} from "./pages/auth/profile/Layout/ProfileLayout";
// import axios from "axios";



// axios.defaults.baseURL = 'http://localhost:5000'
// axios.defaults.withCredentials = true

/** манал это Route перделаай плиз */
/** А может переписать все на Next.js */

function App () {
  // const { overlay } = useContext(OverlayContext) // overlay находится в layouts

  const routingConfig = [
    {
      status: 'not-auth',
      layout: <Layout />,
      navigations: [
        {
          title: 'main',
          url: '',
          component: <Main/>,
          child: [],
        },
        {
          title: 'login',
          component: <Authorization/>,
          url: '/login', // 'login' ?
          child: [],
        },
        {
          title: 'registration',
          url: '/registration',
          component: <Registration/>,
          child: [],
        },
        {
          title: 'select',
          url: '/select',
          component: null,
          child: [
            {
              title: 'tags',
              url: '/tags',
              component: <UserInterstings/>,
              child: []
            },
            {
              title: 'creative_tags',
              url: '/creative_tags',
              component: <FinilyChoices/>,
              child: []
            }
          ]
        }
      ]
    },
    {
      status: 'base',
      url: '',
      layout: <Layout type="base"/>,
      navigations: [
        {
          title: 'profile',
          url: '/profile/:id',
          component: <ProfileLayout/>,
          child: [
            {
              title: '',
              url: '/',
              component: <Profile/>,
              child: [],
            },
            {
              title: 'playlists',
              url: '/playlists',
              component: <Playlists/>,
              child: [],
            },
            // {
            //   title: 'playlistsID',
            //   url: '/playlists/:id',
            //   component: <Playlists/>,
            //   child: []
            // },
            {
              title: 'create',
              url: '/playlist/create',
              component: <PlaylistCreate/>,
              child: []
            },
            {
              title: 'about',
              url: '/about',
              component: <AboutMe/>,
              child: [],
            }
          ]
        },
        {
          title: 'publications',
          url: '/publications',
          component: <MainAfter/>,
          child: [
            {
              title: 'id',
              url: '/:id',
              component: <Post/>,
              child: []
            },
            {
              title: 'create',
              url: '/create',
              component: <CreatePost/>,
              child: []
            }
          ],
        },
        {
          title: 'basket',
          url: '/basket',
          component: <Bascet/>,
          child: [],
        },
      ]
    },

  ]


  // Компонент для рендеринга маршрутов на основе конфигурации
  const renderRoutes = (routes, parentPath = '') => {
    return routes.map((route, index) => {
      const { url, component, child } = route;
      const fullPath = `${parentPath}${url.startsWith('/') ? url : `/${url}`}`;

      // console.log(url, fullPath)

      // Проверяем, есть ли вложенные маршруты
      if (child && child.length > 0) {
        return (
            <Route key={index} path={fullPath} element={component}>
              {renderRoutes(child, url)}
            </Route>
        );
      }
      return <Route key={index} path={fullPath} element={component} />;
    });
  };

  return (
    <div  className="App">
      {/*<BrowserRouter>*/}
      {/*  <AuthProvider>*/}
      {/*    <Routes>*/}
      {/*      <Route path="/settings" element={<Layout type={'settings'}/>}>*/}
      {/*        <Route path="/settings/temp" element={<TempPAge/>}/>*/}
      {/*        <Route path="/settings/myprofile" element={<MyProfileSettings/>}/>*/}
      {/*        <Route path="/settings/mysubs" element={<MySubscribeSettings/>}/>*/}
      {/*        <Route path="/settings/mynoti" element={<MyNotificationsSettings/>}/>*/}
      {/*        <Route path="/settings/creative_studio" element={<CreativeStudio/>}/>*/}
      {/*        <Route path="/settings/post/analytics/" element={<PostAnalytics/>}/>*/}
      {/*        <Route path="/settings/post/analytics/:id" element={<PostAnalytics/>}/>*/}
      {/*        <Route path="/settings/avtor/analytics" element={<AvtorAnalytics/>}/>*/}
      {/*        <Route path="/settings/avtor/analytics/:id" element={<AvtorAnalytics/>}/>*/}
      {/*      </Route>*/}

      {/*      <Route path="/" element={<Layout type={'settings'}/>}>*/}
      {/*        <Route path={'/create/playlist'} element={<PlaylistCreate/>}/>*/}
      {/*        <Route path={'my/group'} element={<MyGroupTags/>}/>*/}
      {/*        <Route path={'my/tags'} element={<MyTags/>}/>*/}
      {/*      </Route>*/}


      {/*      <Route path={'/main'} element={<Layout type={'base'}/>}>*/}
      {/*        <Route path="/main" element={<MainAfter/>}/>*/}
      {/*      </Route>*/}

      {/*      <Route path="/" element={<Layout type={'base'}/>}>*/}
      {/*        <Route path="/auth" element={<>auth</>}/>*/}
      {/*        <Route path="/profile/:id" element={<Profile/>}/>*/}
      {/*        <Route path={'/post/:id'} element={<Post/>}/>*/}
      {/*      </Route>*/}
      {/*      <Route path="/" element={<Layout post type={'base'}/>}>*/}
      {/*        <Route path={'/post/:id'} element={<Post/>}/>*/}
      {/*      </Route>*/}

      {/*      <Route path="/" element={<Layout type={'base'}/>}>*/}
      {/*        <Route path={'/create/post'} element={<CreatePost/>}/>*/}
      {/*        <Route path={'/group'} element={<SelectGroupTagsPage/>}/>*/}
      {/*        <Route path={'/tags'} element={<SelectTagsPage/>}/>*/}
      {/*        <Route path={'/market'} element={<Market/>}/>*/}
      {/*        <Route path={'/a_temp'} element={<Form/>}/>*/}
      {/*      </Route>*/}


      {/*      <Route path="/temp" element={<Temp/>}/>*/}
      {/*      <Route path="/temp2" element={<TipTapEditor/>}/>*/}

      {/*      <Route path="/" element={<Layout type={'notAuth'}/>}>*/}
      {/*        <Route path="/" element={<Main/>}/>*/}
      {/*      </Route>*/}

      {/*      <Route path="/" element={<Layout type={'login'}/>}>*/}
      {/*        <Route path="/registration" element={<Registration/>}/>*/}
      {/*        <Route path="/select/tags" element={<UserInterstings/>}/>*/}
      {/*        <Route path="/select/creative_tags" element={<FinilyChoices/>}/>*/}
      {/*        <Route path="/login" element={<Authorization/>}/>*/}
      {/*      </Route>*/}


      {/*      <Route path="*" element={<ClientError/>} />*/}
      {/*    </Routes>*/}
      {/*  </AuthProvider>*/}
      {/*</BrowserRouter>*/}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {routingConfig.map((routeGroup, index) => (
                <Route
                    key={index}
                    path={routeGroup.url || '/'}
                    element={routeGroup.layout}
                >
                  {renderRoutes(routeGroup.navigations, routeGroup.url || '')}
                </Route>
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
