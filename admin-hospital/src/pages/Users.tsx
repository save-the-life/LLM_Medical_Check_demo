import { useState } from 'react'
import {
  Search,
  Plus,
  Shield,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Mock data
const mockUsers = [
  {
    id: '1',
    name: '김관리',
    email: 'admin@kdkh.or.kr',
    role: 'hospital_admin',
    isActive: true,
    lastLogin: '2024-12-08 12:00',
  },
  {
    id: '2',
    name: '이의사',
    email: 'doctor@kdkh.or.kr',
    role: 'doctor',
    isActive: true,
    lastLogin: '2024-12-08 11:30',
  },
  {
    id: '3',
    name: '박간호',
    email: 'nurse@kdkh.or.kr',
    role: 'staff',
    isActive: true,
    lastLogin: '2024-12-07 17:00',
  },
  {
    id: '4',
    name: '최전산',
    email: 'it@kdkh.or.kr',
    role: 'hospital_admin',
    isActive: false,
    lastLogin: '2024-12-01 09:00',
  },
]

const roles = [
  {
    value: 'hospital_admin',
    label: '병원관리자',
    icon: Shield,
    description: '모든 기능 접근 가능',
  },
  {
    value: 'doctor',
    label: '의사',
    icon: User,
    description: '분석 결과 조회, 재분석',
  },
  {
    value: 'staff',
    label: '스태프',
    icon: User,
    description: '분석 결과 조회만',
  },
]

function getRoleInfo(role: string) {
  return roles.find((r) => r.value === role) || roles[2]
}

// User Dialog Component
function UserDialog({
  open,
  onOpenChange,
  user,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: typeof mockUsers[0]
}) {
  const isEdit = !!user

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? '사용자 편집' : '새 사용자 추가'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? '사용자 정보를 수정합니다.'
              : '새로운 사용자를 추가합니다. 이메일로 초대장이 발송됩니다.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" placeholder="홍길동" defaultValue={user?.name} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@hospital.or.kr"
              defaultValue={user?.email}
            />
          </div>

          <div className="grid gap-2">
            <Label>역할</Label>
            <Select defaultValue={user?.role || 'staff'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex items-center gap-2">
                      <role.icon className="h-4 w-4" />
                      <div>
                        <div>{role.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {role.description}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isEdit && (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>계정 활성화</Label>
                <p className="text-sm text-muted-foreground">
                  비활성화 시 로그인이 차단됩니다
                </p>
              </div>
              <Switch defaultChecked={user?.isActive} />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button>{isEdit ? '저장' : '초대 발송'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function Users() {
  const [users] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<typeof mockUsers[0] | undefined>()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive)
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = () => {
    setEditingUser(undefined)
    setDialogOpen(true)
  }

  const handleEditUser = (user: typeof mockUsers[0]) => {
    setEditingUser(user)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">사용자 관리</h1>
          <p className="text-muted-foreground">병원 내 Admin 사용자를 관리합니다</p>
        </div>
        <Button onClick={handleAddUser}>
          <Plus className="mr-2 h-4 w-4" />
          새 사용자 추가
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="이름, 이메일 검색..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="역할" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 역할</SelectItem>
            <SelectItem value="hospital_admin">병원관리자</SelectItem>
            <SelectItem value="doctor">의사</SelectItem>
            <SelectItem value="staff">스태프</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            <SelectItem value="active">활성</SelectItem>
            <SelectItem value="inactive">비활성</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>마지막 접속</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const roleInfo = getRoleInfo(user.role)
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <roleInfo.icon className="h-4 w-4 text-muted-foreground" />
                      <span>{roleInfo.label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.isActive ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        활성
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        비활성
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          편집
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Role Permissions Info */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-1">
            <p>
              <strong>병원관리자:</strong> 모든 기능 (매핑, 프롬프트, 사용자 관리)
            </p>
            <p>
              <strong>의사:</strong> 분석 결과 조회, 재분석 요청
            </p>
            <p>
              <strong>스태프:</strong> 분석 결과 조회만
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* User Dialog */}
      <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={editingUser}
      />
    </div>
  )
}
