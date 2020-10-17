import { Dispatch, SetStateAction, useState } from 'react'

export default function(): [string, Dispatch<SetStateAction<string>>] {
  const [currentTab, setCurrentTab] = useState('swap')
  return [currentTab, setCurrentTab]
}
