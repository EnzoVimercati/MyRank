import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import  Google  from "../assets/google-white-icon.svg"
import mockup from "../assets/mockup.png"
import star from "../assets/star.svg"
import grafico from "../assets/chart-no-axes-combined.svg"
import multi from "../assets/copy-check.svg"
import '../styles/home.css'
import book from "../assets/book-text.svg"
import movie from "../assets/popcorn.svg"
import series from "../assets/clapperboard.svg"
import StarAva from "../assets/500px-Antu_rating.svg.png"
import interstelar from "../assets/capas/Interstellar_Filme.png"
import poderoso from "../assets/capas/20120876.jpg"
import duna from "../assets/capas/MV5BOWJjMGViY2UtNTAzNS00ZGFjLWFkNTMtMDBiMDMyZTM1NTY3XkEyXkFqcGc@._V1_.jpg"
import mario from "../assets/capas/Super_Mario_Galaxy_capa.png"
import batman from "../assets/capas/The_Dark_Knight.jpg"
import breking from "../assets/capas/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
import stranger from "../assets/capas/Stranger-Things-@netflixbrasil-Like-Magazine-819x1024.webp"
import thelast from "../assets/capas/5856320.jpg"
import dark from "../assets/capas/MV5BOWJjMGViY2UtNTAzNS00ZGFjLWFkNTMtMDBiMDMyZTM1NTY3XkEyXkFqcGc@._V1_.jpg"
import friends from "../assets/capas/3055482.jpg"
import habitos from "../assets/capas/81SVIwe5L9L._UF1000,1000_QL80_.jpg"
import milnovecentos from "../assets/capas/61t0bwt1s3L._AC_UF1000,1000_QL80_.jpg"
import senhor from "../assets/capas/20224832.jpg"
import principe from "../assets/capas/81SVIwe5L9L._UF1000,1000_QL80_.jpg"
import pai from "../assets/capas/718YH-zVFeL._AC_UF1000,1000_QL80_.jpg"
import seta from "../assets/chevron-down (1).svg"
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import {Shader} from '../components/shaders'
import { Loading } from '../components/Loading'
import { useGoogleAuth } from '../hooks/useGoogleAuth'
import { useUser } from '../contexts/UserContext'

export function Home(){
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const handleGoogleLogin = useGoogleAuth((userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    })

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch {
                localStorage.removeItem('user')
            }
        }
    }, [setUser])

    useEffect(() => {
        const mainElement = document.getElementById('main')
        const loadingElement = document.getElementById('loading')
        
        if (mainElement) mainElement.style.display = 'none'
        
        const timer1 = setTimeout(() => {
            if (mainElement) mainElement.style.display = 'block'
        }, 1000)
        
        const timer2 = setTimeout(() => {
            if (loadingElement) loadingElement.style.display = 'none'
        }, 999)
        
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    return (
        <>
            <Loading/>
            <Header/>
            <main id='main' style={{ display: 'none' }}>
            
                <Shader />
                <section className='page2-hero'>
                    <div className='hero-content'>
                        <h1>Seu <b className='destasque-laranja'> Rank </b> merece um lugar de destaque.</h1>
                        <p className='hero-subtitle'>No MyRank, você avalia, organiza e ranqueia seus filmes, séries e livros favoritos. Crie listas personalizadas e descubra qual é o seu verdadeiro Top 1.</p>
                        {user ? (
                            <button className='btn-lg' onClick={() => navigate('/page3')}> 
                               <img src={multi} alt="" /> Começar meu Rank 
                            </button>
                        ) : (
                            <button className='btn-lg' onClick={() => handleGoogleLogin()}> 
                                <img src={Google} alt="Google" className='google-icon'/>
                                Começar meu ranking agora 
                            </button>
                        )}
                    </div>
                    <div className='hero-image'>
                        <div className='image-placeholder'>
                           <img className='banner' src={mockup} alt="Mockup do aplicativo" />
                        </div>
                    </div>
                </section>
                <section className='page2-features'>
                    <div className='seta'>
                    <img src={seta} alt="Seta" className='SetaAnimada' />
                    </div>
                    <h2>O que <b className='destasque-laranja'>você</b> pode fazer?</h2>
                    <div className='features-grid'>
                        <div className='feature-card'>
                            <div className='feature-icon'><img src={star} alt="" className='icon-section2'/></div>
                            <h3>Avalie com precisão</h3>
                            <p>Dê notas de 0 a 10 ou use nosso sistema de estrelas. Refine sua opinião com tags personalizadas e resenhas rápidas.</p>
                        </div>
                        <div className='feature-card'>
                            <div className='feature-icon'><img src={grafico} alt="" className='icon-section2'/></div>
                            <h3>Crie Rankings Dinâmicos</h3>
                            <p>Não apenas uma lista, mas um rank. Use nossa ferramenta de "arrastar e soltar" para decidir quem sobe e quem desce no seu pódio pessoal.</p>
                        </div>
                        <div className='feature-card'>
                            <div className='feature-icon'><img src={multi} alt="" className='icon-section2'/></div>
                            <h3>Multi-entretenimento</h3>
                            <p>Tudo em um só lugar. Alterne entre sua estante de livros, sua maratona de séries e sua cinebiografia com um clique.</p>
                        </div>
                        <div className='feature-card'>
                            <div className='feature-icon'><img src={star} alt="" className='icon-section2'/></div>
                            <h3>Compartilhe seu gosto</h3>
                            <p>Gere imagens ou Jsons dos seus "Top 10" para postar no Instagram, Twitter ou enviar para aquele amigo que sempre discorda de você.</p>
                        </div>
                    </div>
                </section>

                <section className='rankings-highlight-section'>
                    <div className='rankings-highlight-header'>
                        <h2>Rankings em destaque</h2>
                        <a href="#" className='see-all-link'>Ver todos →</a>
                    </div>

                    <div className='rankings-grid'>
                        <div className='ranking-card'>
                            <div className='card-header'>
                                <span className='card-icon'><img src={movie} alt="" className='icon-section2'/></span>
                                <h3>Top filmes da semana</h3>
                            </div>
                            <hr className='card-divider' />
                            <ul className='ranking-list'>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>1</span>
                                    <div ><img src={interstelar} alt="Interestelar"className='thumbnail' /></div>
                                    <span className='rank-title'>Interestelar</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.9</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>2</span>
                                    <div className='thumbnail'><img src={poderoso} alt="O Poderoso Chefão" className='thumbnail' /></div>
                                    <span className='rank-title'>O Poderoso Chefão</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.8</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>3</span>
                                    <div className='thumbnail'><img src={duna} alt="Duna: Parte 2" className='thumbnail' /></div>
                                    <span className='rank-title'>Duna: Parte 2</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.7</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>4</span>
                                    <div className='thumbnail'><img src={mario} alt="Super Mario Galaxy" className='thumbnail' /></div>
                                    <span className='rank-title'>Super Mario Galaxy</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.6</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>5</span>
                                    <div className='thumbnail'><img src={batman} alt="Batman: O Cavaleiro das Trevas" className='thumbnail' /></div>
                                    <span className='rank-title'>Batman: O Cavaleiro das Trevas</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.6</span>
                                </li>
                            </ul>
                            <a href="#" className='card-link'>Ver ranking completo →</a>
                        </div>
                        <div className='ranking-card'>
                            <div className='card-header'>
                                <span className='card-icon'><img src={series} alt="" className='icon-section2'/></span>
                                <h3>Séries em alta</h3>
                            </div>
                            <hr className='card-divider' />
                            <ul className='ranking-list'>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>1</span>
                                    <div className='thumbnail'><img src={breking} alt="Breaking Bad" className='thumbnail' /></div>
                                    <span className='rank-title'>Breaking Bad</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.9</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>2</span>
                                    <div className='thumbnail'><img src={stranger} alt="Stranger Things" className='thumbnail' /></div>
                                    <span className='rank-title'>Stranger Things</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.8</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>3</span>
                                    <div className='thumbnail'><img src={thelast} alt="The Last of Us" className='thumbnail' /></div>
                                    <span className='rank-title'>The Last of Us</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.8</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>4</span>
                                    <div className='thumbnail'><img src={dark} alt="Dark" className='thumbnail' /></div>
                                    <span className='rank-title'>Dark</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.7</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>5</span>
                                    <div className='thumbnail'><img src={friends} alt="Friends" className='thumbnail' /></div>
                                    <span className='rank-title'>Friends</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.6</span>
                                </li>
                            </ul>
                            <a href="#" className='card-link'>Ver ranking completo →</a>
                        </div>
                        <div className='ranking-card'>
                            <div className='card-header'>
                                <span className='card-icon'><img src={book} alt="" className='icon-section2'/></span>
                                <h3>Livros mais bem avaliados</h3>
                            </div>
                            <hr className='card-divider' />
                            <ul className='ranking-list'>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>1</span>
                                    <div className='thumbnail'><img src={habitos} alt="Hábitos Atômicos" className='thumbnail' /></div>
                                    <span className='rank-title'>Hábitos Atômicos</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.9</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>2</span>
                                    <div className='thumbnail'><img src={milnovecentos} alt="1984" className='thumbnail' /></div>
                                    <span className='rank-title'>1984</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.8</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>3</span>
                                    <div className='thumbnail'><img src={senhor} alt="O Senhor dos Anéis" className='thumbnail' /></div>
                                    <span className='rank-title'>O Senhor dos Anéis</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.8</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>4</span>
                                    <div className='thumbnail'><img src={principe} alt="O Pequeno Príncipe" className='thumbnail' /></div>
                                    <span className='rank-title'>O Pequeno Príncipe</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.7</span>
                                </li>
                                <li className='ranking-item-new'>
                                    <span className='rank-number'>5</span>
                                    <div className='thumbnail'><img src={pai} alt="Pai Rico, Pai Pobre" className='thumbnail' /></div>
                                    <span className='rank-title'>Pai Rico, Pai Pobre</span>
                                    <span className='rank-rating'><img src={StarAva} alt="" className='star-avaliation' /> 4.6</span>
                                </li>
                            </ul>
                            <a href="#" className='card-link'>Ver ranking completo →</a>
                        </div>
                    </div>
                </section>
                <section className='page2-social-proof'>
                    <h2>Junte-se a mais de 50.000 críticos particulares.</h2>
                    <div className='testimonial'>
                        <p className='testimonial-text'>
                            "O MyRank mudou a forma como organizo minhas leituras. Finalmente sei exatamente quais foram os melhores livros do meu ano!"
                        </p>
                        <p className='testimonial-author'>— Ana K., Usuária desde 2023</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );

}
