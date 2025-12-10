import { Building2, Key, Bell, Database, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        <p className="text-muted-foreground">병원 Admin 시스템 설정을 관리합니다</p>
      </div>

      <Tabs defaultValue="hospital" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hospital">
            <Building2 className="mr-2 h-4 w-4" />
            병원 정보
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="mr-2 h-4 w-4" />
            API 설정
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            알림
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="mr-2 h-4 w-4" />
            데이터
          </TabsTrigger>
        </TabsList>

        {/* Hospital Info */}
        <TabsContent value="hospital" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>병원 기본 정보</CardTitle>
              <CardDescription>
                병원의 기본 정보를 확인하고 수정합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hospitalName">병원명</Label>
                  <Input
                    id="hospitalName"
                    defaultValue="강동경희대학교병원"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospitalCode">병원 코드</Label>
                  <Input id="hospitalCode" defaultValue="kdkh" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">관리자 이메일</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    defaultValue="admin@kdkh.or.kr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">연락처</Label>
                  <Input id="phone" defaultValue="02-440-7000" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>EMR 연동 설정</CardTitle>
              <CardDescription>EMR 시스템 연동을 위한 API 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emrEndpoint">EMR API 엔드포인트</Label>
                <Input
                  id="emrEndpoint"
                  defaultValue="https://emr.kdkh.or.kr/api/v1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  defaultValue="sk-xxx-xxx-xxx"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>자동 동기화</Label>
                  <p className="text-sm text-muted-foreground">
                    EMR 데이터를 자동으로 동기화합니다
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI 분석 설정</CardTitle>
              <CardDescription>AI 분석 엔진 연동 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aiEndpoint">AI API 엔드포인트</Label>
                <Input
                  id="aiEndpoint"
                  defaultValue="http://10.100.42.78:11434/api"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">모델</Label>
                <Input
                  id="model"
                  defaultValue="puyangwang/medgemma-27b-it:q4_0"
                />
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>시스템 알림 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>분석 완료 알림</Label>
                  <p className="text-sm text-muted-foreground">
                    AI 분석이 완료되면 알림을 받습니다
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>오류 알림</Label>
                  <p className="text-sm text-muted-foreground">
                    분석 오류 발생 시 알림을 받습니다
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>일일 리포트</Label>
                  <p className="text-sm text-muted-foreground">
                    매일 분석 현황 리포트를 받습니다
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">
                    알림을 이메일로도 받습니다
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data */}
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>데이터 관리</CardTitle>
              <CardDescription>분석 데이터 보관 및 관리 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>데이터 보관 기간</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="30">30일</option>
                  <option value="90">90일</option>
                  <option value="180" selected>180일</option>
                  <option value="365">1년</option>
                  <option value="unlimited">무제한</option>
                </select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>자동 백업</Label>
                  <p className="text-sm text-muted-foreground">
                    매일 자동으로 데이터를 백업합니다
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="rounded-lg bg-muted p-4">
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">총 분석 건수:</span> 45,821건
                  </p>
                  <p>
                    <span className="font-medium">데이터 사용량:</span> 2.3 GB /
                    무제한
                  </p>
                  <p>
                    <span className="font-medium">마지막 백업:</span> 2024-12-08
                    03:00
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">수동 백업</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
