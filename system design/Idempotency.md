# Idempotency in System Design

## What is Idempotency?
Idempotency means that making the same request multiple times has the same effect as making it once. The state of the system remains the same whether an operation is performed once or multiple times.

## Examples

### Idempotent Operations
```
- HTTP GET: Reading data doesn't change state
- HTTP PUT: Setting a value remains same if repeated
- HTTP DELETE: Deleting once or multiple times has same result
- Math: x * 0 = 0 (multiply by zero is idempotent)
```

### Non-Idempotent Operations
```
- HTTP POST: Creating new resource each time
- Math: x + 1 (increment is not idempotent)
- Bank deposits: Adding money multiple times changes balance
```

## Implementation Patterns

### 1. Idempotency Keys
```
Request:
POST /api/payment
Headers:
  Idempotency-Key: 123e4567-e89b-12d3-a456-426614174000
Body:
  amount: 100
  currency: "USD"
```

### 2. Request Deduplication
```
Steps:
1. Generate unique request ID
2. Store in cache/database
3. Check before processing
4. Return cached response if exists
```

### 3. State Machine Pattern
```
States:
INITIATED -> PROCESSING -> COMPLETED/FAILED

Rules:
- Can't transition from COMPLETED to PROCESSING
- Multiple requests in COMPLETED stay COMPLETED
```

## Best Practices

### Design Guidelines
1. Use unique identifiers
   - UUIDs
   - Transaction IDs
   - Timestamp + ClientID combinations

2. Handle Timeouts
   - Store attempt status
   - Implement retry mechanisms
   - Use exponential backoff

3. Storage Considerations
   - Keep idempotency records
   - Define TTL for records
   - Clean up old records

### Example Implementation
```
@Idempotent(key = "#{request.orderId}")
public Order processOrder(OrderRequest request) {
    // Check if already processed
    if (idempotencyStore.exists(request.orderId)) {
        return idempotencyStore.getResult(request.orderId);
    }

    // Process order
    Order result = orderService.process(request);

    // Store result
    idempotencyStore.save(request.orderId, result);
    return result;
}
```

## Common Use Cases

### Payment Processing
```
- Payment submission
- Refund requests
- Subscription renewals
```

### Distributed Systems
```
- Message queue consumers
- Event processing
- API gateway requests
```

### Data Processing
```
- ETL operations
- Batch processing
- Data migration
```

## Challenges and Solutions

### Race Conditions
```
Solution:
- Use distributed locks
- Implement optimistic locking
- Maintain transaction logs
```

### Storage Overhead
```
Strategies:
- TTL-based cleanup
- Partitioned storage
- Rolling windows
```

### System Failures
```
Recovery:
- Transaction logs
- State reconciliation
- Retry queues
```

## Monitoring and Maintenance

### Key Metrics
```
- Duplicate request rate
- Storage usage
- Processing time deltas
- Recovery success rate
```

### Health Checks
```
- Idempotency store status
- Lock manager health
- Storage cleanup status
- Request correlation logs
```
