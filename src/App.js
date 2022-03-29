import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cripto, setCripto] = useState(0);
  const [exchange, setExchange] = useState(0);
  const onSelect = (event) => {
    setCripto(() =>
      (event.target.value.replace(/[^0-9]/g, "") / 100).toFixed(2)
    );
  };
  const onChange = (event) => {
    setExchange(() => (cripto === 0 ? 0 : event.target.value / cripto));
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Coins ({loading ? null : coins.length})</h1>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <div>
          <select onChange={onSelect}>
            <option>--- Choose Coin ---</option>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}) $
                {(Math.round(coin.quotes.USD.price * 100) / 100).toFixed(2)}
              </option>
            ))}
          </select>
          <hr />
          <div>
            <input
              onChange={onChange}
              type="text"
              placeholder="Input your budget(USD)"
            ></input>
          </div>
          <div>
            <input readOnly value={exchange} type="text"></input>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
