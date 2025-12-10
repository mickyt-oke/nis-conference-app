import { requireAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Users, Video, LogOut } from "lucide-react"
import Link from "next/link"
import { logoutUser } from "@/app/login/actions"

export default async function DashboardPage() {
  const user = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="capitalize">
                {user.role}
              </Badge>
              <form action={logoutUser}>
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Your account details and current session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Username</p>
                <p className="text-lg">{user.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-lg">{user.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <Badge className="capitalize">{user.role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conferences</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Active conferences</p>
              <Link href="/conferences">
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  View All
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">Total documents</p>
              <Link href="/documents">
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Browse
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Speakers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Registered speakers</p>
              <Link href="/speakers">
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  View All
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Media</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Live streams</p>
              <Link href="/media">
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Watch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Role-specific Actions */}
        {/* WARNING: Client-side role checks are insufficient for security.
            Ensure that server-side authorization checks exist in the /admin route handlers.
            This UI check only hides elements and does not prevent unauthorized access. */}
        {user.role === "admin" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>Administrative functions and system management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/admin">
                  <Button>Admin Panel</Button>
                </Link>
                <Link href="/admin/users">
                  <Button variant="outline">Manage Users</Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline">System Settings</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === "supervisor" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Supervisor Actions</CardTitle>
              <CardDescription>Team management and approval workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/supervisor">
                  <Button>Approval Dashboard</Button>
                </Link>
                <Link href="/supervisor/team">
                  <Button variant="outline">Manage Team</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
