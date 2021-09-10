import './App.css'
import Quotes from './components/QuotesWithUseApiStatusHook'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React API Workshop</h1>
      </header>
      <main className="container mx-auto mt-8">
        <Quotes />
      </main>
    </div>
  )
}

export default App
