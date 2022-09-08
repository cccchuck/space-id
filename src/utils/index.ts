import axios from 'axios'
import fs from 'fs'

const findSpecifiedIsRegisted = async (ID: string) => {
  const url = 'https://backend.prd.space.id/nameof'
  const data = {
    ChainID: 56,
    name: ID,
  }

  const res = await axios.post(url, data)

  if (res.status === 200) {
    return res.data.Owner === ''
  } else {
    throw new Error('Request Error')
  }
}

const IDs: string[] = []

const init = async () => {
  for (let i = 0; i <= 999; i++) {
    const ID = i.toString().padStart(3, '0')
    const result = await findSpecifiedIsRegisted(ID)
    result && IDs.push(ID)
    console.log(`${ID} 可注册情况: ${result ? '✅' : '❌'}`)
  }

  // for (const ID of IDs) {
  //   const result = await findSpecifiedIsRegisted(ID)
  //   console.log(`${ID} 可注册情况: ${result ? '✅' : '❌'}`)
  // }
  fs.writeFileSync('../data/3d.json', JSON.stringify(IDs))
}

init()
