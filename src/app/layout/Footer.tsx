import React from 'react'
import { Link } from 'react-router-dom'
import '@styles/footer.scss';

const Footer = () => {
    return (
        <footer>
            <span>
                Copyright © 2017 - 2021 <b>TrackCash</b>. Todos os Direitos Reservados.
            </span>

            <div>
                <Link to={'/termos-de-uso'}>Termos de uso</Link>
                <Link to={'/privacidade'}>Politicas de privacidade</Link>
                <Link to={'/faq'}>FAQ</Link>
            </div>
        </footer>
    )
}

export default React.memo(Footer)