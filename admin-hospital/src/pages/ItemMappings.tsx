import { useState } from 'react'
import {
  Search,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Beaker,
  Edit,
  MapPin,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
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
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Mock data
const examGroups = [
  { code: 'GRP007', name: '간기능검사', standardName: '간기능검사' },
  { code: 'GRP008', name: '신기능검사', standardName: '신기능검사' },
  { code: 'GRP004', name: '혈액검사', standardName: '일반혈액검사' },
]

const mockItems = [
  { id: '1', sourceItemName: 'AST(SGOT)', standardItemName: 'AST', sourceUnit: 'U/L', standardUnit: 'U/L', conversionFormula: null },
  { id: '2', sourceItemName: 'ALT(SGPT)', standardItemName: 'ALT', sourceUnit: 'U/L', standardUnit: 'U/L', conversionFormula: null },
  { id: '3', sourceItemName: 'GGT(γ-GTP)', standardItemName: 'GGT', sourceUnit: 'U/L', standardUnit: 'U/L', conversionFormula: null },
  { id: '4', sourceItemName: 'ALP(알카리포스파타제)', standardItemName: 'ALP', sourceUnit: 'U/L', standardUnit: 'U/L', conversionFormula: null },
  { id: '5', sourceItemName: '총빌리루빈', standardItemName: '총빌리루빈', sourceUnit: 'mg/dl', standardUnit: 'mg/dL', conversionFormula: null },
  { id: '6', sourceItemName: '직접 빌리루빈', standardItemName: '직접빌리루빈', sourceUnit: 'mg/dL', standardUnit: 'mg/dL', conversionFormula: null },
  { id: '7', sourceItemName: 'Total Protein', standardItemName: '총단백', sourceUnit: 'g/dl', standardUnit: 'g/dL', conversionFormula: null },
  { id: '8', sourceItemName: 'Albumin(알부민)', standardItemName: '알부민', sourceUnit: 'g/dl', standardUnit: 'g/dL', conversionFormula: null },
]

const standardItems = [
  'AST', 'ALT', 'GGT', 'ALP', '총빌리루빈', '직접빌리루빈', '총단백', '알부민',
  'BUN', '크레아티닌', 'eGFR', '요산',
]

// Unit Conversion Dialog
function UnitConversionDialog({ item }: { item: typeof mockItems[0] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>단위 변환 설정</DialogTitle>
          <DialogDescription>
            {item.sourceItemName}의 단위 변환 공식을 설정합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>EMR 단위</Label>
              <Input value={item.sourceUnit} disabled className="bg-gray-50" />
            </div>
            <div>
              <Label>표준 단위</Label>
              <Input value={item.standardUnit} disabled className="bg-gray-50" />
            </div>
          </div>

          {item.sourceUnit.toLowerCase() !== item.standardUnit.toLowerCase() && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  단위가 다릅니다. 변환 공식을 설정해주세요.
                </AlertDescription>
              </Alert>
              <div>
                <Label>변환 공식</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">변환 없음 (동일 단위)</SelectItem>
                    <SelectItem value="multiply">곱하기</SelectItem>
                    <SelectItem value="divide">나누기</SelectItem>
                    <SelectItem value="custom">커스텀 공식</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>변환 계수</Label>
                <Input type="number" placeholder="예: 1.0, 0.1, 10" />
              </div>
            </>
          )}

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">변환 예시:</p>
            <p className="text-sm font-medium mt-1">
              28 {item.sourceUnit} → 28 {item.standardUnit}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ItemMappings() {
  const [selectedGroup, setSelectedGroup] = useState(examGroups[0].code)
  const [searchQuery, setSearchQuery] = useState('')
  const [items, setItems] = useState(mockItems)

  const currentGroup = examGroups.find((g) => g.code === selectedGroup)
  const mappedCount = items.filter((i) => i.standardItemName).length
  const progress = (mappedCount / items.length) * 100

  const filteredItems = items.filter((item) =>
    item.sourceItemName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleItemMappingChange = (id: string, value: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, standardItemName: value } : i))
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">검사 항목 매핑</h1>
          <p className="text-muted-foreground">
            검사 그룹 내 개별 항목을 표준 검사 항목에 매핑합니다
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Excel 업로드
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            다운로드
          </Button>
          <Button>
            <Beaker className="mr-2 h-4 w-4" />
            테스트
          </Button>
        </div>
      </div>

      {/* Group Selection */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="w-24">그룹 선택</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {examGroups.map((group) => (
                    <SelectItem key={group.code} value={group.code}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentGroup && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{currentGroup.name}</span>
                <span>→</span>
                <span className="font-medium text-foreground">
                  {currentGroup.standardName}
                </span>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>매핑 현황</span>
                <span className="font-medium">
                  {mappedCount}/{items.length} ({progress.toFixed(0)}%)
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="검사 항목 검색..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Items Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>EMR 검사명</TableHead>
              <TableHead>표준 검사명</TableHead>
              <TableHead>단위 변환</TableHead>
              <TableHead className="text-center">상태</TableHead>
              <TableHead className="text-center">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.sourceItemName}</TableCell>
                <TableCell>
                  <Select
                    value={item.standardItemName || ''}
                    onValueChange={(value) => handleItemMappingChange(item.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {standardItems.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {item.sourceUnit} → {item.standardUnit}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {item.standardItemName ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      매핑됨
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      <AlertCircle className="h-3 w-3 mr-1" />
                      미매핑
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <UnitConversionDialog item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Info */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          단위가 다른 경우 변환 공식을 설정해야 합니다.
        </AlertDescription>
      </Alert>
    </div>
  )
}
