import React, {useEffect, useState} from 'react'
import styles from '../authorization/authorization.module.css'
import GlassCard from '../../../components/glasses/glasses-card/GlassCard'
import global from '../../../global.module.css'
import InputText from '../../../components/ui/input/input-text/InputText'
import {Link} from 'react-router-dom'
import InputDporDown from '../../../components/ui/input/input-dropdown/InputDporDown'
import {axiosClassic} from "../../../r-axios/axios";
import Button from "../../../components/ui/buttons/button/Button";

function Registration() {

    // const navigate = useNavigate()
    // const dispatch = useDispatch()

    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [sex, setSex] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [DR, setDR] = useState('')

    const [errMes, setErrMes] = useState('')

    const items = [
        {
            id: 1,
            title: 'Мужской',
            value: 'м'
        },
        {
            id: 2,
            title: 'Женский',
            value: 'ж'
        },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== password1) {
            return setErrMes('Пароли не совпадают')
        }
        const data = {
            email,
            password,
            username: nickname,
            sex,
            date_of_birth: DR,
        }
        try {
            const user = await axiosClassic.post(`/auth/registration`, data)
                .catch(error => {
                    throw error.response.data
                })
            return user
        } catch (e) {
            throw Error(e)
        }
    }
    useEffect(() => {

    }, [errMes])

    return (
        <div className={styles.back}>
            <div className={styles.state}>
                <GlassCard>
                    <div className={`${styles.flex}`}>
                        <div className={`${styles.logo}`}>
                            <Link to={'/'} className={`${global.xl4} `}>
                                zabor.inc
                            </Link>
                            <p className={`${global.d3} ${styles.decriptionText}`}>
                                zabor — это платформа, на которой люди объединяют свои деньги или другие ресурсы через
                                интернет, чтобы поддержать усилия других людей или организаций.
                            </p>
                        </div>
                        <div className={`${styles.form}`}>
                            <form className={styles.signIn} onSubmit={handleSubmit}>
                                <InputText
                                    place={'Введите Email'} type={'email'} required autocomplete={"new-email"}
                                    value={email ? email : null}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <InputText place={'Введите Nickname'} type={'text'} autocomplete={"newNickname"}
                                           value={nickname ? nickname : null}
                                           required
                                           onChange={e => setNickname(e.target.value)}
                                />
                                <InputDporDown data={items} required
                                               value={sex ? sex : null}
                                               onChange={e => setSex(e.target.value)}
                                />
                                <h3 className={global.d3}>Дата рождения</h3>
                                <InputText type={'date'} utocomplete={"off"} autocomplete={"off"}
                                           value={DR ? DR : null}
                                           required
                                           onChange={e => setDR(e.target.value)}

                                />
                                <InputText place={'Введите Пароль'} type={'password'} autocomplete={"new-password"}
                                           value={password ? password : null}
                                           required
                                           onChange={e => setPassword(e.target.value)}
                                />
                                <InputText place={'Повторите Пароль'} type={'password'} autocomplete={"new-password"}
                                           value={password1 ? password1 : null}
                                           required
                                           onChange={e => setPassword1(e.target.value)}
                                />

                                <p className={`${styles.error} ${global.d3}`}>{errMes}</p>

                                <div className={`${global.flex} ${global.f_end} ${global.f_a_center}`}>
                                    <div className={global.d3}>
                                        <Link to={'/login'}>
                                            Уже есть аккаунт?
                                        </Link>
                                    </div>
                                </div>

                                <Button variant={'outlet'} className={`${global.f_center} ${styles.button}`} type={'submit'}>
                                    Зарегистрироваться
                                </Button>
                            </form>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    )
}

export default Registration