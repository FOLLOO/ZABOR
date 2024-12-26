import React from 'react';
import {Link, useNavigate} from "react-router-dom";

//css
import styles from '../authorization/authorization.module.css'
import global from "../../../global.module.css";

//comp
import GlassCard from "../../../components/glasses/glasses-card/GlassCard";
import InputText from "../../../components/ui/input/input-text/InputText";
import Button from "../../../components/ui/buttons/button/Button";
import {useDispatch} from "react-redux";
import {setNewPassword} from "../../../redux/slices/user";
import ClientError from "../../../components/STATUS/404/ClientError";

function ResetPassword() {
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [errMes, setErrMes] = React.useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = localStorage.getItem('email')
    const code = localStorage.getItem('code')
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword) setErrMes('Пароли не совпадают!')

        if (!email) setErrMes('Ошибка исполнения')

        const data = {
            email: email,
            newPassword: password,
            code: code,
        }

        try{
            await dispatch(setNewPassword(data)).then((res) => {
                if(res.succes){
                    alert('Успешно')
                    navigate('/login')
                    localStorage.removeItem('email')
                    localStorage.removeItem('code')
                }
                else {
                    alert('Пароль не был изменен')
                    navigate('/login')
                }

            })
        }catch (e) {
            console.log(e)
            setErrMes('Ошибка исполнения')
        }

    }

    if(!email) return ClientError;

    return (
        <div className={styles.back}>
            <div className={styles['form-style']}>
                <GlassCard>
                    <div className={`${styles.flex}`}>
                        <div className={`${styles.logo}`}>
                            <div className={`${global.xl4} `}>
                                Новый пароль
                            </div>
                            <p className={`${global.d3} ${styles.decriptionText}`}>
                                Пароль был сброшен, введите новый пароль для своего аккаунта.
                            </p>
                        </div>
                        <div className={`${styles.form}`}>
                            <form className={styles.signIn}
                                  onSubmit={handleSubmit}
                            >
                                <InputText
                                    value={password ? password : null}
                                    onChange={e => setPassword(e.target.value)}
                                    place={'Введите Пароль'} type={'password'}/>
                                <InputText
                                    value={confirmPassword ? confirmPassword : null}
                                    // value={'new@mail.ru'}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    place={'Повторите введенный пароль'} type={'password'}/>
                                <div className={`${styles.link}`}>
                                    <div className={global.d3}>
                                        <Link to={'/registration'}>
                                            Зарегистрироваться
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.button}>
                                    <Button variant={'outlet'} className={`${global.f_center} ${styles.button}`}
                                            type={'submit'}>
                                        Сохранить
                                    </Button>
                                </div>
                                <p className={`${styles.error} ${global.d3}`}>{errMes}</p>
                            </form>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

export default ResetPassword;