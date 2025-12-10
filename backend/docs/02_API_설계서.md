# Hospital Admin Backend - API 설계서

## 1. API 개요

### 1.1 기본 정보
- **Base URL**: `https://api.example.com/api`
- **API Version**: v1
- **인증 방식**: JWT Bearer Token
- **응답 형식**: JSON

### 1.2 공통 응답 형식

#### 성공 응답
```json
{
  "success": true,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": { ... },
  "timestamp": "2025-12-10T10:30:00"
}
```

#### 에러 응답
```json
{
  "success": false,
  "message": "오류 메시지",
  "errorCode": "ERROR_CODE",
  "timestamp": "2025-12-10T10:30:00"
}
```

#### 페이징 응답
```json
{
  "success": true,
  "data": {
    "content": [ ... ],
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5,
    "first": true,
    "last": false
  }
}
```

### 1.3 공통 헤더

| 헤더 | 설명 | 필수 |
|------|------|------|
| `Authorization` | Bearer {access_token} | 인증 필요 API |
| `Content-Type` | application/json | POST, PUT, PATCH |
| `Accept` | application/json | 모든 요청 |

### 1.4 에러 코드

| 코드 | HTTP 상태 | 설명 |
|------|----------|------|
| `AUTH_001` | 401 | 인증 토큰 없음 |
| `AUTH_002` | 401 | 토큰 만료 |
| `AUTH_003` | 401 | 잘못된 토큰 |
| `AUTH_004` | 403 | 권한 없음 |
| `USER_001` | 404 | 사용자 없음 |
| `USER_002` | 409 | 중복 사용자 |
| `HOSPITAL_001` | 404 | 병원 없음 |
| `EXAM_001` | 404 | 검사 그룹 없음 |
| `EXAM_002` | 404 | 검사 매핑 없음 |
| `EXAM_003` | 400 | 잘못된 Excel 형식 |
| `PROMPT_001` | 404 | 프롬프트 없음 |
| `ANALYSIS_001` | 404 | 분석 세션 없음 |
| `VALIDATION_001` | 400 | 입력값 검증 실패 |

---

## 2. 인증 API (Auth)

### 2.1 로그인

```
POST /api/v1/auth/login
```

#### Request Body
```json
{
  "username": "admin001",
  "password": "password123"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "admin001",
      "name": "김관리자",
      "email": "admin@hospital.com",
      "role": "HOSPITAL_ADMIN",
      "hospitalId": "550e8400-e29b-41d4-a716-446655440001",
      "hospitalName": "강동경희대학교병원"
    }
  }
}
```

### 2.2 토큰 갱신

```
POST /api/v1/auth/refresh
```

#### Request Body
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 3600
  }
}
```

### 2.3 로그아웃

```
POST /api/v1/auth/logout
```

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "로그아웃되었습니다."
}
```

### 2.4 현재 사용자 정보

```
GET /api/v1/auth/me
```

#### Headers
```
Authorization: Bearer {access_token}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "admin001",
    "name": "김관리자",
    "email": "admin@hospital.com",
    "role": "HOSPITAL_ADMIN",
    "hospitalId": "550e8400-e29b-41d4-a716-446655440001",
    "hospitalName": "강동경희대학교병원",
    "permissions": ["hospital.*", "user.*", "prompt.*", "analysis.*"]
  }
}
```

---

## 3. 사용자 API (Users)

### 3.1 사용자 목록 조회

```
GET /api/v1/users
```

#### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| page | int | N | 페이지 번호 (0부터 시작, 기본값: 0) |
| size | int | N | 페이지 크기 (기본값: 20, 최대: 100) |
| role | string | N | 역할 필터 (HOSPITAL_ADMIN, DOCTOR, STAFF) |
| isActive | boolean | N | 활성화 상태 필터 |
| search | string | N | 이름/아이디 검색어 |

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "username": "admin001",
        "name": "김관리자",
        "email": "admin@hospital.com",
        "role": "HOSPITAL_ADMIN",
        "roleName": "병원 관리자",
        "isActive": true,
        "createdAt": "2025-01-01T09:00:00",
        "lastLoginAt": "2025-12-10T08:30:00"
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 15,
    "totalPages": 1
  }
}
```

### 3.2 사용자 상세 조회

```
GET /api/v1/users/{userId}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "admin001",
    "name": "김관리자",
    "email": "admin@hospital.com",
    "role": "HOSPITAL_ADMIN",
    "roleName": "병원 관리자",
    "isActive": true,
    "createdAt": "2025-01-01T09:00:00",
    "lastLoginAt": "2025-12-10T08:30:00"
  }
}
```

### 3.3 사용자 생성

```
POST /api/v1/users
```

#### Request Body
```json
{
  "username": "doctor001",
  "password": "password123",
  "name": "이의사",
  "email": "doctor@hospital.com",
  "role": "DOCTOR"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "사용자가 생성되었습니다.",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "username": "doctor001",
    "name": "이의사",
    "email": "doctor@hospital.com",
    "role": "DOCTOR",
    "isActive": true
  }
}
```

### 3.4 사용자 수정

```
PUT /api/v1/users/{userId}
```

#### Request Body
```json
{
  "name": "이의사",
  "email": "doctor.new@hospital.com",
  "role": "DOCTOR",
  "isActive": true
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "사용자 정보가 수정되었습니다.",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "username": "doctor001",
    "name": "이의사",
    "email": "doctor.new@hospital.com",
    "role": "DOCTOR",
    "isActive": true
  }
}
```

### 3.5 사용자 삭제 (비활성화)

```
DELETE /api/v1/users/{userId}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "사용자가 비활성화되었습니다."
}
```

### 3.6 비밀번호 변경

```
PATCH /api/v1/users/{userId}/password
```

#### Request Body
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "비밀번호가 변경되었습니다."
}
```

---

## 4. 검사 그룹 API (Exam Groups)

### 4.1 표준 검사 그룹 목록 조회

```
GET /api/v1/exam-groups
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "code": "BODY_MEASURE",
      "name": "신체계측",
      "description": "신장, 체중, 혈압 등 기본 신체 계측",
      "isNumeric": true,
      "sortOrder": 10,
      "hospitalMapping": {
        "hospitalGroupCode": "GRP001",
        "hospitalGroupName": "신체계측",
        "isActive": true
      }
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440011",
      "code": "LIVER_FUNC",
      "name": "간기능검사",
      "description": "AST, ALT, GGT 등 간기능 관련 검사",
      "isNumeric": true,
      "sortOrder": 30,
      "hospitalMapping": null
    }
  ]
}
```

### 4.2 검사 그룹 매핑 등록/수정

```
PUT /api/v1/exam-groups/{examGroupId}/mapping
```

#### Request Body
```json
{
  "hospitalGroupCode": "LF001",
  "hospitalGroupName": "간기능검사"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "검사 그룹 매핑이 저장되었습니다.",
  "data": {
    "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
    "examGroupName": "간기능검사",
    "hospitalGroupCode": "LF001",
    "hospitalGroupName": "간기능검사",
    "isActive": true
  }
}
```

### 4.3 검사 그룹 매핑 삭제

```
DELETE /api/v1/exam-groups/{examGroupId}/mapping
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "검사 그룹 매핑이 삭제되었습니다."
}
```

---

## 5. 검사 항목 매핑 API (Exam Mappings)

### 5.1 검사 항목 매핑 목록 조회

```
GET /api/v1/exam-mappings
```

#### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| page | int | N | 페이지 번호 (기본값: 0) |
| size | int | N | 페이지 크기 (기본값: 20) |
| examGroupId | uuid | N | 검사 그룹 ID 필터 |
| search | string | N | 검사명 검색어 |
| isActive | boolean | N | 활성화 상태 필터 |

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440020",
        "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
        "examGroupName": "간기능검사",
        "hospitalExamCode": "VHBD4",
        "hospitalExamName": "AST(SGOT)",
        "standardExamCode": "AST",
        "standardExamName": "AST",
        "unit": "U/L",
        "referenceMale": "0~40",
        "referenceFemale": "0~32",
        "isActive": true,
        "createdAt": "2025-01-01T09:00:00",
        "updatedAt": "2025-01-01T09:00:00"
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 150,
    "totalPages": 8
  }
}
```

### 5.2 검사 항목 매핑 등록

```
POST /api/v1/exam-mappings
```

#### Request Body
```json
{
  "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
  "hospitalExamCode": "VHBD4",
  "hospitalExamName": "AST(SGOT)",
  "standardExamCode": "AST",
  "standardExamName": "AST",
  "unit": "U/L",
  "referenceMale": "0~40",
  "referenceFemale": "0~32"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "검사 항목 매핑이 등록되었습니다.",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440020",
    "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
    "examGroupName": "간기능검사",
    "hospitalExamCode": "VHBD4",
    "hospitalExamName": "AST(SGOT)",
    "standardExamCode": "AST",
    "standardExamName": "AST",
    "unit": "U/L",
    "referenceMale": "0~40",
    "referenceFemale": "0~32",
    "isActive": true
  }
}
```

### 5.3 검사 항목 매핑 수정

```
PUT /api/v1/exam-mappings/{mappingId}
```

#### Request Body
```json
{
  "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
  "hospitalExamCode": "VHBD4",
  "hospitalExamName": "AST(SGOT)",
  "standardExamCode": "AST",
  "standardExamName": "AST",
  "unit": "U/L",
  "referenceMale": "0~40",
  "referenceFemale": "0~32",
  "isActive": true
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "검사 항목 매핑이 수정되었습니다.",
  "data": { ... }
}
```

### 5.4 검사 항목 매핑 삭제

```
DELETE /api/v1/exam-mappings/{mappingId}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "검사 항목 매핑이 삭제되었습니다."
}
```

### 5.5 Excel 일괄 업로드

```
POST /api/v1/exam-mappings/upload
```

#### Request
- Content-Type: `multipart/form-data`
- Form field: `file` (Excel file)

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Excel 업로드가 완료되었습니다.",
  "data": {
    "totalRows": 150,
    "successCount": 148,
    "failureCount": 2,
    "failures": [
      {
        "row": 25,
        "hospitalExamCode": "INVALID",
        "error": "중복된 검사 코드입니다."
      },
      {
        "row": 78,
        "hospitalExamCode": "",
        "error": "필수 항목이 누락되었습니다."
      }
    ]
  }
}
```

### 5.6 Excel 템플릿 다운로드

```
GET /api/v1/exam-mappings/template
```

#### Response
- Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- Content-Disposition: `attachment; filename="exam-mapping-template.xlsx"`

---

## 6. 프롬프트 API (Prompts)

### 6.1 프롬프트 템플릿 목록 조회

```
GET /api/v1/prompts/templates
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440030",
      "templateType": "BASE_TEMPLATE",
      "name": "기본 분석 템플릿",
      "content": "당신은 종합검진 결과를 분석하는 의료 AI입니다...",
      "version": 1,
      "isDefault": true,
      "isActive": true
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440031",
      "templateType": "COMPREHENSIVE",
      "name": "종합소견 템플릿",
      "content": "다음 검사 결과들을 종합하여...",
      "version": 1,
      "isDefault": true,
      "isActive": true
    }
  ]
}
```

### 6.2 병원별 프롬프트 조회

```
GET /api/v1/prompts
```

#### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| examGroupId | uuid | N | 검사 그룹 ID |
| promptType | string | N | 프롬프트 유형 |

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440040",
      "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
      "examGroupName": "간기능검사",
      "promptType": "GROUP_ANALYSIS",
      "content": "간기능 검사 결과를 분석할 때...",
      "isActive": true,
      "createdAt": "2025-01-15T10:00:00"
    }
  ]
}
```

### 6.3 병원별 프롬프트 저장

```
PUT /api/v1/prompts
```

#### Request Body
```json
{
  "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
  "promptType": "GROUP_ANALYSIS",
  "content": "간기능 검사 결과를 분석할 때 다음 사항을 고려하세요..."
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "프롬프트가 저장되었습니다.",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440040",
    "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
    "examGroupName": "간기능검사",
    "promptType": "GROUP_ANALYSIS",
    "content": "간기능 검사 결과를 분석할 때 다음 사항을 고려하세요...",
    "isActive": true
  }
}
```

### 6.4 검사별 힌트 목록 조회

```
GET /api/v1/prompts/hints
```

#### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| examGroupId | uuid | N | 검사 그룹 ID |

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440050",
      "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
      "examGroupName": "간기능검사",
      "hints": "AST/ALT 비율이 2:1 이상이면 알코올성 간질환 가능성이 높습니다.",
      "sortOrder": 1,
      "isActive": true
    }
  ]
}
```

### 6.5 검사별 힌트 저장

```
POST /api/v1/prompts/hints
```

#### Request Body
```json
{
  "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
  "hints": "AST/ALT 비율이 2:1 이상이면 알코올성 간질환 가능성이 높습니다.",
  "sortOrder": 1
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "힌트가 저장되었습니다.",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440050",
    "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
    "examGroupName": "간기능검사",
    "hints": "AST/ALT 비율이 2:1 이상이면 알코올성 간질환 가능성이 높습니다.",
    "sortOrder": 1,
    "isActive": true
  }
}
```

### 6.6 기본 프롬프트로 복원

```
DELETE /api/v1/prompts/{promptId}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "커스텀 프롬프트가 삭제되고 기본 프롬프트로 복원됩니다."
}
```

---

## 7. 분석 결과 API (Analysis)

### 7.1 분석 결과 목록 조회

```
GET /api/v1/analysis
```

#### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| page | int | N | 페이지 번호 (기본값: 0) |
| size | int | N | 페이지 크기 (기본값: 20) |
| receptionDateFrom | date | N | 접수일 시작 (YYYY-MM-DD) |
| receptionDateTo | date | N | 접수일 종료 (YYYY-MM-DD) |
| patientId | string | N | 환자 ID |
| status | string | N | 상태 필터 (pending, processing, completed, failed) |

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440060",
        "patientId": "12345678",
        "receptionDate": "2025-11-07",
        "sessionKey": "202511071234567890",
        "status": "completed",
        "groupCount": 12,
        "maxRiskLevel": "medium",
        "createdAt": "2025-11-07T09:30:00",
        "completedAt": "2025-11-07T09:35:00"
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 500,
    "totalPages": 25
  }
}
```

### 7.2 분석 결과 상세 조회

```
GET /api/v1/analysis/{sessionId}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440060",
    "patientId": "12345678",
    "receptionDate": "2025-11-07",
    "sessionKey": "202511071234567890",
    "status": "completed",
    "comprehensiveResult": "종합검진 결과, 전반적으로 양호한 건강 상태를 보이고 있습니다...",
    "aiModelName": "MedGemma 27B",
    "createdAt": "2025-11-07T09:30:00",
    "completedAt": "2025-11-07T09:35:00",
    "groupResults": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440070",
        "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
        "examGroupName": "간기능검사",
        "aiResult": "간기능 검사 결과 정상 범위 내에 있습니다...",
        "riskLevel": "low",
        "examResults": [
          {
            "examCode": "VHBD4",
            "examName": "AST(SGOT)",
            "examValue": "25",
            "examUnit": "U/L",
            "referenceRange": "0~40"
          },
          {
            "examCode": "VHBD5",
            "examName": "ALT(SGPT)",
            "examValue": "30",
            "examUnit": "U/L",
            "referenceRange": "0~41"
          }
        ]
      }
    ]
  }
}
```

### 7.3 그룹별 분석 결과 조회

```
GET /api/v1/analysis/{sessionId}/groups/{groupId}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440070",
    "sessionId": "550e8400-e29b-41d4-a716-446655440060",
    "examGroupId": "550e8400-e29b-41d4-a716-446655440011",
    "examGroupName": "간기능검사",
    "aiResult": "간기능 검사 결과 정상 범위 내에 있습니다...",
    "riskLevel": "low",
    "examResults": [
      {
        "examCode": "VHBD4",
        "examName": "AST(SGOT)",
        "examValue": "25",
        "examUnit": "U/L",
        "referenceRange": "0~40"
      }
    ],
    "createdAt": "2025-11-07T09:32:00"
  }
}
```

---

## 8. 대시보드 API (Dashboard)

### 8.1 분석 현황 통계

```
GET /api/v1/dashboard/statistics
```

#### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| period | string | N | 기간 (today, week, month, year) 기본값: month |

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "period": "month",
    "totalAnalyses": 1250,
    "completedAnalyses": 1200,
    "pendingAnalyses": 30,
    "failedAnalyses": 20,
    "averageProcessingTime": 180,
    "analysisLimit": 5000,
    "usagePercentage": 25.0,
    "dailyTrend": [
      {"date": "2025-12-01", "count": 45},
      {"date": "2025-12-02", "count": 52},
      {"date": "2025-12-03", "count": 48}
    ],
    "riskLevelDistribution": {
      "low": 850,
      "medium": 300,
      "high": 45,
      "critical": 5
    }
  }
}
```

### 8.2 최근 분석 목록

```
GET /api/v1/dashboard/recent-analyses
```

#### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| limit | int | N | 조회 개수 (기본값: 10, 최대: 50) |

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440060",
      "patientId": "12345678",
      "receptionDate": "2025-11-07",
      "status": "completed",
      "maxRiskLevel": "medium",
      "completedAt": "2025-11-07T09:35:00"
    }
  ]
}
```

---

## 9. AI 설정 API (AI Config)

### 9.1 사용 가능한 AI 모델 목록

```
GET /api/v1/ai-models
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440080",
      "name": "MedGemma 27B",
      "modelId": "puyangwang/medgemma-27b-it:q4_0",
      "description": "의료 특화 모델, 한국어 지원",
      "defaultTimeoutMs": 600000,
      "isActive": true
    }
  ]
}
```

### 9.2 병원 AI 설정 조회

```
GET /api/v1/ai-config
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440090",
    "aiModelId": "550e8400-e29b-41d4-a716-446655440080",
    "aiModelName": "MedGemma 27B",
    "timeoutSeconds": 600,
    "responseFormat": "json",
    "isDefault": true
  }
}
```

### 9.3 병원 AI 설정 수정

```
PUT /api/v1/ai-config
```

#### Request Body
```json
{
  "aiModelId": "550e8400-e29b-41d4-a716-446655440080",
  "timeoutSeconds": 600,
  "responseFormat": "json"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "AI 설정이 저장되었습니다.",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440090",
    "aiModelId": "550e8400-e29b-41d4-a716-446655440080",
    "aiModelName": "MedGemma 27B",
    "timeoutSeconds": 600,
    "responseFormat": "json",
    "isDefault": true
  }
}
```

---

## 10. API 권한 매트릭스

| API | SUPER_ADMIN | HOSPITAL_ADMIN | DOCTOR | STAFF |
|-----|-------------|----------------|--------|-------|
| **인증** |||||
| POST /auth/login | O | O | O | O |
| POST /auth/refresh | O | O | O | O |
| GET /auth/me | O | O | O | O |
| **사용자** |||||
| GET /users | O | O | - | - |
| POST /users | O | O | - | - |
| PUT /users/{id} | O | O* | - | - |
| DELETE /users/{id} | O | O* | - | - |
| **검사 그룹** |||||
| GET /exam-groups | O | O | O | O |
| PUT /exam-groups/{id}/mapping | O | O | - | - |
| **검사 매핑** |||||
| GET /exam-mappings | O | O | O | O |
| POST /exam-mappings | O | O | - | - |
| PUT /exam-mappings/{id} | O | O | - | - |
| DELETE /exam-mappings/{id} | O | O | - | - |
| POST /exam-mappings/upload | O | O | - | - |
| **프롬프트** |||||
| GET /prompts/* | O | O | O | O |
| PUT /prompts | O | O | - | - |
| DELETE /prompts/{id} | O | O | - | - |
| **분석 결과** |||||
| GET /analysis | O | O | O | O |
| GET /analysis/{id} | O | O | O | O |
| **대시보드** |||||
| GET /dashboard/* | O | O | O | O |
| **AI 설정** |||||
| GET /ai-models | O | O | - | - |
| GET /ai-config | O | O | - | - |
| PUT /ai-config | O | O | - | - |

> *: 같은 병원 내 사용자만 관리 가능

---

**문서 버전**: 1.0
**작성일**: 2025-12-10
**작성자**: Claude AI
