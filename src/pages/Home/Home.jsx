import styles from "./Home.module.css"
import { useNavigate, Link, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import PostDetail from "../../components/PostDetail"
import { NavigateBefore } from '@material-ui/icons'
import { NavigateNext } from '@material-ui/icons'
import { use } from "react"

const Home = () => {

    const [query, setQuery] = useState("")
    const { documents: posts, loading } = useFetchDocuments("posts")
    let [filmes, setFilmes] = useState([])
    let [series, setSeries] = useState([])
    let [animes, setAnimes] = useState([])


    const [scrollX, setScrollX] = useState(0)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2)
        if (x > 0) {
            x = 0
        }
        setScrollX(x)
    }

    const handleRightArrow = () => {

        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = posts.length * 150

        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60
        }
        setScrollX(x)
    }




    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()


        if (query) {
            return navigate(`/search?q=${query}`)
        }
    }

    const handlePosts = () => {
        if (posts) {
            let movies = posts.filter(post => post.category == "Filme")
            let animess = posts.filter(post => post.category == "Anime")
            let srs = posts.filter(post => post.category == "Série")
            setFilmes(movies)
            setAnimes(animess)
            setSeries(srs)
        }
    }



    useEffect(() => {
        handlePosts()
    }, [posts])

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

            {posts && filmes && (
                <>
                    <p>Filmes assistidos:<span style={{ color: "green" }}>{filmes.length}</span></p>
                    <p>Séries assistidas:<span style={{ color: "green" }}>{series.length}</span></p>
                    <p>Animes assistidos:<span style={{ color: "green" }}>{animes.length}</span></p>
                </>
            )}
{/* 
    
                    <div id="carouselExampleInterval" className="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div className="carousel-item active">

                                <img className="d-block w-100" src={`${posts[0].image}`} alt="" />
                            </div>
                            {posts && posts.map((post, index) =>
                            (
                                <div className="carousel-item">
                                    <PostDetail key={index} post={post} />
                                </div>

                            )
                            )}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div> */}
        


            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                {loading && <p>Carregando...</p>}
                {posts && posts.map((post, index) =>
                (
                    <PostDetail key={index} post={post} />

                )
                )}

                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados filmes ou animes</p>
                        <Link style={{ 'backgroundColor': 'green', 'color': 'white' }} className="btn-success" to={'/adicionar'}>Adicionar primeiro filme</Link>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home