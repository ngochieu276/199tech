*FUNCTIONAL_REQUIREMENTS*

    1.Score Increment
    2.Top 10 Leaderboard
    3.Live Updates

*NON_FUNCTIONAL_REQUIREMENTS*

    1.Security Measures
    2.Performance 
    3.Scalability 
    4.Availability

*ARCHITECTURE OVERVIEW*

    1.Client-Server Model
    2.Leaderboard Cache
    3.Database 
    4.Live Update Broker

*API SPECIFICATIONS*

    1. Increment Score
    2. Get Top 10 Leaderboard
    3. Live Updates – WebSocket

*DATA MODEL*

    Users table
        -user_id (UUID, PK)
        -username (TEXT, unique)
        -created_at (TIMESTAMP)

    Scores table
        -user_id (UUID, FK to Users)
        -score (BIGINT, default 0)
        -updated_at (TIMESTAMP)

    Action_Log table (idempotency)
        -action_id (UUID, PK)
        -user_id (UUID)
        -processed_at (TIMESTAMP)

*SECURITY CONSIDERATIONS*
    1.Authentication & Authorisation
    2.Replay & Duplicate Prevention
    3.Input Validation
    4.Rate Limiting
    5.Transport Security

*FLOW OF EXECUTION*
Client->>API Gateway: POST /scores/increment (JWT, action_id, increment)
API Gateway->>ScoreService: Forward request
ScoreService->>AuthService: Validate token
AuthService-->>ScoreService: user_id
ScoreService->>Redis (Idempotency): Check if action_id exists
Redis (Idempotency)-->>ScoreService: Not found
ScoreService->>Database: UPDATE scores SET score = score + ? WHERE user_id = ?
Database-->>ScoreService: OK
ScoreService->>Redis (Leaderboard):leaderboard:scores increment user_id
Redis (Leaderboard)-->>ScoreService: new_score
ScoreService->>Redis (Leaderboard): Fetch top 10
Redis (Leaderboard)-->>ScoreService: top10 list
ScoreService->>Redis (Idempotency): SET action_id with TTL
ScoreService->>WebSocketServer: Broadcast leaderboard update
WebSocketServer->>Other Clients: Send JSON top10
ScoreService-->>API Gateway: 200 OK
API Gateway-->>Client: 200 OK