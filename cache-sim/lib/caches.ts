import {
    CacheLine,
    cacheResType,
    memAccessType,
    SimulationResult,
} from "@/Types/cacheTypes";

export const NUM_CYCLES = 1_000_000;
export const DRAM_SIZE = 64 * 1024 * 1024 * 1024; // 64 GB or 2 ^ 36
export const L1_CACHE_SIZE = 16 * 1024; // 16 KB or 2 ^ 14
export const L2_CACHE_SIZE = 128 * 1024; // 128 KB or 2 ^ 17
export const L1_WAYS = 4;
export const L2_WAYS = 8;
export const L2_LINE_SIZE = 64;
let m_w = 0xababab55; // must not be zero, nor 0x464fffff
let m_z = 0x05080902; // must not be zero, nor 0x9068ffff
let cycles = 0;
let Cache1: CacheLine[][] = [];
let Cache2: CacheLine[][] = [];
let memGen1_staticAddr = 0;
let memGen4_staticAddr = 0;
let memGen5_staticAddr = 0;

export function AccessCacheL1(
    addr: number,
    lineSize: number,
    isWrite: boolean = false
): cacheResType {
    const Index = Math.floor((addr / lineSize) % Cache1.length);
    const Tag = Math.floor(addr / lineSize / Cache1.length);
    // Check if the cache line is already present
    for (let i = 0; i < Cache1[Index].length; i++) {
        if (Cache1[Index][i].valid && Cache1[Index][i].tag === Tag) {
            Cache1[Index][i].dirty = Cache1[Index][i].dirty || isWrite; //fix 1
            return cacheResType.HIT;
        }
    }

    // If not found, check for an empty line
    for (let i = 0; i < Cache1[Index].length; i++) {
        if (!Cache1[Index][i].valid) {
            Cache1[Index][i].tag = Tag;
            Cache1[Index][i].valid = true;
            Cache1[Index][i].dirty = false; // no
            return cacheResType.MISS;
        }
    }
    // If no empty line, evict a random line
    const randInd = Math.floor(rand_() % Cache1[Index].length);
    if (Cache1[Index][randInd].dirty) {
        // Write back to L2 if dirty
        // make an address to access L2 cache
        const writeBackAddr =
            (Cache1[Index][randInd].tag * Cache1.length + Index) * lineSize; //fix if needed
        AccessCacheL2(writeBackAddr, L2_LINE_SIZE, true);
    }
    Cache1[Index][randInd].tag = Tag;
    Cache1[Index][randInd].valid = true;
    Cache1[Index][randInd].dirty = false; // Mark as dirty if write
    return cacheResType.MISS;
}
export function AccessCacheL2(
    addr: number,
    lineSize: number,
    isWrite: boolean = false
): cacheResType {
    const Index = Math.floor((addr / lineSize) % Cache2.length);
    const Tag = Math.floor(addr / lineSize / Cache2.length);
    // Check if the cache line is already present
    for (let i = 0; i < Cache2[Index].length; i++) {
        if (Cache2[Index][i].valid && Cache2[Index][i].tag === Tag) {
            Cache2[Index][i].dirty = Cache2[Index][i].dirty || isWrite; //fix 1
            return cacheResType.HIT;
        }
    }
    // If not found, check for an empty line
    for (let i = 0; i < Cache2[Index].length; i++) {
        if (!Cache2[Index][i].valid) {
            Cache2[Index][i].tag = Tag;
            Cache2[Index][i].valid = true;
            Cache2[Index][i].dirty = false;
            return cacheResType.MISS;
        }
    }
    // If no empty line, evict a random line
    const randInd = Math.floor(rand_() % Cache2[Index].length);

    Cache2[Index][randInd].tag = Tag;
    Cache2[Index][randInd].valid = true;
    Cache2[Index][randInd].dirty = false; // Mark as dirty if write

    return cacheResType.MISS;
}
export function Simulator(lineSize: number, generator: number) {
    reset();
    let l1_hit = 0;
    let l2_hit = 0;
    let l1_miss = 0;
    let l2_miss = 0;

    //Params
    const cache1_lineCount = L1_CACHE_SIZE / (lineSize * L1_WAYS);
    const cache2_lineCount = L2_CACHE_SIZE / (L2_LINE_SIZE * L2_WAYS);
    // console.log("Gen", generator, " lineSize ", lineSize)
    // console.log("cache1lines:", cache1_lineCount);
    // console.log("cache2lines:", cache2_lineCount);

    // initiliaze the caches
    Cache1 = Array.from({ length: cache1_lineCount }, () =>
        Array.from({ length: L1_WAYS }, () => ({
            tag: 0,
            valid: false,
            dirty: false,
        }))
    );
    Cache2 = Array.from({ length: cache2_lineCount }, () =>
        Array.from({ length: L2_WAYS }, () => ({
            tag: 0,
            valid: false,
            dirty: false,
        }))
    );
    // Running the simulation
    for (let i = 0; i < NUM_CYCLES; i++) {
        let memAccess = 0;
        const p = Math.random(); // random value between 0 and 1
        if (p <= 0.35) {
            const addr = getAddrByGenType(generator);
            const rdwr = Math.random();
            if (rdwr < 0.5) memAccess = memAccessType.Read;
            else memAccess = memAccessType.Write;


            if (AccessCacheL1(addr, lineSize, memAccess === memAccessType.Write)) {
                l1_hit++;
                cycles++;
            } else if (
                AccessCacheL2(addr, L2_LINE_SIZE, memAccess === memAccessType.Write)
            ) {
                l2_hit++;
                l1_miss++;
                if (memAccess === memAccessType.Write) cycles += 10 + 1;
                else cycles += 10 + 1 + 1; // Read hit in L2
            } else {
                l1_miss++;
                l2_miss++;
               if (memAccess === memAccessType.Write) cycles += 50 + 1+10;
                else cycles += 50 +10+ 1 + 1; // Read hit in L2
            }
        } else cycles++;
    }
    const cpi = cycles / NUM_CYCLES;
    const result: SimulationResult = {
        l1_hit,
        l1_miss,
        l2_hit,
        l2_miss,
        cpi,
    };
    return result;
}

export function reset() {
    Cache1 = [];
    Cache2 = [];
    cycles = 0;
    memGen1_staticAddr = 0;
    memGen4_staticAddr = 0;
    memGen5_staticAddr = 0;
}
export function getAddrByGenType(genType: number): number {
    switch (genType) {
        case 1:
            return memGen1();
        case 2:
            return memGen2();
        case 3:
            return memGen3();
        case 4:
            return memGen4();
        case 5:
            return memGen5();
        default:
            return 0;
    }
}

export function rand_(): number {
    m_z = (36969 * (m_z & 0xffff) + (m_z >>> 16)) >>> 0;
    m_w = (18000 * (m_w & 0xffff) + (m_w >>> 16)) >>> 0;
    return ((m_z << 16) + m_w) >>> 0; // 32-bit unsigned result
}
export function memGen1(): number {
    // Sequential access, wraps around DRAM_SIZE
    return memGen1_staticAddr++ % DRAM_SIZE;
}
export function memGen2(): number {
    // Random access within 24KB
    return rand_() % (24 * 1024);
}
export function memGen3(): number {
    // Random access within DRAM_SIZE, but with a static address for sequential wrap
    return rand_() % DRAM_SIZE;
}
export function memGen4(): number {
    // Sequential access, wraps around 4KB
    return memGen4_staticAddr++ % (4 * 1024);
}
export function memGen5(): number {
    // Strided access, stride of 32, wraps around 1MB
    memGen5_staticAddr = (memGen5_staticAddr + 32) % (1024 * 1024);
    return memGen5_staticAddr;
}
