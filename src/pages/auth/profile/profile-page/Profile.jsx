import React from 'react'

import UserPosts from '../../../../components/profile/profile-tab-content/user-posts/UserPosts'
import { useSelector } from 'react-redux'


function Profile () {

  const { userData } = useSelector(state => state.userR)


  return (
      <UserPosts data={userData.items.publications} />
  )
}

export default Profile

