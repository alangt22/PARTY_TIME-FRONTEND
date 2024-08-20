import partFetch from "../axios/config"

import { useState, useEffect } from "react"

import { Link } from "react-router-dom"

import "./Home.css"

const Home = () => {
    const [parties, setParties] = useState(null)

    // load parties
    useEffect(() => {
        const loadParties = async () => {
            const res = await partFetch.get("/parties")
            
            setParties(res.data)
        }
        loadParties()
    }, [])

    if(!parties) return <p>Carregando...</p>

  return (
    <div className="home">
        <h1>Suas Festas</h1>
        <div className="parties-container">
            {parties.length === 0 && <p>Não ha festas cadastradas!</p>}
            {parties.map((party) => (
                <div className="party" key={party._id}>
                    <img src={party.image} alt={party.title} />
                    <h3>{party.title}</h3>
                    <Link to={`/party/${party._id}`} className="btn-secondary" >
                        Detalhes
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home