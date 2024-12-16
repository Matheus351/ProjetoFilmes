import styles from "./Home.module.css"
import { useNavigate, Link, Navigate } from "react-router-dom"
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import PostDetail from "../../components/PostDetail"

const Home = () => {

    const [query, setQuery] = useState("")
    const { documents: posts, loading } = useFetchDocuments("posts")
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()


        if (query) {
            console.log(query)
            return navigate(`/search?q=${query}`)
        }
    }

    console.log(posts)

    return (
        <div className={styles.home}>
            <h3>Filmes e Animes assistidos</h3>
            <form className={styles.search_form} onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Busque por filmes..."
                    onChange={(e) => setQuery(e.target.value)} />
                <button className="btn btn-dark">Pesquisar</button>
            </form>

            <div style={{display:"flex",flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
                {/* {loading && <p>Carregando...</p>} */}
                {posts && posts.map((post, index) =>
                    (
                        <PostDetail key={index} post={post}/>
                    )
                  )}

                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados filmes ou animes</p>
                        <Link style={{'backgroundColor':'green','color':'white'}} className="btn-success" to={'/adicionar'}>Adicionar primeiro filme</Link>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home