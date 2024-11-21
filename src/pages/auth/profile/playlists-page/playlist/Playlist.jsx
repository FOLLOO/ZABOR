import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
//utils
import {getPublicationsInFolder} from "../../../../../redux/slices/folder";
import PlaylistsContent from "../../../../../components/post/post-playlist/playlists-content/PlaylistsContent";
import Loading from "../../../../loading/Loading";
export default  function PlaylistPage() {

    const {playlistID} = useParams();
    const dispatch = useDispatch();

    const { dataInFolder } = useSelector(state => state.folder)

    const getPublicationFolder = () => {
        try{
            dispatch(getPublicationsInFolder(playlistID))
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(dataInFolder.status === 'loaded') return
        getPublicationFolder()
    }, []);

    if(dataInFolder.status === 'loading'){
      return <Loading/>
    }

    return(
        <PlaylistsContent data={dataInFolder.items?.data}  folder={dataInFolder?.items}/>
    )

}

