const CURRENCIES = ['USD', 'EUR', 'RUB', 'KGS', 'KZT', 'CNY', 'GBP', 'TRY']

export default function ConverterForm({ rates, amount, from, to, result, lastUpdate, onAmountChange, onFromChange, onToChange, onSwap }) {
  return (
    <div className="inner_converter">
      <div className="converter_row">
        <label>Сумма</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={e => onAmountChange(e.target.value)}
        />
      </div>

      <div className="converter_row">
        <label>Из</label>
        <select value={from} onChange={e => onFromChange(e.target.value)}>
          {CURRENCIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <button
          className="btn"
          style={{ width: '60px', height: '50px', fontSize: '22px' }}
          onClick={onSwap}
        >
          ⇄
        </button>
        <select value={to} onChange={e => onToChange(e.target.value)}>
          {CURRENCIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <label>В</label>
      </div>

      <div className="converter_result">
        {result !== null
          ? <>{amount} {from} = <strong>{result} {to}</strong></>
          : '—'
        }
      </div>

      <div className="converter_rates">
        {CURRENCIES.filter(c => c !== 'USD').map(c => (
          <span key={c} style={{ marginRight: '16px' }}>
            1 USD = {rates[c]?.toFixed(2)} {c}
          </span>
        ))}
        {lastUpdate && <div style={{ marginTop: '6px' }}>Обновлено: {lastUpdate}</div>}
      </div>
    </div>
  )
}
