# 종합검진 AI 소견 생성 시스템

한국대학병원을 위한 AI 기반 종합건강검진 소견 자동 생성 시스템입니다.

## 📋 프로젝트 개요

병원에서 종합검진 후 의료진이 수작업으로 작성하던 종합소견을 AI가 자동으로 생성하여 업무 효율성을 높이는 시스템입니다.

### 주요 기능

1. **종합소견 생성** (메인 페이지)
   - 검진 대상자 조회 및 관리
   - AI 기반 자동 소견 생성 (평균 5분 소요)
   - 배치 시스템으로 5일 전 검진자까지 자동 생성
   - 생성된 결과 PDF 다운로드

2. **검사별 프롬프트 설정**
   - 9가지 검사 항목별 AI 분석 프롬프트 커스터마이징
   - 실시간 테스트 및 결과 확인
   - 완성된 프롬프트 미리보기

3. **종합소견 프롬프트**
   - 마스터 프롬프트 설정
   - 각 검사별 AI 분석 결과를 종합하는 최종 로직

## 🎨 디자인 특징

- **Modern UI/UX**: Tailwind CSS 기반의 깔끔하고 직관적인 인터페이스
- **Responsive Design**: 데스크톱, 태블릿 환경 최적화
- **Professional Look**: 의료기관에 적합한 신뢰감 있는 디자인
- **Color Scheme**: 
  - Primary: Purple gradient (#667eea → #764ba2)
  - Status colors: 파란색(진행중), 노란색(대기), 초록색(완료)

## 🗂️ 파일 구조

```
project/
├── index.html          # 메인 애플리케이션 (3개 탭 통합)
├── result.html         # 종합검진 결과지 (인쇄/PDF용)
├── app.js             # 메인 로직 및 이벤트 핸들러
└── README.md          # 프로젝트 문서
```

## 🚀 시작하기

### 필수 요구사항

- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 인터넷 연결 (CDN 리소스 로드용)

### 설치 및 실행

1. **파일 다운로드**
   ```bash
   # 모든 파일을 웹 서버 디렉토리에 복사
   ```

2. **웹 서버 실행**
   ```bash
   # Python 간단한 HTTP 서버 예시
   python -m http.server 8000
   
   # Node.js http-server 예시
   npx http-server
   ```

3. **브라우저에서 접속**
   ```
   http://localhost:8000/index.html
   ```

## 📱 사용 방법

### 1. 종합소견 생성 탭

#### 검진 대상자 조회
1. 검진일을 선택합니다
2. 필요시 환자명으로 검색합니다
3. 소견 생성 여부로 필터링합니다
4. "조회" 버튼을 클릭합니다

#### 소견 생성
- **개별 생성**: 각 환자의 🤖 아이콘 클릭
- **배치 생성**: "배치 자동 생성" 버튼으로 여러 환자 한번에 처리

#### 결과 확인
- 👁️ 아이콘: 생성된 소견 보기
- 📥 아이콘: PDF 다운로드

### 2. 검사별 프롬프트 탭

#### 프롬프트 설정
1. 좌측에서 검사 항목 선택 (혈액검사, 소변검사 등)
2. 중앙 텍스트 영역에서 프롬프트 수정
3. "완성된 전체 프롬프트 보기"로 최종 결과 확인
4. "저장" 버튼으로 저장

#### 테스트 실행
1. 검진일 선택
2. 검진 대상자 선택
3. "AI 분석 실행" 버튼 클릭
4. 하단에서 분석 결과 확인

### 3. 종합소견 프롬프트 탭

1. 좌측 큰 텍스트 영역에서 마스터 프롬프트 수정
2. 우측에서 검진 대상자 선택
3. "AI 종합소견 생성" 버튼으로 테스트
4. 미리보기 영역에서 결과 확인

## 🔧 커스터마이징

### 프롬프트 수정

프롬프트는 `app.js` 파일의 다음 객체들을 수정하면 됩니다:

```javascript
// 검사별 프롬프트
const samplePrompts = {
    blood: `혈액검사 분석 프롬프트...`,
    urine: `소변검사 분석 프롬프트...`,
    // ... 추가 검사
};

// 종합소견 마스터 프롬프트
const masterPrompt = `종합소견 생성 프롬프트...`;
```

### 검사 항목 추가

```javascript
const testTypes = [
    { id: 'new_test', name: '새로운 검사', icon: 'fa-icon-name' },
    // ...
];
```

### 스타일 변경

HTML 파일의 `<style>` 섹션 또는 Tailwind 클래스를 수정합니다.

## 🔌 백엔드 연동

현재는 프론트엔드 프로토타입입니다. 실제 운영을 위해서는:

### 1. API 엔드포인트 구현

```javascript
// 환자 목록 조회
GET /api/patients?date=YYYY-MM-DD

// AI 소견 생성
POST /api/generate-summary
{
  "patientId": "66666666",
  "testResults": { ... }
}

// 프롬프트 저장
POST /api/prompts
{
  "testType": "blood",
  "prompt": "..."
}

// PDF 생성
GET /api/generate-pdf?patientId=66666666
```

### 2. 데이터베이스 스키마

```sql
-- 환자 테이블
CREATE TABLE patients (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100),
    gender CHAR(1),
    age INT,
    exam_date DATE
);

-- 검사 결과 테이블
CREATE TABLE test_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id VARCHAR(20),
    test_type VARCHAR(50),
    results JSON,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- AI 소견 테이블
CREATE TABLE ai_summaries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id VARCHAR(20),
    summary TEXT,
    generated_at DATETIME,
    status ENUM('pending', 'processing', 'completed', 'failed'),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- 프롬프트 설정 테이블
CREATE TABLE prompt_templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_type VARCHAR(50),
    prompt TEXT,
    updated_at DATETIME
);
```

### 3. AI 모델 연동

#### Claude API 사용 예시 (Python)

```python
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

def generate_test_summary(test_type, test_results, prompt):
    message = client.messages.create(
        model="claude-sonnet-4.5-20250929",
        max_tokens=4000,
        messages=[
            {
                "role": "user",
                "content": f"{prompt}\n\n검사 결과:\n{test_results}"
            }
        ]
    )
    return message.content[0].text

def generate_comprehensive_summary(patient_data, all_test_summaries, master_prompt):
    combined_input = f"""
    환자 정보: {patient_data}
    
    각 검사별 AI 분석 결과:
    {all_test_summaries}
    """
    
    message = client.messages.create(
        model="claude-sonnet-4.5-20250929",
        max_tokens=8000,
        messages=[
            {
                "role": "user",
                "content": f"{master_prompt}\n\n{combined_input}"
            }
        ]
    )
    return message.content[0].text
```

### 4. 배치 작업 구현

```python
from apscheduler.schedulers.background import BackgroundScheduler

def auto_generate_summaries():
    """5일 전 검진자까지 자동 생성"""
    cutoff_date = datetime.now() - timedelta(days=5)
    pending_patients = get_pending_patients(cutoff_date)
    
    for patient in pending_patients:
        try:
            # 검사 결과 로드
            test_results = load_test_results(patient.id)
            
            # 각 검사별 AI 분석
            test_summaries = {}
            for test_type, results in test_results.items():
                prompt = get_prompt_template(test_type)
                summary = generate_test_summary(test_type, results, prompt)
                test_summaries[test_type] = summary
            
            # 종합소견 생성
            master_prompt = get_master_prompt()
            final_summary = generate_comprehensive_summary(
                patient, test_summaries, master_prompt
            )
            
            # 저장
            save_summary(patient.id, final_summary)
            
        except Exception as e:
            log_error(patient.id, str(e))

# 스케줄러 설정 (매일 새벽 2시)
scheduler = BackgroundScheduler()
scheduler.add_job(auto_generate_summaries, 'cron', hour=2)
scheduler.start()
```

## 📊 성능 고려사항

### AI 생성 시간
- 단일 검사 분석: 약 30초 - 1분
- 종합소견 생성: 약 3-5분
- 배치 처리 시 병렬 처리 권장 (10개씩 동시 처리 등)

### 최적화 방안
1. **캐싱**: 동일한 검사 결과 패턴에 대한 소견 캐싱
2. **큐 시스템**: Redis/RabbitMQ를 통한 비동기 처리
3. **프롬프트 최적화**: 토큰 사용량 최소화
4. **프리로딩**: 자주 사용되는 프롬프트 미리 로드

## 🔒 보안 고려사항

### 필수 보안 조치
1. **개인정보 보호**
   - HTTPS 필수
   - 주민등록번호 마스킹
   - 접근 권한 관리

2. **API 보안**
   - JWT 토큰 기반 인증
   - Rate limiting
   - API 키 관리

3. **데이터 암호화**
   - DB 저장 시 민감정보 암호화
   - 전송 구간 TLS 적용

4. **감사 로그**
   - 모든 소견 생성 이력 기록
   - 사용자 액션 로깅

## 📄 라이선스

이 프로젝트는 의료기관 내부 사용을 위해 개발되었습니다.

## 👥 문의

- 개발팀: Save The Life Protocol
- 이메일: [담당자 이메일]
- 전화: [담당자 연락처]

## 🔄 버전 히스토리

### v1.0.0 (2025-01-01)
- 초기 릴리스
- 3개 탭 구조 구현
- 샘플 데이터 기반 프로토타입
- PDF 출력 기능 포함

### 향후 계획
- [ ] 실제 병원 시스템 연동
- [ ] AI 모델 Fine-tuning
- [ ] 모바일 앱 지원
- [ ] 다국어 지원 (영문, 중문)
- [ ] 음성 판독 기능
- [ ] 통계 대시보드
