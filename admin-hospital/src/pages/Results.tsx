import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Download,
  BarChart3,
  Calendar,
  Eye,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data
const mockResults = [
  { id: '1', date: '12-08', patientId: 'P001234', demographic: 'M/45', groupCount: 22, status: 'completed', duration: '8.2초' },
  { id: '2', date: '12-08', patientId: 'P001235', demographic: 'F/38', groupCount: 20, status: 'completed', duration: '7.5초' },
  { id: '3', date: '12-08', patientId: 'P001236', demographic: 'M/52', groupCount: 22, status: 'error', duration: null },
  { id: '4', date: '12-07', patientId: 'P001237', demographic: 'F/61', groupCount: 18, status: 'completed', duration: '6.8초' },
  { id: '5', date: '12-07', patientId: 'P001238', demographic: 'M/33', groupCount: 15, status: 'completed', duration: '5.2초' },
  { id: '6', date: '12-07', patientId: 'P001239', demographic: 'F/45', groupCount: 22, status: 'completed', duration: '7.1초' },
  { id: '7', date: '12-06', patientId: 'P001240', demographic: 'M/58', groupCount: 20, status: 'completed', duration: '6.5초' },
  { id: '8', date: '12-06', patientId: 'P001241', demographic: 'F/29', groupCount: 18, status: 'in_progress', duration: null },
]

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

export default function Results() {
  const [results] = useState(mockResults)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [startDate, setStartDate] = useState('2024-12-01')
  const [endDate, setEndDate] = useState('2024-12-08')
  const [currentPage, setCurrentPage] = useState(1)

  const totalResults = 2341
  const successResults = 2339
  const errorResults = 2

  const filteredResults = results.filter((result) => {
    const matchesSearch = result.patientId
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || result.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">분석 결과 조회</h1>
          <p className="text-muted-foreground">
            AI 분석 결과를 검색하고 조회합니다
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Excel 내보내기
          </Button>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            통계
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap">기간</Label>
              <div className="flex items-center gap-2 flex-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-10"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <span>~</span>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-10"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="환자ID 검색..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
                <SelectItem value="in_progress">진행중</SelectItem>
                <SelectItem value="error">오류</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="mr-2 h-4 w-4" />
              검색
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm">
            총 <span className="font-bold">{totalResults.toLocaleString()}건</span> 중{' '}
            <span className="font-bold text-green-600">
              {successResults.toLocaleString()}건 성공
            </span>{' '}
            (99.9%),{' '}
            <span className="font-bold text-red-600">{errorResults}건 오류</span>
          </p>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>검진일</TableHead>
              <TableHead>환자ID</TableHead>
              <TableHead>성별/나이</TableHead>
              <TableHead>검사그룹</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>소요시간</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.date}</TableCell>
                <TableCell className="font-medium">{result.patientId}</TableCell>
                <TableCell>{result.demographic}</TableCell>
                <TableCell>{result.groupCount}개</TableCell>
                <TableCell>
                  <StatusBadge status={result.status} />
                </TableCell>
                <TableCell>{result.duration || '-'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/results/${result.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    {result.status === 'error' && (
                      <Button variant="ghost" size="icon">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {[1, 2, 3, 4, 5].map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <span className="px-2">...</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(47)}
        >
          47
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Label component for the filter section
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-sm font-medium ${className || ''}`}>{children}</span>
}
