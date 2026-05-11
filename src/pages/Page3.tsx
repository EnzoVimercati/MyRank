import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useState, useEffect } from 'react'
import '../styles/myrank-eval.css'
import { Loading } from '../components/Loading'


interface EvaluationItem {
    id: string
    name: string
    image: string | null
    type: 'movie' | 'series' | 'book'
    rating: number
    tags: string[]
    review: string
}

export function Page3() {
    const [formData, setFormData] = useState({
        name: '',
        image: null as string | null,
        type: 'movie' as 'movie' | 'series' | 'book',
        rating: 5,
        tagInput: '',
        tags: [] as string[],
        review: '',
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [feedback, setFeedback] = useState('')
    const [itemsCount, setItemsCount] = useState(0)

    useEffect(() => {
        const saved = localStorage.getItem('myrank-items')
        if (saved) {
            try {
                const items = JSON.parse(saved)
                setItemsCount(Array.isArray(items) ? items.length : 0)
            } catch {
                setItemsCount(0)
            }
        }

        const mainElement = document.querySelector('.page3-evaluation')
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showFeedback('Imagem muito grande! Máximo 5MB.')
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setFormData({ ...formData, image: result })
                setImagePreview(result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddTag = () => {
        if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, formData.tagInput.trim()],
                tagInput: '',
            })
        }
    }

    const handleRemoveTag = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(t => t !== tag),
        })
    }

    const showFeedback = (message: string) => {
        setFeedback(message)
        setTimeout(() => setFeedback(''), 3000)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim()) {
            showFeedback('Por favor, preencha o nome.')
            return
        }

        const newItem: EvaluationItem = {
            id: Date.now().toString(),
            name: formData.name,
            image: formData.image,
            type: formData.type,
            rating: formData.rating,
            tags: formData.tags,
            review: formData.review,
        }

        const saved = localStorage.getItem('myrank-items')
        const items = saved ? JSON.parse(saved) : []
        items.push(newItem)
        localStorage.setItem('myrank-items', JSON.stringify(items))
        setItemsCount(items.length)

        setFormData({
            name: '',
            image: null,
            type: 'movie',
            rating: 5,
            tagInput: '',
            tags: [],
            review: '',
        })
        setImagePreview(null)
        showFeedback('Adicionado com sucesso!')
    }

    return (
        <>
            <Loading />
            <Header />
            <main className='page3-evaluation' style={{ display: 'none' }}>
                <div className="eval-container">
                    <div className="eval-header">
                        <h1>Avalie seus <span className="highlight-orange">Favoritos</span></h1>
                        <p className="eval-subtitle">Adicione filmes, séries e livros à sua coleção pessoal</p>
                    </div>

                    <div className="eval-content">
                        <div className="eval-form-wrapper">
                            <form onSubmit={handleSubmit} className="eval-form">
                                <div className="form-group">
                                    <label>Nome *</label>
                                    <input
                                        type="text"
                                        className="eval-input"
                                        placeholder="Ex: Interestelar"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Tipo</label>
                                        <select
                                            className="eval-select"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                        >
                                            <option value="movie">Filme</option>
                                            <option value="series">Série</option>
                                            <option value="book">Livro</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Nota (0-10)</label>
                                        <div className="rating-container">
                                            <input
                                                type="range"
                                                className="eval-slider"
                                                min="0"
                                                max="10"
                                                step="0.5"
                                                value={formData.rating}
                                                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                            />
                                            <div className="rating-display">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`star-small ${i < Math.round(formData.rating / 2) ? 'active' : ''}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                                <span style={{ marginLeft: '10px', color: 'rgba(255, 255, 255, 0.7)' }}>
                                                    {formData.rating.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Imagem</label>
                                    <div className="image-upload" onClick={() => (document.querySelector('.eval-file-input') as HTMLInputElement)?.click()}>
                                        <input
                                            type="file"
                                            className="eval-file-input"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <span className="upload-hint">Clique para enviar uma imagem</span>
                                    </div>
                                    {imagePreview && (
                                        <div className="eval-image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Tags</label>
                                    <div className="tag-input-wrapper">
                                        <input
                                            type="text"
                                            className="eval-tag-input"
                                            placeholder="Ex: Ação, Drama..."
                                            value={formData.tagInput}
                                            onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        />
                                        <button type="button" onClick={handleAddTag} className="add-tag-btn">+</button>
                                    </div>
                                    <div className="eval-tags">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="eval-tag">
                                                {tag}
                                                <button type="button" className="remove-tag-btn" onClick={() => handleRemoveTag(tag)}>×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Resenha</label>
                                    <textarea
                                        className="eval-textarea"
                                        placeholder="Compartilhe sua opinião..."
                                        value={formData.review}
                                        onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="submit-btn-eval">Salvar Avaliação</button>
                            </form>
                        </div>

                        <div className="eval-info-panel">
                            <div className="info-card">
                                <div className="info-icon">📊</div>
                                <h3>Itens Adicionados</h3>
                                <p className="info-count">{itemsCount}</p>
                                <p className="info-text">Continue adicionando para criar seu rank</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">⭐</div>
                                <h3>Seu Progresso</h3>
                                <p className="info-text">Você está criando um ranking único com suas preferências pessoais</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">🎯</div>
                                <h3>Próximo Passo</h3>
                                <p className="info-text">Vá para "Meus Rankings" para ordenar seus favoritos</p>
                            </div>
                        </div>
                    </div>

                    {feedback && <div className="eval-feedback">{feedback}</div>}
                </div>
            </main>
            <Footer />
        </>
    )
}
