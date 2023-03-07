export enum EnvironmentStatus {
  running = 'running',
  stopped = 'stopped'
}

export enum EnvironmentType {
  dev = 'development',
  staging = 'staging',
  production = 'production'
}

export interface Environment {
  key: string
  environmentType: EnvironmentType
  url: string
  status: EnvironmentStatus
  browserOnly: boolean
  whitelist?: string[]
}

export interface Project {
  _id?: string
  userId: string
  name: string
  environments: Environment[]
}
