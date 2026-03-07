# API Documentation Index

**Base Path:** `/api/v1`  
**Project:** Bank Mega Corsys Backend  
**Version:** 1.0

---

## Table of Contents

### Authentication & Authorization

1. [Auth API](./01-auth-api.md) - Login, refresh token, session management
2. [User API](./02-user-api.md) - User CRUD operations
3. [Role API](./03-role-api.md) - Role management and assignments
4. [Permission API](./04-permission-api.md) - Permission management
5. [User Permission API](./05-user-permission-api.md) - User-specific permission overrides

### Resource Management

6. [Menu API](./06-menu-api.md) - Menu/navigation management
7. [Branch API](./07-branch-api.md) - Branch office management
8. [Internal User API](./08-internal-user-api.md) - Employee/internal user management

### Document Processing

9. [Document API](./09-document-api.md) - File upload and document management
10. [OCR Data API](./10-ocr-data-api.md) - OCR data processing and approval

### Monitoring

11. [Log API](./11-log-api.md) - Access log retrieval

### Error Handling

12. [Exception Handling](./12-exception-handling.md) - Global error responses

---

## Quick Reference

### Authentication Flow

```
1. POST /api/v1/auth/login → Get access token
2. Use token in Authorization header: Bearer <token>
3. Token expires? POST /api/v1/auth/refresh
4. GET /api/v1/auth/session → Get current user info
```

### Common Response Formats

#### List Response
```json
{
  "status": 200,
  "message": "OK",
  "data": [],
  "pagination": {
    "total": 100,
    "count": 10,
    "currentPage": 1,
    "perPage": 10,
    "totalPage": 10,
    "hasNext": true,
    "hasPrevious": false,
    "hasContent": true
  }
}
```

#### Retrieve Response
```json
{
  "status": 200,
  "message": "OK",
  "data": {}
}
```

#### Delete Response
```json
{
  "status": 200,
  "message": "OK",
  "id": {}
}
```

#### Error Response
```json
{
  "status": 400,
  "type": "ExceptionClassName",
  "message": "Error message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Permission Matrix

| Endpoint | Required Permission |
|----------|---------------------|
| `/api/v1/users/**` | USER_READ, USER_CREATE, USER_UPDATE, USER_DELETE |
| `/api/v1/roles/**` | ROLE_READ, ROLE_CREATE, ROLE_UPDATE, ROLE_DELETE |
| `/api/v1/permissions/**` | PERMISSION_READ, PERMISSION_CREATE, PERMISSION_UPDATE, PERMISSION_DELETE |
| `/api/v1/menus/**` | MENU_READ, MENU_CREATE, MENU_UPDATE, MENU_DELETE |
| `/api/v1/users/{userId}/permissions/**` | USER_READ, USER_UPDATE |

---

## HTTP Methods

| Method | Description | Typical Use |
|--------|-------------|-------------|
| GET    | Retrieve    | List or get resource |
| POST   | Create      | Create new resource or action |
| PUT    | Update      | Update existing resource |
| DELETE | Delete      | Soft delete or permanent delete |

---

## Query Parameters

### Pagination (All List Endpoints)

| Parameter | Default | Description |
|-----------|---------|-------------|
| page      | 1       | Page number |
| perPage   | 5       | Items per page |
| filter    | -       | Filter criteria |
| sort      | -       | Sort criteria |
| expands   | -       | Expand related entities |

### Sort Syntax

- Ascending: `sort=fieldName`
- Descending: `sort=-fieldName`

### Filter Syntax

- Simple: `filter=status:active`
- Multiple: `filter=status:active,role:admin`

---

## Authentication

All endpoints (except login and refresh) require JWT authentication.

**Header Format:**
```
Authorization: Bearer <access_token>
```

**Token Types:**
- **Access Token:** Short-lived, used for API requests
- **Refresh Token:** Long-lived, used to obtain new access tokens

---

## Rate Limiting

All endpoints are protected with a global rate limiter.

**Configuration:** Resilience4j Rate Limiter  
**Name:** `global`

---

## Base URL

**Development:** `http://localhost:8080/api/v1`  
**Production:** (Configure per environment)

---

## Related Documentation

- [RBAC Documentation](../../rbac.md) - Role-Based Access Control details
- [General Documentation](../../documentation.md) - Project overview

---

## API Files

| File | Description |
|------|-------------|
| [01-auth-api.md](./01-auth-api.md) | Authentication endpoints |
| [02-user-api.md](./02-user-api.md) | User management |
| [03-role-api.md](./03-role-api.md) | Role management |
| [04-permission-api.md](./04-permission-api.md) | Permission management |
| [05-user-permission-api.md](./05-user-permission-api.md) | User permission overrides |
| [06-menu-api.md](./06-menu-api.md) | Menu management |
| [07-branch-api.md](./07-branch-api.md) | Branch management |
| [08-internal-user-api.md](./08-internal-user-api.md) | Internal user management |
| [09-document-api.md](./09-document-api.md) | Document upload and management |
| [10-ocr-data-api.md](./10-ocr-data-api.md) | OCR data processing |
| [11-log-api.md](./11-log-api.md) | Access logging |
| [12-exception-handling.md](./12-exception-handling.md) | Error handling reference |

---

*Last Updated: March 7, 2026*
