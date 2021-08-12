import React from 'react'
import '@styles/navbar.scss'
import { useHistory } from "react-router-dom"
import { useAppSelector } from '@store/hooks'
import { LogoTrackIcon, UserIcon } from '@assets/images'
import OutsideClickAlerter from '@utils/hooks'
import redux from '@store/actions'

const Navbar = () => {
    const history = useHistory()
    const { user, persisted } = useAppSelector(state => state)
    const loggedUser = user || persisted.user
    const [showMenu, setShowMenu] = React.useState(false)

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    function logout() {
        redux.user.logout()
    }

    return (
        <header className="navbar">
            <LogoTrackIcon className='logo' />

            <div
                className="user-avatar"
                onClick={toggleMenu}
            >
                <UserIcon className='avatar' />

                <OutsideClickAlerter
                    onClickOutside={toggleMenu}
                    open={showMenu}
                >
                    <div
                        className='menu'
                        style={{
                            visibility: showMenu ? 'visible' : 'hidden',
                            opacity: showMenu ? 1 : 0
                        }}
                    >
                        <div className='option' onClick={logout}>Sair</div>
                    </div>
                </OutsideClickAlerter>
            </div>

        </header>
    )
}
export default React.memo(Navbar)