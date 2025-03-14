
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Users, Shield, Landmark, Building, Heart } from "lucide-react";

type UserRole = "admin" | "ranger" | "farmer" | "community_leader" | "government" | "insurance";

interface AdminSidebarProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ userRole, setUserRole }) => {
  const userRoles = [
    { value: "admin", label: "Administrator", icon: <Shield className="h-4 w-4 mr-2" />, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
    { value: "ranger", label: "Forest Ranger", icon: <UserCircle className="h-4 w-4 mr-2" />, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
    { value: "farmer", label: "Local Farmer", icon: <Users className="h-4 w-4 mr-2" />, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
    { value: "community_leader", label: "Community Leader", icon: <Users className="h-4 w-4 mr-2" />, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
    { value: "government", label: "Government Official", icon: <Landmark className="h-4 w-4 mr-2" />, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
    { value: "insurance", label: "Insurance Provider", icon: <Building className="h-4 w-4 mr-2" />, color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" },
  ];

  const currentRole = userRoles.find(role => role.value === userRole);

  return (
    <div className="w-full lg:w-64 space-y-4 mb-6 lg:mb-0">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-elephant-100 dark:bg-elephant-800 flex items-center justify-center text-elephant-600 dark:text-elephant-300">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Tuker Trust</div>
              <div className="text-sm text-elephant-500 dark:text-elephant-400">Conservation Program</div>
            </div>
          </div>

          <div className="pt-3">
            <div className="text-sm font-medium mb-2">Switch Role</div>
            <Select value={userRole} onValueChange={(value) => setUserRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue>
                  {currentRole && (
                    <span className="flex items-center">
                      {currentRole.icon}
                      {currentRole.label}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {userRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <span className="flex items-center">
                      {role.icon}
                      {role.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-3">
            <div className="text-sm font-medium mb-2">Access Level</div>
            <Badge className={userRole === "admin" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"}>
              {userRole === "admin" ? "Full Access" : "Role-Based Access"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Active Incidents</span>
              <Badge variant="outline">23</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tracked Elephants</span>
              <Badge variant="outline">42</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Pending Approvals</span>
              <Badge variant="outline">7</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Active Users</span>
              <Badge variant="outline">156</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSidebar;
