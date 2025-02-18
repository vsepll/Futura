import type React from "react"

interface AddEnvironmentVariablesProps {
  names: string[]
}

export const AddEnvironmentVariables: React.FC<AddEnvironmentVariablesProps> = ({ names }) => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
      <p className="font-bold">Environment Variables Required</p>
      <p>Please add the following environment variables to your project:</p>
      <ul className="list-disc list-inside">
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

