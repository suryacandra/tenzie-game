import React from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
 
function App() {
  const [dice, setDice] = React.useState(newDice)
  const [tenzie, setTenzie] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [total, setTotal] = React.useState(0)


  React.useEffect(() => {
    const everyHeld = dice.every(item => item.isHeld)
    const fistDice = dice[0].value
    const everyDice = dice.every(item => item.value === fistDice)
    

    if(everyDice && everyHeld) {
      setTenzie(true)
    }

  }, [dice])

  function generateDice() {
    return {value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()}
  }

  function newDice(){
    const newArray = []
    for(let i = 0; i < 10; i++){
      newArray.push(generateDice())
    }
    return newArray
  }

  function rollDice(){
    setDice(item => 
      item.map(tom => 
        tom.isHeld ? tom : generateDice()
        )
    )
    setCount(prev => prev + 1)
  }

  function holdDice(id){
    setDice(item => 
      item.map(tom => 
          tom.id === id ? {...tom, isHeld: !tom.isHeld} : tom
        )
    )
  }

  function newGame() {
    setDice(newDice())
    setTenzie(false)
    setCount(0)
    setTotal(prev => {
      if(prev === 0) return count
      if(prev > count) return count
      if(prev < count) return prev
    })
  }

  const showElement = dice.map(item => 
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      toggle={() => holdDice(item.id)}
    />
  )



  return (
    <div className="m-2 mt-[25%] sm:mt-20 p-5 border-2 border-black rounded-lg bg-slate-600 sm:w-3/4 sm:mx-auto">
      {tenzie && <Confetti />}
      <main className="flex flex-col">
        <div className="flex flex-col items-center mb-5 bg-slate-300 rounded-lg p-5 sm:w-1/2 sm:self-center">
          <h1 className="text-4xl font-mono tracking-wider">Tenzies</h1>
          <p className="text-center">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-2 items-center text-center sm:w-1/2 sm:gap-1 sm:mx-auto">
        {showElement}
        </div>
        {tenzie ? 
        <button onClick={newGame} className="mt-2 bg-lime-500 w-1/2 rounded-xl p-1 self-center sm:w-1/4">Reset Game</button> : 
        <button onClick={rollDice} className="mt-2 bg-lime-500 w-1/2 rounded-xl p-1 self-center sm:w-1/4">Roll</button>}
       {tenzie && <div className="bg-slate-300 border-2 border-black w-1/2 mx-auto mt-5 rounded-lg p-2">
          <p className="text-center">YOU WOOOOOOON</p>
        </div>}
        <div className="bg-slate-300 border-2 border-black w-1/2 mt-10 mx-auto rounded-lg p-2">
          <p className="text-center">Dice Rolled : {count}</p>
          <p className="text-center">Best Score : {total} {total === 0 ? '' : 'Roll'}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
