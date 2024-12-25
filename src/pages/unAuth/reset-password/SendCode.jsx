import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

//css
import styles from '../authorization/authorization.module.css';
import global from "../../../global.module.css";

//components
import GlassCard from "../../../components/glasses/glasses-card/GlassCard";
import Button from "../../../components/ui/buttons/button/Button";
import {checkCode} from "../../../redux/slices/user";
import {useDispatch} from "react-redux";

function SendCode() {
    const [errMsg, setErrMsg] = useState(null);
    const [code, setCode] = useState(Array(4).fill('')); // Initially, all inputs are empty
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleInputChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const codeValue = code.join('');
        const email = localStorage.getItem('email');
        if(!email || !codeValue) setErrMsg('Ошибка при отправке email попробуйте еще раз')

        const data = {
            email: email,
            code: codeValue,
        }

        try {
            await dispatch(checkCode(data))
            localStorage.setItem('code', codeValue);
            navigate('/reset')
        }catch(err) {
            console.log(err);
            console.log('Submitted Code:', codeValue);
            setErrMsg('Ошибка исполнения')
        }

    };

    const CodeInput = ({ index, totalInputs, onChange, value }) => {
        const inputRef = useRef(null);
        useEffect(() => {
            if (value) {
                if (index < totalInputs - 1) {
                    // Move focus to the next input if a character is entered
                    inputRef.current.nextElementSibling?.focus();
                }
            }
        }, [value, index, totalInputs]);
        const handleChange = (e) => {
            const { value } = e.target;
            // Allow only single character input
            if (value.length <= 1) {
                onChange(index, value);
            }
        };
        const handleBackspace = (e) => {
            if (e.keyCode === 8 && !value) {
                // Focus the previous input if backspace is pressed on an empty input
                inputRef.current.previousElementSibling?.focus();
            }
        };
        return (
            <input
                ref={inputRef}
                type="number"
                className={styles.code_input}
                maxLength="1"
                value={value}
                onChange={handleChange}
                onKeyDown={handleBackspace}
                required
            />
        );
    };


    return (
        <div className={styles.back}>
            <div className={styles['form-style']}>
                <GlassCard>
                    <div className={`${styles.flex}`}>
                        <div className={`${styles.logo}`}>
                            <div  className={`${global.xl4} `}>
                                Сброс пароля
                            </div>
                            <p className={`${global.d3} ${styles.decriptionText}`}>
                                На вашу почту было отправлено письмо, где указан код подтверждения, обратите внимание на правильность почты.
                            </p>
                        </div>
                        <div className={`${styles.form}`}>
                            <form className={styles.signIn} onSubmit={handleSubmit}>
                                <div className={styles.code}>
                                    {code.map((value, index) => (
                                        <CodeInput
                                            key={index}
                                            index={index}
                                            totalInputs={code.length}
                                            value={value}
                                            onChange={handleInputChange}
                                        />
                                    ))}
                                </div>

                                <div className={styles.button}>
                                    <Button variant={'outlet'} className={`${global.f_center} ${styles.button}`}
                                            type={'submit'}>
                                        Подтвердить
                                    </Button>
                                </div>
                                <p className={`${styles.error} ${global.d3}`}>{errMsg}</p>
                                <div className={`${styles.link}`}>
                                    <div className={global.d3}>
                                        <Link to={'/registration'}>
                                            Зарегистрироваться
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

export default SendCode;