import React from 'react'

import UserPosts from '../../../../components/profile/profile-tab-content/user-posts/UserPosts'
import {useSelector} from 'react-redux'
import Loading from "../../../../components/STATUS/loading/Loading";


function Profile () {

  const { userData } = useSelector(state => state.userR)

  if (userData.status === 'loading') return <Loading />

  return (
      <UserPosts data={userData.items.publications} />
  )
}

export default Profile

