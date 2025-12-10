import { useState, useRef, useCallback } from 'react'
import * as XLSX from 'xlsx'
import {
  Search,
  Upload,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Beaker,
  Info,
  FileSpreadsheet,
  Loader2,
  X,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
const mockMappings = [
  { id: '1', sourceGroupCode: 'GRP001', sourceGroupName: '신체계측', standardGroupName: '신체계측' },
  { id: '2', sourceGroupCode: 'GRP002', sourceGroupName: '혈압', standardGroupName: '혈압검사' },
  { id: '3', sourceGroupCode: 'GRP003', sourceGroupName: '소변검사', standardGroupName: '요검사' },
  { id: '4', sourceGroupCode: 'GRP004', sourceGroupName: '혈액검사', standardGroupName: '일반혈액검사' },
  { id: '5', sourceGroupCode: 'GRP005', sourceGroupName: '당뇨검사', standardGroupName: '당뇨검사' },
  { id: '6', sourceGroupCode: 'GRP006', sourceGroupName: '심혈관 기능검사', standardGroupName: '심장기능검사' },
  { id: '7', sourceGroupCode: 'GRP007', sourceGroupName: '간 및 신장 기능검사', standardGroupName: '간기능검사' },
  { id: '8', sourceGroupCode: 'GRP008', sourceGroupName: '고지혈검사', standardGroupName: '지질검사' },
]

const standardGroups = [
  { code: 'STD001', name: '신체계측' },
  { code: 'STD002', name: '혈압검사' },
  { code: 'STD003', name: '요검사' },
  { code: 'STD004', name: '일반혈액검사' },
  { code: 'STD005', name: '당뇨검사' },
  { code: 'STD006', name: '심장기능검사' },
  { code: 'STD007', name: '간기능검사' },
  { code: 'STD008', name: '신기능검사' },
  { code: 'STD009', name: '지질검사' },
  { code: 'STD010', name: '갑상선기능검사' },
]

// Excel Upload Dialog with full functionality
interface ExcelUploadDialogProps {
  onUploadComplete: (data: Array<{ sourceGroupCode: string; sourceGroupName: string; standardGroupName: string }>) => void
}

function ExcelUploadDialog({ onUploadComplete }: ExcelUploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<Array<Record<string, string>>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processExcelFile = useCallback((file: File) => {
    setUploadError(null)
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet)

        if (jsonData.length === 0) {
          setUploadError('파일에 데이터가 없습니다.')
          return
        }

        // Validate required columns
        const requiredColumns = ['EMR 그룹 코드', 'EMR 그룹명', '표준 그룹']
        const firstRow = jsonData[0]
        const missingColumns = requiredColumns.filter(col => !(col in firstRow))

        if (missingColumns.length > 0) {
          setUploadError(`필수 컬럼이 없습니다: ${missingColumns.join(', ')}`)
          return
        }

        setPreviewData(jsonData.slice(0, 5)) // Preview first 5 rows
        setSelectedFile(file)
      } catch {
        setUploadError('파일을 읽는 중 오류가 발생했습니다.')
      }
    }

    reader.onerror = () => {
      setUploadError('파일을 읽는 중 오류가 발생했습니다.')
    }

    reader.readAsArrayBuffer(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        processExcelFile(file)
      } else {
        setUploadError('.xlsx 또는 .xls 파일만 업로드할 수 있습니다.')
      }
    }
  }, [processExcelFile])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        processExcelFile(file)
      } else {
        setUploadError('.xlsx 또는 .xls 파일만 업로드할 수 있습니다.')
      }
    }
  }, [processExcelFile])

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return

    setIsUploading(true)

    try {
      const reader = new FileReader()

      reader.onload = (e) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet)

        const mappings = jsonData.map(row => ({
          sourceGroupCode: row['EMR 그룹 코드'] || '',
          sourceGroupName: row['EMR 그룹명'] || '',
          standardGroupName: row['표준 그룹'] || '',
        }))

        // Simulate API call delay
        setTimeout(() => {
          onUploadComplete(mappings)
          setIsUploading(false)
          setIsOpen(false)
          resetState()
        }, 1000)
      }

      reader.readAsArrayBuffer(selectedFile)
    } catch {
      setUploadError('업로드 중 오류가 발생했습니다.')
      setIsUploading(false)
    }
  }, [selectedFile, onUploadComplete])

  const downloadTemplate = useCallback(() => {
    const templateData = [
      { 'EMR 그룹 코드': 'GRP001', 'EMR 그룹명': '신체계측', '표준 그룹': '신체계측' },
      { 'EMR 그룹 코드': 'GRP002', 'EMR 그룹명': '혈압', '표준 그룹': '혈압검사' },
    ]

    const ws = XLSX.utils.json_to_sheet(templateData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '매핑 템플릿')

    // Set column widths
    ws['!cols'] = [{ wch: 15 }, { wch: 20 }, { wch: 20 }]

    XLSX.writeFile(wb, '그룹매핑_템플릿.xlsx')
  }, [])

  const resetState = useCallback(() => {
    setSelectedFile(null)
    setPreviewData([])
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      resetState()
    }
  }, [resetState])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Excel 업로드
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>매핑 파일 업로드</DialogTitle>
          <DialogDescription>
            Excel 파일을 업로드하여 여러 매핑을 한 번에 설정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* File Drop Zone */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileSelect}
          />

          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                파일을 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-xs text-gray-400 mt-1">.xlsx, .xls 파일만 지원</p>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB · {previewData.length}개 행 미리보기
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={resetState}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Preview Table */}
              {previewData.length > 0 && (
                <div className="mt-4 border rounded overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">EMR 그룹 코드</th>
                        <th className="px-3 py-2 text-left font-medium">EMR 그룹명</th>
                        <th className="px-3 py-2 text-left font-medium">표준 그룹</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-3 py-2">{row['EMR 그룹 코드']}</td>
                          <td className="px-3 py-2">{row['EMR 그룹명']}</td>
                          <td className="px-3 py-2">{row['표준 그룹']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {uploadError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {uploadError}
              </AlertDescription>
            </Alert>
          )}

          {/* Template Download */}
          <Button variant="link" className="text-sm justify-start px-0" onClick={downloadTemplate}>
            <Download className="mr-2 h-4 w-4" />
            템플릿 파일 다운로드
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isUploading}>
            취소
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                업로드 중...
              </>
            ) : (
              '업로드'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Mapping Test Dialog
function MappingTestDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Beaker className="mr-2 h-4 w-4" />
          매핑 테스트
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>매핑 테스트 결과</DialogTitle>
          <DialogDescription>
            샘플 데이터로 매핑 변환 결과를 확인합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Before */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                변환 전 (EMR 원본)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p className="font-medium">그룹: 간 및 신장 기능검사</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• AST(SGOT): 28 U/L</li>
                  <li>• ALT(SGPT): 34 U/L</li>
                  <li>• GGT(γ-GTP): 22 U/L</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-1">
              ▼ 매핑 적용
            </Badge>
          </div>

          {/* After */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                변환 후 (표준화)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p className="font-medium text-green-900">
                  그룹: 간기능검사 (STD_LIVER)
                </p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>AST: 28 U/L</span>
                    <span className="text-green-600">✓ 정상 (참고: M&lt;40)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ALT: 34 U/L</span>
                    <span className="text-green-600">✓ 정상 (참고: M&lt;41)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GGT: 22 U/L</span>
                    <span className="text-green-600">✓ 정상 (참고: 10-71)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              변환 성공! 이 매핑 설정으로 분석을 진행할 수 있습니다.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline">다시 테스트</Button>
          <Button>매핑 저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function GroupMappings() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [mappings, setMappings] = useState(mockMappings)

  const mappedCount = mappings.filter((m) => m.standardGroupName).length
  const progress = (mappedCount / mappings.length) * 100

  const filteredMappings = mappings.filter((mapping) => {
    const matchesSearch =
      mapping.sourceGroupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mapping.sourceGroupCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'mapped' && mapping.standardGroupName) ||
      (statusFilter === 'unmapped' && !mapping.standardGroupName)
    return matchesSearch && matchesStatus
  })

  const handleMappingChange = (id: string, value: string) => {
    setMappings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, standardGroupName: value } : m))
    )
  }

  const handleExcelUpload = (data: Array<{ sourceGroupCode: string; sourceGroupName: string; standardGroupName: string }>) => {
    // Update existing mappings or add new ones from Excel data
    setMappings((prev) => {
      const updatedMappings = [...prev]

      data.forEach((excelRow) => {
        const existingIndex = updatedMappings.findIndex(
          (m) => m.sourceGroupCode === excelRow.sourceGroupCode
        )

        if (existingIndex >= 0) {
          // Update existing mapping
          updatedMappings[existingIndex] = {
            ...updatedMappings[existingIndex],
            sourceGroupName: excelRow.sourceGroupName,
            standardGroupName: excelRow.standardGroupName,
          }
        } else {
          // Add new mapping
          updatedMappings.push({
            id: `new-${Date.now()}-${Math.random()}`,
            sourceGroupCode: excelRow.sourceGroupCode,
            sourceGroupName: excelRow.sourceGroupName,
            standardGroupName: excelRow.standardGroupName,
          })
        }
      })

      return updatedMappings
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">검사 그룹 매핑</h1>
          <p className="text-muted-foreground">
            EMR의 검사 그룹을 표준 검사 그룹에 매핑합니다
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            EMR 새로고침
          </Button>
          <ExcelUploadDialog onUploadComplete={handleExcelUpload} />
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            다운로드
          </Button>
        </div>
      </div>

      {/* Mapping Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>매핑 현황</span>
              <span className="font-medium">
                {mappedCount}/{mappings.length} ({progress.toFixed(0)}%)
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>매핑 완료: {mappedCount}개</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>미매핑: {mappings.length - mappedCount}개</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="검사 그룹 검색..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="mapped">매핑됨</SelectItem>
            <SelectItem value="unmapped">미매핑</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mapping Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>EMR 그룹 코드</TableHead>
              <TableHead>EMR 그룹명</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  표준 그룹
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>플랫폼에서 정의한 표준 검사 그룹</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-center">상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMappings.map((mapping) => (
              <TableRow key={mapping.id}>
                <TableCell className="font-mono text-sm">
                  {mapping.sourceGroupCode}
                </TableCell>
                <TableCell className="font-medium">
                  {mapping.sourceGroupName}
                </TableCell>
                <TableCell>
                  <Select
                    value={mapping.standardGroupName || ''}
                    onValueChange={(value) => handleMappingChange(mapping.id, value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="표준 그룹 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {standardGroups.map((group) => (
                        <SelectItem key={group.code} value={group.name}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center">
                  {mapping.standardGroupName ? (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Bottom Action */}
      <div className="flex justify-end">
        <MappingTestDialog />
      </div>
    </div>
  )
}
