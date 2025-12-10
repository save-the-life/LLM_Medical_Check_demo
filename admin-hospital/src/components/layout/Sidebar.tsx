import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  GitMerge,
  FileCode,
  Users,
  FileText,
  Settings,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface MenuItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  children?: { title: string; href: string }[]
}

const menuItems: MenuItem[] = [
  {
    title: '대시보드',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: '검사 매핑',
    icon: GitMerge,
    href: '/mappings',
    children: [
      { title: '그룹 매핑', href: '/mappings/groups' },
      { title: '항목 매핑', href: '/mappings/items' },
    ],
  },
  {
    title: '프롬프트 관리',
    icon: FileCode,
    href: '/prompts',
  },
  {
    title: '사용자 관리',
    icon: Users,
    href: '/users',
  },
  {
    title: '분석 결과',
    icon: FileText,
    href: '/results',
  },
  {
    title: '설정',
    icon: Settings,
    href: '/settings',
  },
]

export function Sidebar() {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['/mappings'])

  const toggleMenu = (href: string) => {
    setExpandedMenus((prev) =>
      prev.includes(href)
        ? prev.filter((h) => h !== href)
        : [...prev, href]
    )
  }

  const isMenuExpanded = (href: string) => expandedMenus.includes(href)

  return (
    <aside className="w-64 border-r bg-gray-50/40 min-h-[calc(100vh-4rem)] p-4 flex flex-col">
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href ||
            location.pathname.startsWith(item.href + '/')
          const hasChildren = item.children && item.children.length > 0
          const isExpanded = isMenuExpanded(item.href)

          return (
            <div key={item.href}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.href)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                    <ChevronRight
                      className={cn(
                        'ml-auto h-4 w-4 transition-transform',
                        isExpanded && 'rotate-90'
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          className={({ isActive }) =>
                            cn(
                              'block px-3 py-2 rounded-md text-sm transition-colors',
                              isActive
                                ? 'text-primary font-medium bg-primary/10'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            )
                          }
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100'
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </NavLink>
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom: Usage Stats */}
      <div className="mt-auto pt-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-2">이번달 분석량</div>
          <div className="text-2xl font-bold text-primary">2,341건</div>
          <div className="text-xs text-gray-400 mt-1">무제한 플랜</div>
        </div>
      </div>
    </aside>
  )
}
