import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useState, useEffect } from 'react'
import '../styles/myrank-list.css'
import { Loading } from '../components/Loading'
import Export from "../assets/download (1).svg"
import Mail from "../assets/mailbox (1).svg"
import crown from "../assets/crown.svg"


interface RankItem {
    id: string
    name: string
    image: string | null
    type: 'movie' | 'series' | 'book'
    rating: number
    tags: string[]
    review: string
    position: number
}

export function Page4() {
    const [items, setItems] = useState<RankItem[]>([])
    const [editingId, setEditingId] = useState<string | null>(null)
    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const [feedback, setFeedback] = useState('')
    const [editForm, setEditForm] = useState({
        name: '',
        image: null as string | null,
        type: 'movie' as 'movie' | 'series' | 'book',
        rating: 5,
        tagInput: '',
        tags: [] as string[],
        review: '',
    })
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    // Load items from localStorage on mount
    useEffect(() => {
        loadItems()

        const mainElement = document.querySelector('.page4-ranking')
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

    const loadItems = () => {
        const saved = localStorage.getItem('myrank-items')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (Array.isArray(parsed)) {
                    const sorted = parsed.sort((a: RankItem, b: RankItem) => a.position - b.position)
                    setItems(sorted)
                }
            } catch {
                setItems([])
            }
        }
    }

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
                setEditForm({ ...editForm, image: result })
                setImagePreview(result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddTag = () => {
        if (editForm.tagInput.trim() && !editForm.tags.includes(editForm.tagInput.trim())) {
            setEditForm({
                ...editForm,
                tags: [...editForm.tags, editForm.tagInput.trim()],
                tagInput: '',
            })
        }
    }

    const handleRemoveTag = (tag: string) => {
        setEditForm({
            ...editForm,
            tags: editForm.tags.filter(t => t !== tag),
        })
    }

    const handleEditClick = (item: RankItem) => {
        setEditingId(item.id)
        setEditForm({
            name: item.name,
            image: item.image,
            type: item.type,
            rating: item.rating,
            tagInput: '',
            tags: item.tags,
            review: item.review,
        })
        setImagePreview(item.image)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!editForm.name.trim()) {
            showFeedback('Por favor, preencha o nome do item!')
            return
        }

        const updatedItems = items.map(item =>
            item.id === editingId
                ? {
                      ...item,
                      name: editForm.name,
                      image: editForm.image,
                      type: editForm.type,
                      rating: editForm.rating,
                      tags: editForm.tags,
                      review: editForm.review,
                  }
                : item
        )

        setItems(updatedItems)
        localStorage.setItem('myrank-items', JSON.stringify(updatedItems))
        showFeedback('Item atualizado com sucesso! ✓')
        setEditingId(null)
        setEditForm({
            name: '',
            image: null,
            type: 'movie',
            rating: 5,
            tagInput: '',
            tags: [],
            review: '',
        })
        setImagePreview(null)
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setEditForm({
            name: '',
            image: null,
            type: 'movie',
            rating: 5,
            tagInput: '',
            tags: [],
            review: '',
        })
        setImagePreview(null)
    }

    const handleDelete = (id: string) => {
        const updatedItems = items
            .filter(item => item.id !== id)
            .map((item, index) => ({
                ...item,
                position: index + 1,
            }))

        setItems(updatedItems)
        localStorage.setItem('myrank-items', JSON.stringify(updatedItems))
        showFeedback('Item removido com sucesso! ✓')
    }

    const handleDragStart = (id: string) => {
        setDraggedItem(id)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (targetId: string) => {
        if (!draggedItem || draggedItem === targetId) return

        const draggedIndex = items.findIndex(item => item.id === draggedItem)
        const targetIndex = items.findIndex(item => item.id === targetId)

        if (draggedIndex === -1 || targetIndex === -1) return

        const newItems = [...items]
        const [draggedItemData] = newItems.splice(draggedIndex, 1)
        newItems.splice(targetIndex, 0, draggedItemData)

        newItems.forEach((item, index) => {
            item.position = index + 1
        })

        setItems(newItems)
        localStorage.setItem('myrank-items', JSON.stringify(newItems))
        setDraggedItem(null)
    }

    const handleExport = () => {
        if (items.length === 0) {
            showFeedback('Nenhum item para exportar!')
            return
        }

        const exportData = items.map(item => ({
            id: item.id,
            name: item.name,
            image: item.image,
            type: item.type,
            rating: item.rating,
            tags: item.tags,
            review: item.review,
            position: item.position,
        }))

        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `myrank-evaluations-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        showFeedback('Exportação realizada com sucesso! ✓')
    }

    const showFeedback = (message: string) => {
        setFeedback(message)
        setTimeout(() => setFeedback(''), 3000)
    }

    const getCategoryLabel = (type: string) => {
        const labels: Record<string, string> = {
            movie: ' Filme',
            series: ' Série',
            book: ' Livro',
        }
        return labels[type] || type
    }

    return (
        <>
            <Loading />
            <Header />
            <main className="page4-ranking">
                {feedback && <div className="eval-feedback">{feedback}</div>}

                <div className="ranking-container">
                    <div className="ranking-header">
                        <div>
                            <h1>Minhas Avaliações</h1>
                            <p className="ranking-subtitle">Seu ranking pessoal organizado e pronto para reordenação</p>
                        </div>
                        <button className="export-btn" onClick={handleExport} title="Exportar como JSON">
                            <img src={Export} alt="Exportar" /> Exportar
                        </button>
                    </div>

                    {editingId ? (
                        // Edit Form
                        <div className="edit-section">
                            <h2>Editar Item</h2>
                            <form onSubmit={handleSaveEdit} className="edit-form">
                                <div className="form-group">
                                    <label htmlFor="edit-name">Nome *</label>
                                    <input
                                        id="edit-name"
                                        type="text"
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                        className="eval-input"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-type">Categoria</label>
                                        <select
                                            id="edit-type"
                                            value={editForm.type}
                                            onChange={e =>
                                                setEditForm({
                                                    ...editForm,
                                                    type: e.target.value as 'movie' | 'series' | 'book',
                                                })
                                            }
                                            className="eval-select"
                                        >
                                            <option value="movie">🎬 Filme</option>
                                            <option value="series">📺 Série</option>
                                            <option value="book">📚 Livro</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="edit-rating">Avaliação ({editForm.rating}/10)</label>
                                        <div className="rating-container">
                                            <input
                                                id="edit-rating"
                                                type="range"
                                                min="0"
                                                max="10"
                                                value={editForm.rating}
                                                onChange={e =>
                                                    setEditForm({ ...editForm, rating: parseInt(e.target.value) })
                                                }
                                                className="eval-slider"
                                            />
                                            <div className="rating-display">
                                                {[...Array(10)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`star-small ${i < editForm.rating ? 'active' : ''}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-image">Imagem</label>
                                    <div 
                                        className="image-upload"
                                        onClick={() => document.getElementById('edit-image')?.click()}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <input
                                            id="edit-image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="eval-file-input"
                                        />
                                        <span className="upload-hint">Clique para selecionar uma imagem</span>
                                    </div>
                                    {imagePreview && (
                                        <div className="eval-image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                            <button
                                                type="button"
                                                className="remove-image-btn"
                                                onClick={() => {
                                                    setImagePreview(null)
                                                    setEditForm({ ...editForm, image: null })
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-tagInput">Tags</label>
                                    <div className="tag-input-wrapper">
                                        <input
                                            id="edit-tagInput"
                                            type="text"
                                            placeholder="Digite uma tag"
                                            value={editForm.tagInput}
                                            onChange={e => setEditForm({ ...editForm, tagInput: e.target.value })}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleAddTag()
                                                }
                                            }}
                                            className="eval-tag-input"
                                        />
                                        <button
                                            type="button"
                                            className="add-tag-btn"
                                            onClick={handleAddTag}
                                        >
                                            +
                                        </button>
                                    </div>
                                    {editForm.tags.length > 0 && (
                                        <div className="eval-tags">
                                            {editForm.tags.map(tag => (
                                                <span key={tag} className="eval-tag">
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTag(tag)}
                                                        className="remove-tag-btn"
                                                    >
                                                        ✕
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-review">Avaliação</label>
                                    <textarea
                                        id="edit-review"
                                        value={editForm.review}
                                        onChange={e => setEditForm({ ...editForm, review: e.target.value })}
                                        className="eval-textarea"
                                        rows={5}
                                    />
                                </div>

                                <div className="form-buttons">
                                    <button type="submit" className="submit-btn-eval">
                                        Salvar Alterações
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-btn-edit"
                                        onClick={handleCancelEdit}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-icon"><img src={Mail} alt="Vazio" /></p>
                            <h2>Nenhuma avaliação ainda</h2>
                            <p>Comece avaliando seus filmes, séries e livros favoritos!</p>
                        </div>
                    ) : (
                        // Ranking List
                        <div className="ranking-list">
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className={`ranking-item ${item.position === 1 ? 'top-ranked' : ''}`}
                                    draggable
                                    onDragStart={() => handleDragStart(item.id)}
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleDrop(item.id)}
                                >
                                    {item.position === 1 && <div className="crown-badge"><img src={crown} alt="Campeão" /></div>}

                                    <div className="item-position"># {item.position}</div>

                                    <div className="item-image-container">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="item-image" />
                                        ) : (
                                            <div className="item-placeholder">📷</div>
                                        )}
                                    </div>

                                    <div className="item-content">
                                        <h3 className="item-title">{item.name}</h3>
                                        <p className="item-category">{getCategoryLabel(item.type)}</p>

                                        <div className="item-rating">
                                            {[...Array(10)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`star-small ${i < item.rating ? 'active' : ''}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            <span className="rating-value">{item.rating}/10</span>
                                        </div>

                                        {item.tags.length > 0 && (
                                            <div className="item-tags">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="item-tag">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {item.review && <p className="item-review">{item.review}</p>}
                                    </div>

                                    <div className="item-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEditClick(item)}
                                            title="Editar"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(item.id)}
                                            title="Deletar"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}