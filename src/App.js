import React, { useEffect, useState } from "react";

function App() {
  const [results, setResults] = useState([]);
  console.log(results);
  const fetchResults = async () => {
    const url =
      "https://api.api-tennis.com/tennis/?method=get_livescore&APIkey=bbc7766190baa45d7af5044559b93fc8d8d5b7e3d6b863e43122e29f3e7e6a46";
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.dir(result.result);

      // Filter and sort the results array
      const filteredResults = result.result?.filter((match) => {
        const scores = match.scores;
        if (scores && scores.length > 0) {
          const scoreFirst = parseInt(scores[0].score_first);
          const scoreSecond = parseInt(scores[0].score_second);
          return scoreFirst > 4 && scoreSecond > 4;
        }
        return false;
      });

      const sortedResults = filteredResults?.sort((a, b) => {
        const scoreFirstA = parseInt(a.scores[0].score_first);
        const scoreSecondA = parseInt(a.scores[0].score_second);
        const scoreFirstB = parseInt(b.scores[0].score_first);
        const scoreSecondB = parseInt(b.scores[0].score_second);
        return scoreFirstA + scoreSecondA - (scoreFirstB + scoreSecondB);
      });


      
      setResults(sortedResults);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <h2>СТАВЬ НА ПЕНИС </h2>

      {results?.map((match) => (
        <div key={match.fixture}>
          <p style={{ color: "red" }}>не забудь проверить кефы</p>
          <p style={{ color: "orange" }}>Матч: {match.tournament_round}</p>
          <p>Хуило 1: {match.event_first_player}</p>
          <p>Хуило 2: {match.event_second_player}</p>
          <p>
            Счет первого сета: {match.scores[0].score_first}-
            {match.scores[0].score_second}
          </p>
          <p style={{ color: "green" }}>
            ставь на второй сет тотал меньше 9.5 если фаворит играет с
            аутсайдером
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
