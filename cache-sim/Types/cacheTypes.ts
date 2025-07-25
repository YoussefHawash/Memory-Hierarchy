export enum cacheResType {
  MISS = 0,
  HIT = 1,
}
export enum memAccessType {
  Read = 0,
  Write = 1,
}
export interface CacheLine {
  tag: number;
  valid: boolean;
  dirty: boolean;
}
export interface SimulationResult {
  l1_hit: number;
  l1_miss: number;
  l2_hit: number;
  l2_miss: number;
  cpi: number;
  l1wb: number;
  l2wb: number;
}
export interface FinalResults {
  CPI: number;
  Generator: number;
  LineSize: number;
  L1_Hit: number;
  L1_Miss: number;
  L2_Hit: number;
  L2_Miss: number;
  L1_WriteBacks: number;
  L2_WriteBacks: number;

  L1_MissRate: number;
  L2_MissRate: number;
}
