export enum ServerStates {
  error,
  saving,
  loaded
}

export enum CacheTimes {
  hour_1 = 1000 * 60 * 60,
  hour_2 = 1000 * 60 * 60 * 2,
  hour_3 = 1000 * 60 * 60 * 3,
  hour_4 = 1000 * 60 * 60 * 4,
  minutes_5 = 1000 * 60 * 5,
  minutes_30 = 1000 * 60 * 30,
}
