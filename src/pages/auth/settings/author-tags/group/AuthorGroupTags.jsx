import React, {useEffect} from 'react'

// import styles from './my-group-tags.module.css'
import global from '../../../../../global.module.css'
import BackCreate from '../../../../../components/toolbar/backCreate-toolbar/BackCreate'
import SelectGroupTags from '../../../../../components/settings/GroupTags/SelectGroupTags'
import {useDispatch, useSelector} from "react-redux";
import {userInterests} from "../../../../../redux/slices/tag";

function AuthorGroupTags () {
    const dispatch = useDispatch()
    const {groupIds} = useSelector(state=> state.allTags.userTags.items)
    const getUserInterstes = () => {
        try {
            dispatch(userInterests())
        }catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
      getUserInterstes()
    }, []);

  return (
    <div className={global.padLeft}>
      <BackCreate />
      <SelectGroupTags type={'user-update-author'} data={groupIds} />
    </div>
  )
}

export default AuthorGroupTags