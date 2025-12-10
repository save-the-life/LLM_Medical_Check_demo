import {
  Activity,
  BarChart3,
  Clock,
  XCircle,
  ArrowUpRight,
  Eye,
  RotateCcw,
  CheckCircle2,
  Loader2,
  GitMerge,
  FileCode,
  FileText,
  Settings,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

// Stats Card Component
function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: {
  title: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease'
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {change && (
              <div
                className={cn(
                  'flex items-center text-sm mt-2',
                  changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                )}
              >
                <ArrowUpRight
                  className={cn(
                    'h-4 w-4 mr-1',
                    changeType === 'decrease' && 'rotate-180'
                  )}
                />
                {change}
              </div>
            )}
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          <CheckCircle2 className="h-3 w-3 mr-1" />
          완료
        </Badge>
      )
    case 'in_progress':
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          진행중
        </Badge>
      )
    case 'error':
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          <XCircle className="h-3 w-3 mr-1" />
          오류
        </Badge>
      )
    default:
      return null
  }
}

// Mock data for recent results
const recentResults = [
  {
    id: '1',
    time: '12:34:21',
    patientId: 'P001234',
    demographic: 'M/45',
    status: 'completed',
    duration: '8.2초',
  },
  {
    id: '2',
    time: '12:33:15',
    patientId: 'P001235',
    demographic: 'F/38',
    status: 'completed',
    duration: '7.5초',
  },
  {
    id: '3',
    time: '12:32:08',
    patientId: 'P001236',
    demographic: 'M/52',
    status: 'in_progress',
    duration: null,
  },
  {
    id: '4',
    time: '12:30:45',
    patientId: 'P001237',
    demographic: 'F/61',
    status: 'error',
    duration: null,
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground">
          병원 AI 분석 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="오늘 분석"
          value={128}
          change="15% 증가"
          changeType="increase"
          icon={Activity}
        />
        <StatsCard
          title="이번달 누적"
          value="2,341건"
          change="8% 증가"
          changeType="increase"
          icon={BarChart3}
        />
        <StatsCard title="대기중" value={5} icon={Clock} />
        <StatsCard title="오류" value={2} icon={XCircle} />
      </div>

      {/* Onboarding Status & Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Onboarding */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">온보딩 상태</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>전체 진행률</span>
                <span className="font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              {[
                { label: '검사 그룹 매핑', value: '22/22', done: true },
                { label: '검사 항목 매핑', value: '85/85', done: true },
                { label: '프롬프트 설정', value: '완료', done: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">{item.label}:</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">빠른 작업</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '검사 매핑', icon: GitMerge, href: '/mappings' },
                { label: '프롬프트', icon: FileCode, href: '/prompts' },
                { label: '분석 결과', icon: FileText, href: '/results' },
                { label: '설정', icon: Settings, href: '/settings' },
              ].map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-2"
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analysis Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">최근 분석 결과</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/results">
              전체 보기
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시간</TableHead>
                <TableHead>환자ID</TableHead>
                <TableHead>성별/나이</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>소요시간</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="text-muted-foreground">
                    {result.time}
                  </TableCell>
                  <TableCell className="font-medium">{result.patientId}</TableCell>
                  <TableCell>{result.demographic}</TableCell>
                  <TableCell>
                    <StatusBadge status={result.status} />
                  </TableCell>
                  <TableCell>{result.duration || '-'}</TableCell>
                  <TableCell className="text-right">
                    {result.status === 'error' ? (
                      <Button variant="ghost" size="icon">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
