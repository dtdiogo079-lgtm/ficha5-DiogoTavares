import { useState, useEffect } from "react";
import Card from "./Card.jsx";



function App() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [randomCard, setRandomCard] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("Criatura");
  const [attack, setAttack] = useState("");
  

  useEffect(() => {
    fetch("http://localhost:3000/api/cartas")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  let visible = cards
    .filter((card) => filter === "Todas" || card.type === filter)
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()));

  if (sorted) {
    visible = [...visible].sort((a, b) => b.attack - a.attack);
  }

  function pickRandom() {
    setRandomCard(cards[Math.floor(Math.random() * cards.length)]);
  }
  
 async function handleSubmit(e) {
  e.preventDefault();

  const card = {
    name: name,
    type: type,
    attack: Number(attack),
    defense: 0
  };

  try {
    const response = await fetch("http://localhost:3000/api/cartas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const newCard = await response.json();

    setCards([...cards, newCard]);
    setName("");
    setType("Criatura");
    setAttack("");
  } catch (error) {
    console.error(error);
  }
}


  return (
    <main>
      <h1>A minha coleção</h1>
<h2>Adicionar carta</h2>

<form onSubmit={handleSubmit}>
  <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Nome da carta"
    required
  />

  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
  >
    <option value="Criatura">Criatura</option>
    <option value="Feitiço">Feitiço</option>
    <option value="Estrutura">Estrutura</option>
  </select>

  <input
    type="number"
    value={attack}
    onChange={(e) => setAttack(e.target.value)}
    placeholder="Ataque"
    required
  />

  <button type="submit">Adicionar carta</button>
</form>
      <p>
        Tenho {cards.length} cartas · a mostrar {visible.length}
      </p>

      <div>
        <button onClick={() => setFilter("Todas")}>Todas</button>
        <button onClick={() => setFilter("Criatura")}>Só criaturas</button>
        <button onClick={() => setFilter("Feitiço")}>Só feitiços</button>
        <button onClick={() => setSorted(!sorted)}>
          {sorted ? "Ordem original" : "Ordenar por ataque"}
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Procurar pelo nome…"
      />

      {loading ? (
        <p>A carregar...</p>
      ) : error ? (
        <p>Erro: {error}</p>
      ) : visible.length === 0 ? (
        <p>Nenhuma carta corresponde.</p>
      ) : (
        <ul>
          {visible.map((card) => (
            <Card key={card.name} {...card} />
          ))}
        </ul>
      )}

      <h2>Carta à sorte</h2>
      <button onClick={pickRandom}>Escolher outra</button>
      {randomCard && (
        <p>
          <b>{randomCard.name}</b> — {randomCard.type} · ataque {randomCard.attack} ·
          defesa {randomCard.defense}
        </p>
      )}
    </main>
  );
}

export default App;
