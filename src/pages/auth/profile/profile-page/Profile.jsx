import React, {useEffect} from 'react'

import styles from './profile.module.css'
import UserPosts from '../../../../components/profile/profile-tab-content/user-posts/UserPosts'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getUserData} from '../../../../redux/slices/user'

function Profile () {

  const { id } = useParams()
  const { userData } = useSelector(state => state.userR)
  const dispatch = useDispatch()

  const getUser = () => {
    try {
      dispatch(getUserData(id))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userData.status === 'loaded') return
    getUser()
  }, [userData.status])

  return (
      <UserPosts data={userData.items.publications} />
  )
}

export default Profile

