import React from "react";
import {  useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  
  const navigate = useNavigate();

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor as string;;
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = styles.button.backgroundColor as string;;
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>EcoFootprint</h1>
        <p style={styles.tagline}>
          Il tuo primo passo verso una vita consapevole e un'impronta ecologica
          più leggera!
        </p>
      </header>

      <main style={styles.mainContent}>
        <section>
          <h2 style={styles.welcomeMessage}>Benvenuto!</h2>
          <p>
            EcoFootprint è un'applicazione che ti aiuta a monitorare le tue
            azioni e il loro impatto sull'ambiente. Inserisci i dati sulle tue
            abitudini quotidiane e scopri come puoi contribuire a rendere il
            mondo più pulito e verde.
          </p>
        </section>

        <section style={styles.buttonsContainer}>
          <button
            style={styles.button}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={() => navigate("/registration")}
          >
            Registrati
          </button>
          <button
            style={styles.button}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={() => navigate("/login")}
          >
            Accedi
          </button>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>EcoFootprint © 2024. Proteggiamo la natura insieme!</p>
      </footer>
    </div>
  );
};

export default HomePage;


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5em",
    color: "#2d6a4f",
  },
  tagline: {
    fontSize: "1.2em",
    color: "#52796f",
  },
  mainContent: {
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  welcomeMessage: {
    fontSize: "1.8em",
    color: "#2d6a4f",
    marginBottom: "10px",
  },
  buttonsContainer: {
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#2d6a4f",
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "5px",
    fontSize: "1em",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#52796f",
  },
  footer: {
    marginTop: "20px",
    fontSize: "0.9em",
    color: "#52796f",
  },
};