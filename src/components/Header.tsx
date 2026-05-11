import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import Logo from '../assets/logo.png'
import '/src/styles/header.css'
import { useUser } from '../contexts/UserContext'


interface HeaderProps {
    nome?: string
    foto?: string
}

export function Header({ nome, foto }: HeaderProps) {
    const { user, logout } = useUser()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
    
    const closeMenu = () => {
        setMenuOpen(false)
    }

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen)
    }

    const handleLogout = () => {
        logout()
        setProfileMenuOpen(false)
        navigate('/')
    }

    // Usar dados do contexto se não forem passados como props
    const displayName = nome || user?.name
    const displayFoto = foto || user?.picture

    return (
        <header>
            <img src={Logo} alt="Logo" className='logo' />
            
            {/* Hamburger Menu Button */}
            <button className='hamburger' onClick={toggleMenu} aria-label="Menu">
                <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
                <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
                <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
            </button>

            {/* Navigation Links */}
            <nav className={`Links ${menuOpen ? 'active' : ''}`}>
                <Link to='/' onClick={closeMenu}>
                    <button className='HeaderLink'>Home</button>
                </Link>

                <Link to='/page2' onClick={closeMenu}>
                    <button className='HeaderLink'>Sobre</button>
                </Link>

                <Link to='/page3' onClick={closeMenu}>
                    <button className='HeaderLink'>Avaliar</button>
                </Link>

                <Link to='/page4' onClick={closeMenu}>
                    <button className='HeaderLink'>minhas Avaliações</button>
                </Link>
                
                {displayName && (
                    <div className='profile-container'>
                        <button 
                            className='profile-button'
                            onClick={toggleProfileMenu}
                            aria-label="Menu de perfil"
                        >
                            {displayFoto && (
                                <img 
                                    src={displayFoto} 
                                    alt="Perfil" 
                                    className="profilePictureheader" 
                                    crossOrigin="anonymous" 
                                    referrerPolicy="no-referrer"
                                />
                            )}
                            <h1 className='UserInfoName'>Olá!, <b className='DestaqueLaranja'>{displayName}</b></h1>
                        </button>
                        
                        {profileMenuOpen && (
                            <div className='profile-menu'>
                                <button 
                                    className='logout-button'
                                    onClick={handleLogout}
                                >
                                    Deslogar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}
