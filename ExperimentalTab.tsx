import { useEffect, useState } from "react";

// Buena práctica: dejar una constante con la URL de la API
const API_RANDOM_CAT_FACT = 'https://catfact.ninja/fact';

function ExperimentTab() {
    const [fact, setFact] = useState("Aquí va un hecho sobre un gato");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetch(API_RANDOM_CAT_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data;
                setFact(fact);

                // Generar la URL de la imagen con las primeras 3 palabras
                const threeFirstWords = fact.split(' ').slice(0, 3).join(' ');
                const newImage = `https://cataas.com/cat/says/${encodeURIComponent(threeFirstWords)}`;
                setImageUrl(newImage);
            })
    }, []); // Dependencia vacía para que se ejecute una sola vez al montar el componente

    // Estilos en formato de objeto para usar en línea
    const estilo = {
        div: {
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
            margin: "0 auto",
            fontFamily: "Times New Roman, serif",
        },
        button: {
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
        },
        image: {
            marginTop: "20px",
            borderRadius: "10px",
            maxWidth: "300px",
        },
    };

    return (
        <div style={estilo.div}>
            <h1>¡App de gatitos!</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt="Imagen de un gato" style={estilo.image} />}
            <button style={estilo.button} onClick={() => window.location.reload()}>
                Actualizar hecho
            </button>
        </div>
    );
}

export default ExperimentTab;
