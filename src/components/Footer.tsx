import { Link } from 'react-router'
import '../styles/footer.css'
import Logo from '../assets/logo.png'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='footer'>
            <div className='footer-container'>
                <div className='footer-section'>
                    <img src={Logo} alt="MyRank Logo" className='footer-logo' />
                    <p className='footer-description'>
                        Seu rank merece um lugar de destaque. Avalie, organize e ranqueie seus filmes, séries e livros favoritos.
                    </p>
                </div>

                <div className='footer-section'>
                    <h3>Navegação</h3>
                    <nav className='footer-links'>
                        <Link to='/' className='footer-link'>Home</Link>
                        <Link to='/page2' className='footer-link'>Sobre</Link>
                        <Link to='/page3' className='footer-link'>Avaliar</Link>
                        <Link to='/page4' className='footer-link'>Minhas Avaliações</Link>
                    </nav>
                </div>

                <div className='footer-section'>
                    <h3>Redes Sociais</h3>
                    <div className='social-links'>
                        <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='social-link'>Twitter</a>
                        <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='social-link'>Instagram</a>
                        <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='social-link'>Facebook</a>
                    </div>
                </div>

                <div className='footer-section'>
                    <h3>Suporte</h3>
                    <div className='support-links'>
                        <a href='#' className='footer-link'>Contato</a>
                        <a href='#' className='footer-link'>FAQ</a>
                        <a href='#' className='footer-link'>Privacidade</a>
                        <a href='#' className='footer-link'>Termos</a>
                    </div>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>&copy; {currentYear} MyRank. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}
