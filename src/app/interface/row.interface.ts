export interface Row {
    user_name: string,
    record_count: number,
    cpu_used_mhz: number,
    rank_score: number,
    memory_used_mb: number,
    page_used_mb: number,
    total_io_bps: number,
    total_iops: number,
    net_total_bps: number,
    cpu_context_switching_avg: number,
    swap_page_faults: number,
    page_faults: number,
    node_count: number,
    user_count: number,
    cid_seconds: number
}
