import React from 'react';
import LoginView from './LoginView';
import { useHistory } from "react-router-dom"
import { initRoute } from '../../../Router';
import { useAppSelector } from '@store/hooks';
import redux from '@store/actions';
import { base64Encode } from '@utils/functions';

export interface ILoginViewProps {
    error: string;
    login: (event: any) => void;
    processing: boolean;
    keepLoggedIn: boolean;
    toggleKeepLoggedIn: () => void;
}

const LoginContainer = () => {
    const history = useHistory()
    const { user, persisted } = useAppSelector(state => state)
    const isUserAuthenticated = !!user?.token || !!persisted?.user?.token
    const [keepLoggedIn, setKeepLoggedIn] = React.useState(true)
    const [error, setError] = React.useState('')
    const [processing, setProcessing] = React.useState(false)

    function toggleKeepLoggedIn() {
        setKeepLoggedIn(!keepLoggedIn)
    }

    async function login(e: any) {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        if (!email) return setError('Inserir email!')
        else if (!password) return setError('Inserir a senha!')
        else setError('')

        // should call api login endpoint here
        // const res = await api.post()

        // simulate api response with user data
        setProcessing(true)
        setTimeout(() => {
            redux.user.authenticate({
                email,
                token: base64Encode(`${email}:${password}`)
            }, keepLoggedIn)

            setProcessing(false)
            history.push(initRoute)
        }, 2000);
    }

    React.useEffect(() => {
        if (isUserAuthenticated) history.push(initRoute)
        else redux.user.refresh()
    }, [history, isUserAuthenticated])

    const passProps: ILoginViewProps = {
        error,
        login,
        processing,
        keepLoggedIn,
        toggleKeepLoggedIn
    }

    return <LoginView {...passProps} />
}
export default LoginContainer;
