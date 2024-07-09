import React, { useContext, useEffect, useState } from 'react'
import ContextMenu from '../../components/ temp/ContextMenu'
import InputToggle from '../../components/ui/input/input-toggle/InputCheckbox'
import InputText from '../../components/ui/input/input-text/InputText'
import InputDporDown from '../../components/ui/input/input-dropdown/InputDporDown'
import ProfileCircle from '../../components/profile/profile-circle/ProfileCircle'
import GreenButton from '../../components/ui/buttons/green-button/GreenButton'
import TransprantButton from '../../components/ui/buttons/transprant-button/TransprantButton'
import MessageBox from '../../components/message-box/MessageBox'
import ContextDrop from '../../components/context-drop/ContextDrop'
import ContextGroup from '../../components/context-drop/context-group/ContextGroup'
import WhiteButton from '../../components/ui/buttons/white-button/WhiteButton'


import tempIcon from '../../asserts/icons/Файл.svg'
import temp from '../../asserts/temp/temp.jpg'


import ProfileNickname from '../../components/profile/profile-nickname/ProfileNickname'
import Search from '../../components/layout/search/Search'
import Tab from '../../components/ui/tab/Tab'
import CardLittle from '../../components/post/post-cards/card-little/CardLittle'
import { OverlayContext } from '../../context/OverlayContext'
import RenderType from '../../components/notifications/renderType/RenderType'
import Notification from '../../components/notifications/Notification'
import TagCheckBox from '../../components/ui/input/tag-checkbox/TagCheckBox'

function Temp (props) {

  const [some, setSome] = useState(false)
  const [open, setOpen] = useState(false)

  const items = [
    { title: 'London', content: <MessageBox  type={'sure'}/> },
    { title: 'Paris', content: <MessageBox  type={'help'}/> },
    { title: 'Tokyo', content: <MessageBox  type={'buy'}/> },
  ];



  return (
      <>
        {/*<iframe className="caca"*/}
        {/*        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FhrnNgeaefhJ3iezHPZjqZf%2FZABOR%3Fnode-id%3D0-1%26t%3D55SeVljzuJkIPSiw-1"*/}
        {/*        allowFullScreen></iframe>*/}



        <InputToggle/>
        <InputDporDown/>

        <ProfileCircle size={200}/>


        <GreenButton text={'Добавить'} unique={true} click={() => setSome(!some)}/>
        <TransprantButton text={'Добавить'} />

        {some ?
        <MessageBox visability={true} type={'sure'}/>
        :
          null
        }
  <div style={{margin: 'auto', width: "300px"}}>

        <ContextDrop>
          <ContextGroup>
            <TransprantButton img={tempIcon} text={'Хола епт'} left/>
            <TransprantButton img={tempIcon} text={'Хола епт'} left/>
          </ContextGroup>
          <ContextGroup>
            <TransprantButton img={tempIcon} text={'Хола епт'} left/>
            <TransprantButton img={tempIcon} text={'Хола епт'} left/>
          </ContextGroup>
        </ContextDrop>
  </div>

        <div style={{margin: 'auto', width: "70%"}}>
        <ProfileNickname type={'post'}/>
        </div>
        <div style={{margin: "60px"}}/>
        <div style={{margin: 'auto', width: "70%"}}>
          <Search/>
        </div>
        <div style={{margin: "60px"}}/>

        <div style={{margin: 'auto', width: "70%"}}>

          <Tab items={items} />

        </div>
        <div style={{margin: "60px"}}/>

        <div style={{margin: 'auto', width: "70%"}}>

          <CardLittle title={'HEllo world'} price={1000} views={'1 000 000'} time={' два дня назад'} blur/>

        </div>
        <div style={{margin: "60px"}}/>


        <div style={{margin: 'auto', width: "70%"}}>
          <RenderType postImage={temp} avatar={temp} text={'что то '} views={1000} date={'2 часа назад'}/>
        </div>
        <div style={{margin: 'auto', width: "70%"}}>
        <div style={{margin: "60px"}}/>
          <GreenButton text={'Добавить'} unique={true} click={() => setOpen(!open)}/>
        <div style={{margin: "60px"}}/>
        { open ?
          <div style={{maxWidth: 'fit-content'}}>
          <ContextDrop title={'Уведомления'}>
            <ContextGroup><Notification type={'com'}
                            postName={'Какое то название поста Какое то название постаКакое то название постаКакое то название постаКакое то название постаКакое то название постаКакое то название постаКакое то название постаКакое то название постаКакое то название поста'}
                            nickname={'Антон'}/> </ContextGroup>
            <ContextGroup><Notification type={'new-post'}
                                        postName={'Какое то название поста'}
                                        nickname={'Антон'}/> </ContextGroup>
            <ContextGroup><Notification type={'liked-post'}
                                        postName={'Какое то название поста Какое то название постаКакое то название постаКакое то название постаКакое то название поста'}
                                        nickname={'Антон'}/> </ContextGroup>
            <ContextGroup><Notification type={'deleted-post'}
                                        postName={'Какое то название поста'}
                                        nickname={'Антон'}/> </ContextGroup>
            <ContextGroup><Notification type={'buy-post'}
                                        postName={'Какое то название поста'}
                                        nickname={'Антон'}/> </ContextGroup>
            <ContextGroup><Notification type={'com-post'}
                                        postName={'Какое то название поста Какое то название постаКакое то название постаКакое то название постаКакое то название поста'}
                                        nickname={'Антон'}/> </ContextGroup>
            <ContextGroup><Notification type={'liked-com'}
                                        postName={'Какое то название поста'}
                                        nickname={'Антон'}/> </ContextGroup>
            <ContextGroup><Notification type={'answer-com'}
                                        postName={'Какое то название поста Какое то название постаКакое то название постаКакое то название постаКакое то название постаКакое то название постаКакое то название поста'}
                                        nickname={'Антон'}/> </ContextGroup>
            <ContextGroup><Notification type={'subscribed'}
                                        postName={'Какое то название поста'}
                                        nickname={'Антон'}/> </ContextGroup>

          </ContextDrop>
          </div>

        : null}


        <div style={{margin: "60px"}}/>

          <TagCheckBox/>
          <div style={{margin: "60px"}}/>
        </div>
      </>
  );
}


export default Temp