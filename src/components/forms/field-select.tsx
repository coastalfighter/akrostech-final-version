'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/**
 * FieldSelect — the M2 Select composed for use inside a Field.
 * Accepts the id/aria props Field clones onto its children.
 */

export function FieldSelect({
  value,
  onValueChange,
  placeholder,
  options,
  id,
  surface = 'dark',
}: {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
  id?: string
  surface?: 'light' | 'dark'
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} data-surface={surface}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent data-surface={surface}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
