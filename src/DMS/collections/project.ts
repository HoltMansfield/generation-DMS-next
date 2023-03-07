export enum EnvironmentStatus {
  running = 'running',
  stopped = 'stopped'
}

export enum EnvironmentType {
  dev = 'dev',
  staging = 'staging',
  production = 'production'
}

export interface Environment {
  environmentType: EnvironmentType
  status: EnvironmentStatus
  key: string
  browserOnly: boolean
  whitelist?: string[]
}

export interface Project {
  _id?: string
  userId: string
  name: string
  environments: Environment[]
}
