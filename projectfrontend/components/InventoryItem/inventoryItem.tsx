import React from 'react'

interface InventoryItems {
    sr: number,
    materialName: string,
    materialWeight: number,
    yarnSpecs: {
        yarnPly: number,
        yarnMaterial: string,
        yarnColor: string,
        yarnGauge: string
    }
}

const InventoryItem = () => {
  return (
    <div>
        <h1></h1>
    </div>
  )
}

export default InventoryItem
