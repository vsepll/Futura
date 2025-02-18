"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

const fonts = [
  { name: "Space Grotesk", value: "var(--font-space-grotesk)" },
  { name: "Syne", value: "var(--font-syne)" },
  { name: "Inter", value: "var(--font-inter)" },
]

export function FontSelector() {
  const [selectedFont, setSelectedFont] = useState(fonts[0])

  useEffect(() => {
    document.body.style.setProperty("--font-body", selectedFont.value)
  }, [selectedFont])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
          {selectedFont.name}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white rounded-md shadow-lg p-1 min-w-[180px]">
          {fonts.map((font) => (
            <DropdownMenu.Item
              key={font.name}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
              onSelect={() => setSelectedFont(font)}
            >
              {font.name}
              {selectedFont.name === font.name && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

