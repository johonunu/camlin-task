export interface Transformer {
  assetId: number
  name: string
  region: string
  health: string
  lastTenVoltgageReadings: VoltgageReading[]
}

export interface VoltgageReading {
  timestamp: string
  voltage: string
}

export interface TableColumn {
  name: string
  label: string
  filter?: string
}

export interface TableColumnFilter {
  name: string
  value: string
}

export interface UserState {
  filters: Record<string, string>
  sort: {
    field: string | null
    direction: SortDirection
  }
  chartSelected: number[]
  darkMode: boolean
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}
