import React from 'react'

import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Main from './pages/unAuth/main/Main'
import Authorization from './pages/unAuth/authorization/Authorization'
import Registration from './pages/unAuth/registration/Registration'
import Layout from './components/layouts/Layout'
import CreatePost from './pages/auth/froms/post-create/CreatePost'
import Profile from './pages/auth/profile/profile-page/Profile'
import MyProfileSettings from './pages/auth/settings/my-profile-settings/MyProfileSettings'
import MySubscribeSettings from './pages/auth/settings/my-subscribe-settings/MySubscribeSettings'
import PlaylistCreate from './pages/auth/froms/playlist-create/PlaylistCreate'

import Publications from './pages/auth/main/Publications'
import AuthProvider  from './provider/AuthProvider'
import Market from './pages/auth/market/Market'
import MyNotificationsSettings from './pages/auth/settings/my-notifications/MyNotificationsSettings'
import Post from './pages/auth/post/Post'
import CreativeStudio from "./pages/auth/analytics/CreativeStudio";
import Playlists from "./pages/auth/profile/playlists-page/Playlists";
import AboutMe from "./pages/auth/profile/about-page/AboutMe";
import {ProfileLayout} from "./pages/auth/profile/Layout/ProfileLayout";
import ClientError from "./pages/404/ClientError";
import SetUserInteresting from "./pages/unAuth/registration/userIntretings/group/SetUserInteresting";
import FinalChoices from "./pages/unAuth/registration/userIntretings/tags/FinalChoices";
import BecomeAuthorGroup from "./pages/auth/profile/become-author/group/BecomeAuthorGroup";
import BecomeAuthorCreativeTags from "./pages/auth/profile/become-author/tags/BecomeAuthorCreativeTags";
import PlaylistPage from "./pages/auth/profile/playlists-page/playlist/Playlist";
import MyGroupTags from "./pages/auth/settings/my-tags/group/MyGroupTags";
import MyTags from "./pages/auth/settings/my-tags/tags/MyTags";
import AuthorGroupTags from "./pages/auth/settings/author-tags/group/AuthorGroupTags";
import AuthorTags from "./pages/auth/settings/author-tags/tags/AuthorTags";
import MobileSearching from "./pages/auth/mobile-search/MobileSearching";
// import axios from "axios";


// axios.defaults.baseURL = 'http://localhost:5000'
// axios.defaults.withCredentials = true

/** манал это Route перделаай плиз */
/** А может переписать все на Next.js */

function App() {
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
            ]
        },
        {
            status: "login",
            layout: null,
            navigations: [
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
                            title: 'group_tags',
                            url: '/group_tags',
                            component: <SetUserInteresting/>,
                            child: []
                        },
                        {
                            title: 'tags',
                            url: '/tags',
                            component: <FinalChoices/>,
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
                        {
                            title: 'create',
                            url: '/playlists/create',
                            component: <PlaylistCreate/>,
                            child: []
                        },
                        {
                            title: 'playlistID',
                            url: '/playlist/:playlistID',
                            component: <PlaylistPage/>,
                            child: [],
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
                    url: '/publications/:group',
                    component: <Publications/>,
                    child: []
                },
                {
                    title: 'publications',
                    url: '/publications',
                    component: <Publications/>,
                    child: []
                },
                {
                    title: 'id',
                    url: '/publication/:id',
                    component: <Post/>,
                    child: []
                },
                {
                    title: 'create',
                    url: '/publications/create',
                    component: <CreatePost/>,
                    child: []
                },
                {
                    title: 'basket',
                    url: '/basket',
                    component: <Market/>,
                    child: [],
                },
                {
                    title: 'author',
                    url: '/select/author',
                    component: null,
                    child: [
                        {
                            title: 'group_tags',
                            url: '/group_tags',
                            component: <BecomeAuthorGroup/>,
                            child: []
                        },
                        {
                            title: 'tags',
                            url: '/tags',
                            component: <BecomeAuthorCreativeTags/>,
                            child: []
                        }
                    ]

                },
                {
                    title: 'search',
                    url: '/search',
                    component: <MobileSearching/>,
                    child: [],
                }
            ]
        },
        {
            status: "settings",
            url: '/settings',
            layout: <Layout type="settings"/>,
            navigations: [
                {
                    title: '',
                    url: '/',
                    component: <CreativeStudio/>,
                    child: [],
                },
                {
                    title: 'config',
                    url: '/config',
                    component: <MyProfileSettings/>,
                    child: [],
                },
                {
                    title: 'notifications',
                    url: '/notifications',
                    component: <MyNotificationsSettings/>,
                    child: [],
                },
                {
                    title: 'subscribes',
                    url: '/subscribes',
                    component: <MySubscribeSettings/>,
                    child: [],
                },
                {
                    title: 'group',
                    url: '/group',
                    component: <MyGroupTags/>,
                    child: []
                },
                {
                    title: 'tags',
                    url: '/tags',
                    component: <MyTags/>,
                    child: []
                },
                {
                    title: 'author_group',
                    url: '/author/group',
                    component: <AuthorGroupTags/>,
                    child: []
                },
                {
                    title: 'author_tags',
                    url: '/author/tags',
                    component: <AuthorTags/>,
                    child: []
                }
            ]
        }
    ]


    // Компонент для рендеринга маршрутов на основе конфигурации
    const renderRoutes = (routes, parentPath = '') => {
        return routes.map((route, index) => {
            const {url, component, child} = route;
            const fullPath = `${parentPath}${url.startsWith('/') ? url : `/${url}`}`;

            // Проверяем, есть ли вложенные маршруты
            if (child && child.length > 0) {
                return (
                    <Route key={index} path={fullPath} element={component}>
                        {renderRoutes(child, url)}
                    </Route>
                );
            }
            return <Route key={index} path={fullPath} element={component}/>;
        });
    };

    return (
        <div className="App">
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
                        <Route path="*" element={<ClientError/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
