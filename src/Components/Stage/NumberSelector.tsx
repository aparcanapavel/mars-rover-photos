// TO DELETE
'use client';
import { useState } from 'react'

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

const NumberSelector = ({ solTotal }: { solTotal: number }) => {

  const [selected, setSelected] = useState(1);

  return (
    <div className="w-72 flex flex-row items-center mt-2">
      <input
        type="number"
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="sol-number-selector"
      />
      <p className='mx-2'>of {solTotal}</p>
    </div>
  )
}

export default NumberSelector;