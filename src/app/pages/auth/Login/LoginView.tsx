import React from 'react';
import './login.scss';
import {
    TrackCashFullColorIcon,
    MessageIcon,
    LockedIcon,
    CheckedIcon,
    UncheckedIcon,
    LoadingIcon
} from '@assets/images';
import { Link } from "react-router-dom"

import { ILoginViewProps } from './LoginContainer';

const LoginView = (props: ILoginViewProps) => {
    const {
        error,
        login,
        processing,
        keepLoggedIn,
        toggleKeepLoggedIn
    } = props

    return (
        <div className='login'>
            <div className='content'>
                <div className='left-side'>
                    <TrackCashFullColorIcon className='logo' />

                    <div className='text'>Fazer login no TrackCash:</div>

                    {!!error && <div className='error'>{error}</div>}

                    <form onSubmit={login}>
                        <div className='input-container'>
                            <input
                                name='email'
                                placeholder='Digite seu email'
                                defaultValue='teste@integrador.com.br'
                            />

                            <MessageIcon className='icon' />
                        </div>

                        <div className='input-container'>
                            <input
                                name='password'
                                placeholder='Digite sua senha'
                                defaultValue='mudar!@#'
                            />

                            <LockedIcon className='icon' />
                        </div>

                        <button type='submit'>
                            {processing
                                ? <LoadingIcon className='loading-icon' />
                                : 'Fazer login'
                            }
                        </button>

                        <div className='row'>
                            <div
                                className='checkbox'
                                onClick={toggleKeepLoggedIn}
                            >
                                {keepLoggedIn
                                    ? <CheckedIcon />
                                    : <UncheckedIcon />
                                }
                                <span>Lembre-me</span>
                            </div>

                            <Link
                                className='link'
                                to='recuperar_senha'
                            >Recuperar senha</Link>
                        </div>

                        <Link
                            className='link register'
                            to='registrar'
                        >Cadastre-se</Link>
                    </form>
                </div>

                <div className='right-side'>
                    <div className="wrapper">
                        <div className='title'>Muito mais que um conciliador financeiro!</div>
                        <div className='description'>A melhor ferramenta no mercado e a única com processo automatizado, que compara as informações entre Plataformas, MarketPlaces, Transportadoras, Meios de Pagamento e Instituições Financeiras!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginView;
