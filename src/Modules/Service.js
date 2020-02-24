import data from './Data.json'

const addRandomPositon = (operator) => ({
    id: operator.id,
    type: operator.type,
    lat: parseFloat((35.958498 + Math.random() * 0.0004).toFixed(6)),
    lon: parseFloat((39.001213 + Math.random() * 0.0004).toFixed(6)),
})
const GetOperators = () => {
  return new Promise(resolve => setTimeout(() => resolve(data.operators.map(o => addRandomPositon(o))), 2000));
}

const GetOperator = (id) => {
  debugger
  return new Promise(resolve => setTimeout(() => resolve(data.operators.find(o => o.id === id)), 1000));
}
 
export {GetOperator, GetOperators}