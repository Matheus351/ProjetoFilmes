import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./EditPost.module.css"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import { useFetchDocument } from "../../hooks/useFetchDocument"
// import Select from "react-select/dist/declarations/src/Select"
import Select from 'react-select'
const EditPost = () => {


    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [note, setNote] = useState(0)
    const [formError, setFormError] = useState("")
    const [category, setCategory] = useState("Filme")

    const options = [
        { value: 'Filme', label: 'Filme' },
        { value: 'Anime', label: 'Anime' },
        { value: 'Série', label: 'Série' }
    ]


    useEffect(
        () => {

            if (post) {
                setTitle(post.title)
                setBody(post.body)
                setImage(post.image)
                setCategory(post.category)
                setNote(post.note)
            }

        }, [post]
    )



    const { updateDocument, response } = useUpdateDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        setFormError("")

        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisa ser uma url")
        }


        if (!title || !image || !body || !note || !category) {
            setFormError("Por favor, preencha todos os campos")
        }

        if (formError) return;


        const data = {
            title,
            image,
            body,
            category,
            note
        }

        updateDocument(id, data)

        navigate("/")
    }

    return (
        <div className={styles.create_post}>
            {post && (
                <>
                    <h2>Editando: {post.title}</h2>
                    <p>Atualize os dados necessários.</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input type="text" name="title"
                                required
                                placeholder="Nome do Filme..."
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>Categoria:</span>
                            {/* <Select options={options}/> */}
                            {/* <p>{category}</p> */}
                            <select value={category} onChange={e => setCategory(e.target.value)}>
                                {options.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <span>Link da Imagem:</span>
                            <input type="text" name="image"
                                required
                                placeholder="Insira um link para capa..."
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <p className={styles.preview_title}>Preview da Imagem atual:</p>
                        <img className={styles.image_preview} src={post.image} alt="" />
                        <label>
                            <span>Comentário:</span>
                            <textarea name="body"
                                placeholder="Se quiser insira um comentário..."
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            />
                        </label>
                        <label>
                            <span>Nota:</span>
                            <input type="number" name="note"
                                required
                                placeholder="Nota..."
                                onChange={(e) => setNote(e.target.value)}
                                value={note}
                            />
                        </label>
                        {!response.loading && <button className="btn">Atualizar</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                        {/* <button className="btn">Cadastrar</button> */}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost;