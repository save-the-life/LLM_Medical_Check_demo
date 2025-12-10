import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Printer,
  FileText,
  RotateCcw,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

// Result Badge
function ResultBadge({ status }: { status: 'normal' | 'abnormal' | 'critical' }) {
  switch (status) {
    case 'normal':
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          <CheckCircle2 className="h-3 w-3 mr-1" />
          정상
        </Badge>
      )
    case 'abnormal':
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200"
        >
          <AlertTriangle className="h-3 w-3 mr-1" />
          주의
        </Badge>
      )
    case 'critical':
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          <AlertTriangle className="h-3 w-3 mr-1" />
          이상
        </Badge>
      )
  }
}

// Mock data
const mockTestResults = {
  liver: [
    { name: 'AST', value: 28, unit: 'U/L', ref: 'M<40', status: 'normal' as const },
    { name: 'ALT', value: 34, unit: 'U/L', ref: 'M<41', status: 'normal' as const },
    { name: 'GGT', value: 22, unit: 'U/L', ref: '10-71', status: 'normal' as const },
    { name: '총빌리루빈', value: 1.1, unit: 'mg/dL', ref: '<1.2', status: 'normal' as const },
  ],
  kidney: [
    { name: 'BUN', value: 15, unit: 'mg/dL', ref: '7-20', status: 'normal' as const },
    { name: '크레아티닌', value: 1.0, unit: 'mg/dL', ref: '0.7-1.3', status: 'normal' as const },
    { name: 'eGFR', value: 85, unit: 'mL/min', ref: '>60', status: 'normal' as const },
  ],
}

const mockAiAnalysis = `간기능 검사 결과 전반적으로 정상 범위입니다.

• AST(28 U/L)와 ALT(34 U/L)는 간세포 손상 지표로, 현재 정상 범위 내에 있어 간 건강 상태가 양호합니다.
• GGT(22 U/L)도 정상으로, 담도 질환이나 알코올성 간 손상의 징후는 보이지 않습니다.

💡 생활습관 조언:
현재 간 건강이 양호하므로 규칙적인 운동과 균형 잡힌 식단을 유지하시면 됩니다. 과음은 피해주세요.`

export default function ResultDetail() {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/results">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              분석 결과: P001234
            </h1>
            <p className="text-muted-foreground">2024-12-08 검진 결과</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            인쇄
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            재분석
          </Button>
        </div>
      </div>

      {/* Patient Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">남성, 45세</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>검진일: 2024-12-08</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>분석완료: 12:34:21</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exam Group Tabs */}
      <Tabs defaultValue="liver" className="space-y-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex w-max">
            <TabsTrigger value="liver">간기능검사</TabsTrigger>
            <TabsTrigger value="kidney">신기능검사</TabsTrigger>
            <TabsTrigger value="blood">혈액검사</TabsTrigger>
            <TabsTrigger value="diabetes">당뇨검사</TabsTrigger>
            <TabsTrigger value="lipid">지질검사</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="liver" className="space-y-4">
          {/* Test Results Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                검사 수치
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>검사항목</TableHead>
                    <TableHead className="text-right">결과</TableHead>
                    <TableHead>참고치</TableHead>
                    <TableHead>판정</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTestResults.liver.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">
                        {item.value}{' '}
                        <span className="text-muted-foreground">{item.unit}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.ref}
                      </TableCell>
                      <TableCell>
                        <ResultBadge status={item.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                AI 분석 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {mockAiAnalysis}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kidney" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                검사 수치
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>검사항목</TableHead>
                    <TableHead className="text-right">결과</TableHead>
                    <TableHead>참고치</TableHead>
                    <TableHead>판정</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTestResults.kidney.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">
                        {item.value}{' '}
                        <span className="text-muted-foreground">{item.unit}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.ref}
                      </TableCell>
                      <TableCell>
                        <ResultBadge status={item.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                AI 분석 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  신기능 검사 결과 모든 수치가 정상 범위입니다.

                  • BUN(15 mg/dL)과 크레아티닌(1.0 mg/dL)은 신장 기능을 평가하는 핵심 지표로, 정상 범위 내에 있습니다.
                  • eGFR(85 mL/min)은 신장의 여과 기능을 나타내며, 정상 기능을 유지하고 있습니다.

                  💡 생활습관 조언:
                  충분한 수분 섭취를 유지하시고, 염분 섭취를 적절히 조절하세요.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blood">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                혈액검사 결과를 불러오는 중...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diabetes">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                당뇨검사 결과를 불러오는 중...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lipid">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                지질검사 결과를 불러오는 중...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
