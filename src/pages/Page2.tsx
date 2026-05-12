import { Header } from '../components/Header'
import '../styles/about.css'
import fotoPerfil from '../assets/Novo Projeto (5).jpg'
import banner from '../assets/background.png'
import { useEffect, useRef } from 'react'
import rocket from "../assets/rocket (1).svg"
import alvo from "../assets/target.svg"
import engrenagem from "../assets/cog.svg"
import ferramenta from "../assets/wrench.svg"
import sobre from "../assets/app-window.svg"
import interesses from "../assets/scan.svg"
import Features from '../assets/spline-pointer.svg'
import { Loading } from '../components/Loading'
import { Footer } from '../components/Footer'
import fototaina from "../assets/foto-taina.jpg"

export function Page2(){
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mainElement = document.querySelector('.about-container')
        const loadingElement = document.getElementById('loading')
        
        if (mainElement) (mainElement as HTMLElement).style.display = 'none'
        
        const timer1 = setTimeout(() => {
            if (mainElement) (mainElement as HTMLElement).style.display = 'block'
        }, 1000)
        
        const timer2 = setTimeout(() => {
            if (loadingElement) loadingElement.style.display = 'none'
        }, 999)
        
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollY = window.scrollY
                containerRef.current.style.setProperty('--scroll-y', `${200 - scrollY * 0.5}px`)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return(
        <>
            <Loading />
            <Header />
            <div className="about-container" ref={containerRef}>
                <img src={banner} alt="Banner" className="about-banner-img" />
                <div className="about-profile-section">
                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
                        <div className="about-profile-pic-container">
                            <img 
                                src={fotoPerfil} 
                                alt="Foto de Enzo" 
                                className="about-profile-pic"
                            />
                            <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>Enzo Vimercati</p>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>+</div>
                        <div className="about-profile-pic-container">
                            <img 
                                src={fototaina} 
                                alt="Foto de Taina" 
                                className="about-profile-pic"
                            />
                            <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>Taina de Souza Silva Martins</p>
                        </div>
                    </div>

                    <div className="about-profile-info">
                        <p className="dev-title"> <img src={rocket} alt="Rocket" className="about-rocket-img" /> MyRank - App de Ranking</p>
                        <h1>Sistema de Avaliação & Rankings</h1>
                        <p>Uma aplicação web que permite aos usuários avaliar, organizar e rankear seus filmes, séries e livros favoritos. Desenvolvida por uma dupla de desenvolvedoras com tecnologias modernas, autenticação segura e design responsivo para proporcionar a melhor experiência do usuário.</p>
                    </div>
                </div>
                <div className="about-content">
                    <div className="about-card">
                        <h3><img src={alvo} alt="Alvo" className="about-icon" /> Objetivo</h3>
                        <p>MyRank foi desenvolvido para criar uma plataforma centralizada e intuitiva onde usuários possam avaliar, organizar e comparar seus títulos favoritos com segurança via Google OAuth, histórico persistente e interface responsiva.</p>
                    </div>
                    <div className="about-card">
                        <h3><img src={ferramenta} alt="Ferramenta" className="about-icon" /> Tecnologias Utilizadas</h3>
                        <div className="skills-grid">
                            <div className="skill-item">React</div>
                            <div className="skill-item">TypeScript</div>
                            <div className="skill-item">React Router v6</div>
                            <div className="skill-item">Vite</div>
                            <div className="skill-item">Context API</div>
                            <div className="skill-item">CSS3 Custom</div>
                        </div>
                    </div>
                    <div className="about-card">
                        <h3><img src={interesses} alt="Interesses" className="about-icon" /> Funcionalidades</h3>
                        <div className="interests-list">
                            <span className="interest-tag">Google OAuth</span>
                            <span className="interest-tag">Rotas Protegidas</span>
                            <span className="interest-tag">Persistência Local</span>
                            <span className="interest-tag">Avaliações com Slider</span>
                            <span className="interest-tag">Ranking Dinâmico</span>
                        </div>
                    </div>
                    <div className="about-card">
                        <h3><img src={engrenagem} alt="Engrenagem" className="about-icon" /> Stack Tecnológico</h3>
                        <ul className="tech-stack-list">
                            <li>React 18+ (Frontend Framework)</li>
                            <li>TypeScript para tipagem segura</li>
                            <li>CSS3 Custom (sem frameworks)</li>
                            <li>Google OAuth 2.0 (Autenticação)</li>
                            <li>Context API + localStorage (Estado)</li>
                        </ul>
                    </div>
                    <div className="about-card">
                        <h3><img src={Features} alt="Sobre" className="about-icon" /> Features Implementadas</h3>
                        <ul className="features-list">
                            <li>Login seguro com Google OAuth 2.0</li>
                            <li>Proteção completa de rotas autenticadas</li>
                            <li>Sistema de avaliação com slider e estrelas</li>
                            <li>Criação e gerenciamento de rankings</li>
                            <li>Persistência em localStorage com sincronização</li>
                        </ul>
                    </div>
                    <div className="about-card">
                        <h3><img src={sobre} alt="Sobre" className="about-icon" /> Sobre o Projeto</h3>
                        <p>MyRank é uma aplicação web desenvolvida com React, TypeScript e Vite que centraliza avaliações de filmes, séries e livros. Os usuários autenticados podem criar rankings personalizados, avaliar títulos com notas de 0 a 10 usando um slider visual com estrelas, adicionar notas detalhadas e manter tudo sincronizado localmente.</p>
                        <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#b0b0b0' }}>Construído com as melhores práticas de desenvolvimento frontend moderno: tipagem TypeScript, componentes reutilizáveis, Context API para estado global e CSS3 customizado para uma interface fluida e responsiva.</p>
                    </div>
                </div>
                <div className="about-cta-section">
                    <h2>Vamos conversar sobre seu projeto?</h2>
                    <p style={{ marginBottom: '20px', color: '#b0b0b0' }}>Entre em contato com nossa dupla de desenvolvedoras</p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://www.linkedin.com/in/enzo-vimercati-93794b393/"><button className="about-cta-btn">Conectar com Enzo</button></a>
                        <a href="https://www.linkedin.com/in/tain%C3%A1martinss/"><button className="about-cta-btn">Conectar com Taina</button></a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

}
