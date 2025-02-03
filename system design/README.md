# Back-of-the-Envelope Calculations in System Design

Back-of-the-envelope calculations are quick, rough estimates used in system design to:

- Approximate system requirements
- Validate design decisions
- Identify potential bottlenecks

## Common Calculations

### Traffic Estimates
- Daily Active Users (DAU)
- Requests per second (RPS)
- Query per second (QPS)

### Storage Estimates
- Data size per record
- Total storage needed
- Growth rate

### Bandwidth Estimates
- Inbound data rate
- Outbound data rate
- Network capacity requirements

### Memory Estimates
- Cache size
- RAM requirements
- Buffer calculations

## Example
```
DAU = 1 million users
Requests per user = 50 per day
RPS = (1M * 50) / (24 * 3600) ≈ 580 requests/second
```

## Common Numbers to Remember

### Latency Numbers
- Memory access: ~100ns
- SSD random read: ~100μs
- Network roundtrip within same datacenter: ~500μs
- HDD random read: ~10ms
- Network roundtrip cross-continental: ~150ms

### Data Size Units
- 1 byte = 8 bits
- 1 KB = 1,024 bytes
- 1 MB = 1,024 KB
- 1 GB = 1,024 MB
- 1 TB = 1,024 GB

### Common Object Sizes
- Text character: 1 byte
- Short text message: ~100 bytes
- Image thumbnail: ~10 KB
- Average image: ~200 KB
- HD image: ~2 MB
- 1 minute HD video: ~50 MB

## Detailed Examples

### Storage Calculation Example
```
Problem: Calculate storage needed for a social media post
Assumptions:
- 1M new posts per day
- Each post has:
  - Text (300 chars) = 300 bytes
  - Metadata (timestamp, user ID, etc.) = 100 bytes
  - Image (average) = 200 KB

Daily storage = 1M * (300 + 100 + 200KB) bytes
              ≈ 1M * 200KB (image dominates)
              ≈ 200GB per day
Annual storage = 200GB * 365 ≈ 73TB
With 3x replication = 219TB
```

### Bandwidth Calculation Example
```
Problem: Calculate bandwidth for video streaming
Assumptions:
- 100K concurrent users
- Video bitrate: 2 Mbps (SD quality)
- Peak to average ratio: 1.5

Required bandwidth = Users * Bitrate * Peak ratio
                  = 100K * 2Mbps * 1.5
                  = 300 Gbps
```

## Best Practices
- Use powers of 2 and 10
- Round numbers for simplicity
- Document assumptions
- Include safety margins

## Tips for Accuracy
- Start with clear assumptions
- Break down complex calculations
- Consider scaling factors
- Account for overhead and redundancy
- Include capacity planning buffer (usually 30-50%)

## Quick Conversion Tables

### Powers of 10
```
10⁰ = 1
10³ = 1,000 (thousand)
10⁶ = 1,000,000 (million)
10⁹ = 1,000,000,000 (billion)
10¹² = 1,000,000,000,000 (trillion)
```

### Time Conversions (Base 10)
```
1 second = 1,000 milliseconds (ms)
1 second = 1,000,000 microseconds (μs)
1 second = 1,000,000,000 nanoseconds (ns)

1 minute = 60 seconds
1 hour = 3,600 seconds
1 day = 86,400 seconds
1 month (30 days) = 2.592 × 10⁶ seconds
1 year = 31.536 × 10⁶ seconds
```

### Data Size Conversions (Base 10 & 2)
```
Base 10 (SI)          Base 2 (Binary)
1 KB = 1,000 B        1 KiB = 1,024 B
1 MB = 1,000 KB       1 MiB = 1,024 KiB
1 GB = 1,000 MB       1 GiB = 1,024 MiB
1 TB = 1,000 GB       1 TiB = 1,024 GiB

Quick conversions:
1 KB = 10³ bytes
1 MB = 10⁶ bytes
1 GB = 10⁹ bytes
1 TB = 10¹² bytes
```

### Network Speed Conversions (Base 10)
```
1 Gbps = 10³ Mbps
1 Mbps = 10³ Kbps
1 Mbps = 10⁵ bytes/s
1 Gbps = 10⁸ bytes/s

Examples:
10 Gbps = 10⁹ bytes/s
100 Mbps = 10⁷ bytes/s
```

### Common System Design Numbers in Powers of 10
```
Daily seconds = 86,400 ≈ 10⁵
Monthly seconds ≈ 2.6 × 10⁶
Yearly seconds ≈ 3.15 × 10⁷

QPS examples:
Small service: 10² QPS
Medium service: 10⁴ QPS
Large service: 10⁶ QPS
Very large service: 10⁷+ QPS
```

### Quick Power of 2s
```
2¹⁰ = 1,024
2²⁰ = 1,048,576
2³⁰ = 1,073,741,824
2⁴⁰ = 1,099,511,627,776
```

## Using Powers of 2 in Practice

### Memory and Storage Calculations
```
Problem: Calculate RAM needed for a cache of 1 million objects
Each object: 
- Key: 8 bytes (64-bit hash)
- Value: 256 bytes
- Overhead: 32 bytes

Solution using powers of 2:
Total per entry = 8 + 256 + 32 = 296 bytes
Round up to 2⁸ = 256 for easy calculation
≈ 2⁸ bytes × 2²⁰ entries (1M is close to 2²⁰)
= 2²⁸ bytes
= 256 MB
Add 30% overhead: ≈ 350 MB
```

### Database Sharding
```
Problem: Design sharding scheme for user data
Users: 100 million (near 2²⁷)

Solution using powers of 2:
Choose shard key bits: 2⁸ = 256 shards
Users per shard ≈ 2²⁷/2⁸ = 2¹⁹ ≈ 500K users

Benefits:
- Even distribution
- Easy to split further (just add 1 bit)
- Maps well to binary operations
```

### Memory Alignment
```
Problem: Calculate actual storage for structs/objects

Example struct:
- bool: 1 byte
- int: 4 bytes
- pointer: 8 bytes

Memory alignment (power of 2):
- Round to nearest 2^n
- Common alignments: 2, 4, 8 bytes
Actual size = 16 bytes (not 13)
```

### When to Use Powers of 2
- Memory allocation
- Buffer sizes
- Sharding/partitioning
- Hash table sizes
- Network packet sizes
- File system block sizes
- Database page sizes

### Benefits
- Efficient computer operations
- Better memory alignment
- Optimized storage utilization
- Natural scaling boundaries
- Compatible with binary operations