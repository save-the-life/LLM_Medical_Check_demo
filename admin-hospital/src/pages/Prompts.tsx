import { useState } from 'react'
import { RotateCcw, Edit, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock data
const mockPrompts = [
  { id: '1', groupName: '간기능검사', isCustom: true, lastModified: '2024-12-05 14:30', testScore: 94.5 },
  { id: '2', groupName: '신기능검사', isCustom: false, lastModified: null, testScore: 93.8 },
  { id: '3', groupName: '일반혈액검사', isCustom: false, lastModified: null, testScore: 95.1 },
  { id: '4', groupName: '당뇨검사', isCustom: true, lastModified: '2024-12-03 09:15', testScore: 96.2 },
  { id: '5', groupName: '지질검사', isCustom: false, lastModified: null, testScore: 92.3 },
  { id: '6', groupName: '갑상선기능검사', isCustom: false, lastModified: null, testScore: 91.8 },
  { id: '7', groupName: '종양표지자검사', isCustom: false, lastModified: null, testScore: 89.5 },
  { id: '8', groupName: '요검사', isCustom: false, lastModified: null, testScore: 94.0 },
]

export default function Prompts() {
  const [prompts] = useState(mockPrompts)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">프롬프트 관리</h1>
          <p className="text-muted-foreground">
            검사 그룹별 AI 분석 프롬프트를 관리합니다
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            기본값 전체 복원
          </Button>
        </div>
      </div>

      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          마스터 프롬프트를 기반으로 병원 특성에 맞게 커스터마이징할 수 있습니다.
          <div className="mt-2 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
              커스텀: 병원에서 수정한 프롬프트
            </span>
            <span className="flex items-center gap-1">
              <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full" />
              기본값: 플랫폼 마스터 프롬프트 사용
            </span>
          </div>
        </AlertDescription>
      </Alert>

      {/* Prompts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>검사 그룹</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>마지막 수정</TableHead>
              <TableHead>테스트 결과</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prompts.map((prompt) => (
              <TableRow key={prompt.id}>
                <TableCell className="font-medium">{prompt.groupName}</TableCell>
                <TableCell>
                  {prompt.isCustom ? (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      커스텀
                    </Badge>
                  ) : (
                    <Badge variant="secondary">기본값</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {prompt.lastModified || '-'}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      prompt.testScore >= 95
                        ? 'text-green-600 font-medium'
                        : prompt.testScore >= 90
                        ? 'text-blue-600 font-medium'
                        : 'text-yellow-600 font-medium'
                    }
                  >
                    {prompt.testScore}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/prompts/${prompt.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      편집
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
