export const NUM_CYCLES = 1_000_000;
export const DRAM_SIZE = 64 * 1024; // 64 GB or 2 ^ 36
export const L1_CACHE_SIZE = 4 * 1024; // 16 KB or 2 ^ 14
export const L2_CACHE_SIZE = 256 * 1024; // 128 KB or 2 ^ 17
export const L1_WAYS = 2;
export const L2_WAYS = 8;

export enum cacheResType {
    MISS = 0,
    HIT = 1,
}
export interface CacheLine {
    tag: number;
    valid: boolean;
    dirty: boolean;
}
let m_w = 0xababab55; // must not be zero, nor 0x464fffff
let m_z = 0x05080902; // must not be zero, nor 0x9068ffff

export function rand_(): number {
    m_z = (36969 * (m_z & 0xffff) + (m_z >>> 16)) >>> 0;
    m_w = (18000 * (m_w & 0xffff) + (m_w >>> 16)) >>> 0;
    return ((m_z << 16) + m_w) >>> 0; // 32-bit unsigned result
}

export function memGen1(): number {
    // Sequential access, wraps around DRAM_SIZE
    let staticAddr = (function () {
        let addr = 0;
        return () => addr++ % DRAM_SIZE;
    })();
    return staticAddr();
}

export function memGen2(): number {
    // Random access within 24KB
    return rand_() % (24 * 1024);
}

export function memGen3(): number {
    // Random access within DRAM_SIZE
    return rand_() % DRAM_SIZE;
}

export function memGen4(): number {
    // Sequential access, wraps around 4KB
    let staticAddr = (function () {
        let addr = 0;
        return () => addr++ % (4 * 1024);
    })();
    return staticAddr();
}

export function memGen5(): number {
    // Strided access, stride of 32, wraps around 1MB
    let staticAddr = (function () {
        let addr = 0;
        return () => (addr += 32) % (64 * 16 * 1024);
    })();
    return staticAddr();
}

//Direct Mapped Cache Simulator
export function setAssociativeSim(
    addr: number,
    lineSize: number,
    cache: CacheLine[][]
): cacheResType {
    const Index = (addr / lineSize) % cache.length;
    const Tag = addr / lineSize / cache.length;
    for (let i = 0; i < cache[Index].length; i++) {
        if (cache[Index][i].valid) {
            if (cache[Index][i].tag == Tag) return cacheResType.HIT;
        }
    }
    for (let i = 0; i < cache[Index].length; i++) {
        if (!cache[Index][i].valid) {
            cache[Index][i].tag = Tag;
            cache[Index][i].valid = true;
            return cacheResType.MISS;
        }
    }
    const randInd = Math.floor(rand_() % cache[Index].length);
    cache[Index][randInd].tag = Tag;
    cache[Index][randInd].valid = true;
    return cacheResType.MISS;
}
export function main(lineSize: number) {
    //Params
    const L1_LineSize = lineSize;
    const cache1_lineCount = L1_CACHE_SIZE / (L1_LineSize * 4);
    const cache2_lineCount = L2_CACHE_SIZE / (64 * 8);
    // initiliaze the caches
    const Cache1: CacheLine[][] = Array.from({ length: cache1_lineCount }, () =>
        Array.from({ length: 4 }, () => ({
            tag: 0,
            valid: false,
            dirty: false,
        }))
    );
    const Cache2: CacheLine[][] = Array.from({ length: cache2_lineCount }, () =>
        Array.from({ length: 8 }, () => ({
            tag: 0,
            valid: false,
            dirty: false,
        }))
    );
}
export function Simulator1(lineSize: number, cache: CacheLine[][]) {
    let cycles = 0;
    for (let i = 0; i < NUM_CYCLES; i++) {
        let memAccessType = 0;
        const p = Math.random(); // random value between 0 and 1
        if (p <= 0.35) {
            const addr = memGen1();
            const rdwr = Math.random();
            if (rdwr < 0.5) memAccessType = 0;
            else memAccessType = 1;
            if (setAssociativeSim(addr, lineSize, cache)) cycles++;
            else {
                cycles += 1;
            }
        } else cycles++;
    }
    return cycles / NUM_CYCLES;
}