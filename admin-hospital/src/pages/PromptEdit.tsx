import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Save,
  RotateCcw,
  Beaker,
  History,
  Copy,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

const availableVariables = [
  { name: '{{검사결과}}', description: '검사 항목별 결과 데이터' },
  { name: '{{환자성별}}', description: '환자의 성별 (M/F)' },
  { name: '{{환자나이}}', description: '환자의 나이' },
  { name: '{{검사일자}}', description: '검사 수행 일자' },
  { name: '{{참고치}}', description: '각 검사의 참고 범위' },
]

const defaultSystemPrompt = `당신은 전문 의료 AI 어시스턴트입니다. 종합검진 결과를 분석하여
환자에게 이해하기 쉬운 설명을 제공합니다.

중요 지침:
- 의학적 진단은 하지 않습니다
- 수치 해석과 일반적인 건강 조언만 제공합니다
- 이상 소견 시 전문의 상담을 권유합니다
- 강동경희대학교병원 기준에 맞춰 설명합니다`

const defaultAnalysisPrompt = `다음은 환자의 간기능 검사 결과입니다.

{{검사결과}}

위 결과를 바탕으로:
1. 각 수치의 의미를 쉽게 설명해주세요
2. 정상/이상 여부를 판단해주세요
3. 생활습관 개선 조언을 제공해주세요
4. 필요시 추가 검사나 진료 권유를 해주세요

JSON 형식으로 응답해주세요.`

// Variable Button Component
function VariableButton({
  variable,
  onClick,
}: {
  variable: { name: string; description: string }
  onClick: (name: string) => void
}) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    onClick(variable.name)
    navigator.clipboard.writeText(variable.name)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="font-mono text-xs"
      onClick={handleClick}
      title={variable.description}
    >
      {copied ? (
        <>
          <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
          복사됨
        </>
      ) : (
        <>
          <Copy className="mr-1 h-3 w-3" />
          {variable.name}
        </>
      )}
    </Button>
  )
}

export default function PromptEdit() {
  const { id } = useParams()
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt)
  const [analysisPrompt, setAnalysisPrompt] = useState(defaultAnalysisPrompt)
  const [activeTab, setActiveTab] = useState('system')

  const groupName = '간기능검사' // Would come from API based on id

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/prompts">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>프롬프트 관리</span>
              <span>/</span>
              <span>{groupName}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              프롬프트 편집: {groupName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            기본값 복원
          </Button>
          <Button variant="outline" size="sm">
            <Beaker className="mr-2 h-4 w-4" />
            테스트
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            저장
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="system">시스템 프롬프트</TabsTrigger>
          <TabsTrigger value="analysis">분석 프롬프트</TabsTrigger>
          <TabsTrigger value="hints">힌트/가이드</TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            버전 히스토리
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">시스템 프롬프트</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI의 역할과 행동 지침을 정의합니다
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[300px] font-mono text-sm"
                placeholder="시스템 프롬프트를 입력하세요..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">분석 프롬프트</CardTitle>
              <p className="text-sm text-muted-foreground">
                검사 결과 분석 시 사용되는 프롬프트
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[300px] font-mono text-sm"
                placeholder="분석 프롬프트를 입력하세요..."
                value={analysisPrompt}
                onChange={(e) => setAnalysisPrompt(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Available Variables */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                사용 가능한 변수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableVariables.map((variable) => (
                  <VariableButton
                    key={variable.name}
                    variable={variable}
                    onClick={() => {}}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                클릭하여 복사 후 프롬프트에 붙여넣기
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">힌트/가이드</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI 분석에 참고할 추가 정보를 입력합니다
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[300px] font-mono text-sm"
                placeholder="힌트나 가이드를 입력하세요..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">버전 히스토리</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { version: 'v3', date: '2024-12-05 14:30', by: '김관리' },
                  { version: 'v2', date: '2024-12-03 09:15', by: '김관리' },
                  { version: 'v1', date: '2024-11-28 16:00', by: '시스템' },
                ].map((item, idx) => (
                  <div
                    key={item.version}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      idx === 0 ? 'bg-primary/5 border border-primary/20' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={idx === 0 ? 'default' : 'secondary'}>
                        {item.version}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">{item.date}</p>
                        <p className="text-xs text-muted-foreground">
                          수정: {item.by}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      복원
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
