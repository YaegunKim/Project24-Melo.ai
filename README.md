# Melo.ai — 앱 설계 문서 (App Design Document)

## Context

생물학적 인풋(심박수, 스트레스, 수면 상태, 기분 등)을 기반으로 음악치료 원리를 적용해  
사용자에게 맞춤형 치료 음악을 생성해주는 AI 서비스. MusicGPT API를 통해 음악 생성,  
한국어/영어 지원. MVP는 비로그인 세션 기반, 추후 계정 시스템 추가 예정.

---

## Tech Stack

| 영역 | 기술 |
|------|------|
| Web | Next.js 14 (App Router) |
| Mobile | React Native (Expo) |
| 언어 | TypeScript |
| 스타일링 | Emotion Styled (`.style.ts`, `export const S = {}`, `$` prop 패턴) |
| i18n | `next-intl` (Web) / `i18n-js` (Mobile) |
| 공유 로직 | pnpm monorepo (`packages/core`, `packages/ui`) |
| 음악 생성 | MusicGPT API |
| 생체 입력 | Manual + Web Bluetooth (웨어러블) + MediaPipe (rPPG) |
| 상태 관리 | Zustand |
| 백엔드 | Next.js API Routes (MVP) → 추후 분리 |
| DB | 없음 (MVP: localStorage/AsyncStorage 세션) |

---

## Monorepo 구조

```
melo.ai/
├── apps/
│   ├── web/                    # Next.js 14 App
│   └── mobile/                 # Expo React Native App
├── packages/
│   ├── core/                   # 공유 비즈니스 로직
│   │   ├── therapy-engine/     # 음악치료 매핑 로직
│   │   ├── musicgpt/           # MusicGPT API 클라이언트
│   │   └── bio-input/          # 생체 데이터 정규화
│   ├── ui/                     # 공유 UI 컴포넌트
│   └── i18n/                   # 공유 번역 파일 (ko.json, en.json)
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 페이지 구조 (Web — Next.js App Router)

```
apps/web/app/
├── [locale]/                   # /ko, /en
│   ├── page.tsx                # 랜딩 페이지
│   ├── session/
│   │   ├── input/page.tsx      # 생체 인풋 수집
│   │   ├── generating/page.tsx # 음악 생성 중 (로딩)
│   │   └── player/page.tsx     # 음악 플레이어
│   ├── history/page.tsx        # 세션 히스토리
│   └── settings/page.tsx       # 언어/입력 방식 설정
└── api/
    └── generate/route.ts       # MusicGPT API 호출 엔드포인트
```

---

## 사용자 플로우

```
[랜딩] → [생체 인풋 수집] → [목표 선택] → [음악 생성 중] → [플레이어] → [평가/히스토리]
```

### 1. 랜딩 페이지
- 서비스 소개 (음악치료 + AI)
- "세션 시작" CTA 버튼
- 언어 토글 (KO/EN)

### 2. 생체 인풋 수집 (`/session/input`)
- **입력 방식 탭 3가지:**
  - `수동 입력`: 슬라이더/선택 UI
    - 심박수 (40–180 BPM)
    - 스트레스 레벨 (1–10)
    - 수면 질 (1–10)
    - 현재 기분 (불안/피곤/슬픔/평온/활기 등)
    - 에너지 레벨 (1–10)
  - `카메라 스캔` (rPPG): 카메라로 얼굴 인식 → 심박수 추정 (MediaPipe FaceMesh + 색상 변화 분석)
  - `웨어러블 연동`: Web Bluetooth API → BLE 기기에서 HR/SpO2 데이터 수신

- **목표 선택** (하단):
  - 이완 / 집중 / 수면 유도 / 에너지 충전 / 감정 해소

### 3. 음악 생성 중 (`/session/generating`)
- 애니메이션 (파형 시각화)
- 치료 파라미터 요약 표시 ("현재 심박수에 맞춰 80BPM으로 시작, 60BPM으로 유도합니다")
- 생성 진행률 표시

### 4. 플레이어 (`/session/player`)
- 음악 재생/일시정지/반복
- 파형 시각화 (Wavesurfer.js 또는 Web Audio API)
- 치료 정보 패널: 현재 BPM, 조성, 스타일, 목표 상태
- 세션 종료 후 간단한 평가 (1–5점, 선택)
- 히스토리 저장 (localStorage)

### 5. 히스토리 (`/history`)
- 과거 세션 목록 (날짜, 목표, 별점)
- 세션 재생 버튼

---

## 음악치료 엔진 (`packages/core/therapy-engine`)

### 핵심 원리

| 원리 | 설명 | 적용 방법 |
|------|------|-----------|
| **ISO Principle** | 현재 상태와 일치하는 음악으로 시작 → 목표 상태로 유도 | 시작 BPM = HR에 매칭, 점진적 BPM 감소/증가 |
| **Entrainment** | 신체 리듬이 외부 리듬에 동조되는 현상 | 심박수 ↔ 음악 BPM 동기화 |
| **Receptive Music Therapy** | 음악 감상을 통한 치료적 효과 | 자동 생성 + 수동 개입 없는 감상 |

### 매핑 로직

```typescript
// packages/core/therapy-engine/mapper.ts

interface BiologicalInput {
  heartRate: number;      // BPM
  stressLevel: number;    // 1-10
  sleepQuality: number;   // 1-10
  mood: MoodType;
  energyLevel: number;    // 1-10
}

interface TherapyParams {
  startBPM: number;
  targetBPM: number;
  key: string;            // e.g., "F major"
  mode: "major" | "minor";
  style: string;          // e.g., "ambient piano"
  duration: number;       // seconds
  isoPhase: "match" | "guide";
}

// 목표별 매핑 예시
const TARGET_PROFILES = {
  relax:    { targetBPM: 60, mode: "major", style: "ambient piano" },
  focus:    { targetBPM: 80, mode: "major", style: "lo-fi electronic" },
  sleep:    { targetBPM: 50, mode: "minor", style: "soft ambient, delta waves" },
  energize: { targetBPM: 120, mode: "major", style: "upbeat acoustic" },
  release:  { targetBPM: 70, mode: "minor", style: "expressive piano" },
};
```

### MusicGPT 프롬프트 생성

```typescript
// packages/core/musicgpt/prompt-builder.ts

function buildPrompt(params: TherapyParams): string {
  return `
    ${params.style} music in ${params.key},
    starting at ${params.startBPM} BPM and gradually transitioning to ${params.targetBPM} BPM,
    ${params.duration / 60} minutes long,
    therapeutic and calming, no lyrics, high quality
  `.trim();
}
```

---

## MusicGPT API 연동 (`packages/core/musicgpt`)

```typescript
// packages/core/musicgpt/client.ts

interface GenerateRequest {
  prompt: string;
  duration: number;   // seconds (30–300)
  format: "mp3" | "wav";
}

interface GenerateResponse {
  audioUrl: string;
  taskId: string;
  status: "pending" | "processing" | "completed" | "failed";
}

// Next.js API Route: apps/web/app/api/generate/route.ts
// POST /api/generate → MusicGPT API 호출 → audioUrl 반환
```

> **Note**: MusicGPT API의 구체적인 엔드포인트/인증 방식은 확인 후 업데이트 필요.  
> 대안 API: Hugging Face Inference API (MusicGen), Suno API

---

## 생체 인풋 모듈 (`packages/core/bio-input`)

### rPPG (카메라 심박수 측정)
- MediaPipe FaceMesh → 이마/볼 ROI 색상값 추출
- 30fps 영상에서 PPG 신호 분석 → FFT → BPM 추정
- 측정 시간: ~30초
- 라이브러리: `@mediapipe/face_mesh`, `face-api.js`

### 웨어러블 연동 (Web Bluetooth API)
- Bluetooth Heart Rate Service (UUID: `0x180D`) 표준 프로토콜
- Web: `navigator.bluetooth.requestDevice()`
- Mobile: `react-native-ble-plx`

### 수동 입력
- Zustand store에 즉시 반영
- 슬라이더 컴포넌트 + 이모지 기반 기분 선택

---

## i18n 구조 (`packages/i18n`)

```json
// ko.json
{
  "landing": {
    "title": "음악이 당신을 치료합니다",
    "subtitle": "생체 데이터 기반 AI 음악치료",
    "cta": "세션 시작하기"
  },
  "input": {
    "heartRate": "심박수 (BPM)",
    "stress": "스트레스 수준",
    "sleep": "수면 질",
    "mood": "현재 기분",
    "energy": "에너지 레벨",
    "scanCamera": "카메라로 측정",
    "connectWearable": "웨어러블 연결"
  },
  "goals": {
    "relax": "이완",
    "focus": "집중",
    "sleep": "수면 유도",
    "energize": "에너지 충전",
    "release": "감정 해소"
  }
}
```

```json
// en.json (동일 키 구조)
{
  "landing": {
    "title": "Music That Heals You",
    "subtitle": "AI Music Therapy Based on Your Biology",
    "cta": "Start Session"
  }
}
```

---

## 데이터 모델

```typescript
// 세션 (localStorage 저장)
interface Session {
  id: string;
  createdAt: number;
  bioInput: BiologicalInput;
  goal: GoalType;
  therapyParams: TherapyParams;
  audioUrl: string;
  rating?: number;  // 1-5
}
```

---

## 구현 단계 (Phases)

### Phase 1 — MVP (Web only)
1. Next.js + monorepo 초기 세팅
2. 수동 인풋 UI + 목표 선택
3. 음악치료 엔진 (매핑 로직)
4. MusicGPT API 연동 + 플레이어
5. i18n (ko/en)
6. 세션 히스토리 (localStorage)

### Phase 2 — 생체 인풋 확장
7. 카메라 rPPG 심박수 측정
8. 웨어러블 Web Bluetooth 연동

### Phase 3 — 모바일
9. Expo React Native 앱 (공유 core/ui 패키지 활용)
10. HealthKit / Health Connect 연동

### Phase 4 — 계정 시스템
11. 로그인/회원가입 (NextAuth.js)
12. 클라우드 히스토리 저장 (PostgreSQL or Supabase)

---

## 검증 방법

1. **음악치료 엔진**: 다양한 인풋 조합으로 `mapToTherapyParams()` 단위 테스트
2. **MusicGPT 연동**: API 응답 mock + `POST /api/generate` 통합 테스트
3. **rPPG**: 카메라 접근 권한 후 30초 스캔 → BPM 출력 확인
4. **i18n**: `/ko`와 `/en` 경로 전환 시 텍스트 변경 확인
5. **E2E**: 수동 인풋 → 목표 선택 → 생성 → 플레이어 전체 플로우 수동 확인

---

## 파일 생성 목록 (Phase 1 기준)

| 파일 | 역할 |
|------|------|
| `pnpm-workspace.yaml` | monorepo 설정 |
| `turbo.json` | 빌드 파이프라인 |
| `apps/web/` | Next.js 앱 |
| `packages/core/therapy-engine/mapper.ts` | 치료 파라미터 매핑 |
| `packages/core/musicgpt/client.ts` | MusicGPT API 클라이언트 |
| `packages/core/musicgpt/prompt-builder.ts` | 프롬프트 생성기 |
| `packages/i18n/ko.json` | 한국어 번역 |
| `packages/i18n/en.json` | 영어 번역 |
| `apps/web/app/[locale]/page.tsx` | 랜딩 페이지 |
| `apps/web/app/[locale]/session/input/page.tsx` | 생체 인풋 수집 |
| `apps/web/app/[locale]/session/generating/page.tsx` | 생성 중 화면 |
| `apps/web/app/[locale]/session/player/page.tsx` | 음악 플레이어 |
| `apps/web/app/api/generate/route.ts` | 음악 생성 API 라우트 |
