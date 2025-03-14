
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, BarChart3, Bell, CheckCircle, Clock, FileText, Shield, Users, Zap } from "lucide-react";

type UserRole = "admin" | "ranger" | "farmer" | "community_leader" | "government" | "insurance";

interface RoleDashboardProps {
  userRole: UserRole;
}

const RoleDashboard: React.FC<RoleDashboardProps> = ({ userRole }) => {
  // Dashboard content based on role
  const renderRoleDashboard = () => {
    switch (userRole) {
      case "ranger":
        return <RangerDashboard />;
      case "farmer":
        return <FarmerDashboard />;
      case "community_leader":
        return <CommunityLeaderDashboard />;
      case "government":
        return <GovernmentDashboard />;
      case "insurance":
        return <InsuranceDashboard />;
      case "admin":
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="mb-6 border-l-4 border-blue-500">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-sm font-medium">Role-Specific View</AlertTitle>
        <AlertDescription className="text-sm">
          You are currently viewing the dashboard as a{" "}
          <Badge variant="outline" className="font-normal">
            {userRole.replace("_", " ")}
          </Badge>
        </AlertDescription>
      </Alert>
      
      {renderRoleDashboard()}
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">128</div>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-green-600 dark:text-green-500 mr-1">+12%</span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">23</div>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-amber-600 dark:text-amber-500 mr-1">+5</span>
            <span className="text-muted-foreground">since yesterday</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="text-base font-medium">All Systems Operational</div>
          </div>
          <div className="text-sm text-muted-foreground mt-1">Last checked: 5 mins ago</div>
        </CardContent>
      </Card>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>System-wide activity in the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-300">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">New incident reported</p>
                <p className="text-xs text-muted-foreground">Amboseli North, 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-300">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Compensation approved</p>
                <p className="text-xs text-muted-foreground">Claim #1082, 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full text-amber-600 dark:text-amber-300">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">New community member</p>
                <p className="text-xs text-muted-foreground">Tsavo East region, 6 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600 dark:text-purple-300">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">System update completed</p>
                <p className="text-xs text-muted-foreground">Elephant tracking API, 12 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button className="justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
            <Button className="justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Send Notifications
            </Button>
            <Button className="justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button className="justify-start" variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </Button>
            <Button className="justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Community Outreach
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Ranger Dashboard Component
const RangerDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Active Patrols</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">12</div>
          <div className="text-sm text-muted-foreground mt-1">4 in high-risk areas</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Today's Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">3</div>
          <div className="text-sm text-muted-foreground mt-1">All responded to</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Tracked Elephants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">42</div>
          <div className="text-sm text-muted-foreground mt-1">8 near settlements</div>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Patrol Schedule</CardTitle>
        <CardDescription>Your upcoming assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>08:00 - 12:00</TableCell>
              <TableCell>Amboseli North</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>
              </TableCell>
              <TableCell>Medium</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>13:00 - 17:00</TableCell>
              <TableCell>Tsavo Border</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Current</Badge>
              </TableCell>
              <TableCell>High</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tomorrow, 07:00</TableCell>
              <TableCell>Mara River Crossing</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Scheduled</Badge>
              </TableCell>
              <TableCell>Critical</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    
    <div className="flex space-x-4">
      <Button>
        <Bell className="h-4 w-4 mr-2" />
        Report Incident
      </Button>
      <Button variant="outline">
        <FileText className="h-4 w-4 mr-2" />
        Log Patrol Report
      </Button>
    </div>
  </div>
);

// Farmer Dashboard Component
const FarmerDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Alert Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="font-medium">No Threats Detected</div>
          </div>
          <div className="text-sm text-muted-foreground mt-1">Last updated: 15 mins ago</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Deterrent Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="font-medium">Fence Alerts</span>
            <Switch checked={true} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Sound System</span>
            <Switch checked={true} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Light Beacons</span>
            <Switch checked={false} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">My Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">2</div>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-amber-600 dark:text-amber-500 mr-1">1 pending</span>
            <span className="text-green-600 dark:text-green-500 ml-2">1 approved</span>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Nearby Elephant Activity</CardTitle>
        <CardDescription>Tracking data from the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-300 mr-3">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Elephant herd (12 individuals)</div>
                <div className="text-sm text-muted-foreground">3.2 km away, moving east</div>
              </div>
            </div>
            <Badge>Medium Risk</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-300 mr-3">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Bull elephant (Tusker)</div>
                <div className="text-sm text-muted-foreground">8.5 km away, stationary</div>
              </div>
            </div>
            <Badge variant="outline">Low Risk</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <div className="flex space-x-4">
      <Button>
        <Bell className="h-4 w-4 mr-2" />
        Report Damage
      </Button>
      <Button variant="outline">
        <Clock className="h-4 w-4 mr-2" />
        View Claim Status
      </Button>
    </div>
  </div>
);

// Community Leader Dashboard
const CommunityLeaderDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Community Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">1</div>
          <div className="flex items-center mt-1">
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
              Warning: Elephants nearby
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Community Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">128</div>
          <div className="text-sm text-muted-foreground mt-1">+12 this month</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Your Contribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="font-medium text-lg">850 points</div>
            <Badge className="ml-2">Top Contributor</Badge>
          </div>
          <div className="text-sm text-muted-foreground mt-1">Earned $250 in rewards</div>
        </CardContent>
      </Card>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Community Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg bg-background">
              <div className="flex justify-between">
                <div className="font-medium">Crop Damage Report</div>
                <Badge variant="outline">2 days ago</Badge>
              </div>
              <div className="text-sm mt-1">Filed by Joseph Mutua - South Field Area</div>
              <div className="text-sm text-muted-foreground mt-1">
                Assessment completed, compensation processing
              </div>
            </div>
            
            <div className="p-3 border rounded-lg bg-background">
              <div className="flex justify-between">
                <div className="font-medium">Elephant Sighting</div>
                <Badge variant="outline">Yesterday</Badge>
              </div>
              <div className="text-sm mt-1">Filed by Sarah Olekina - Eastern Boundary</div>
              <div className="text-sm text-muted-foreground mt-1">
                Alert sent to nearby farmers, rangers dispatched
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Community Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg bg-background">
              <div className="font-medium">Conservation Training</div>
              <div className="text-sm mt-1">Tomorrow, 10:00 AM - Community Center</div>
              <div className="text-sm text-muted-foreground mt-1">
                Learn about new deterrent technologies
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  25 Attendees
                </Badge>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg bg-background">
              <div className="font-medium">Reward Distribution</div>
              <div className="text-sm mt-1">Friday, 2:00 PM - Village Square</div>
              <div className="text-sm text-muted-foreground mt-1">
                Monthly compensation and rewards payment
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  All Members
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <div className="flex space-x-4">
      <Button>
        <Bell className="h-4 w-4 mr-2" />
        Send Community Alert
      </Button>
      <Button variant="outline">
        <Users className="h-4 w-4 mr-2" />
        Manage Members
      </Button>
    </div>
  </div>
);

// Government Dashboard Component
const GovernmentDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Program Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">5 Regions</div>
          <div className="text-sm text-muted-foreground mt-1">428 participating households</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Budget Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">$128,500</div>
          <div className="text-sm text-muted-foreground mt-1">$45,200 distributed this quarter</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Conservation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="font-medium">Positive Trend</div>
          </div>
          <div className="text-sm text-muted-foreground mt-1">Elephant population increased by 8%</div>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Policy Effectiveness</CardTitle>
        <CardDescription>Impact metrics of current conservation policies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <div className="text-sm font-medium">Human-Wildlife Conflict Reduction</div>
              <div className="text-sm font-medium">62%</div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "62%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <div className="text-sm font-medium">Community Participation</div>
              <div className="text-sm font-medium">78%</div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <div className="text-sm font-medium">Sustainable Land Use</div>
              <div className="text-sm font-medium">45%</div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <div className="text-sm font-medium">Economic Benefits Distribution</div>
              <div className="text-sm font-medium">53%</div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "53%" }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
      <Button className="flex-1">
        <FileText className="h-4 w-4 mr-2" />
        Generate Policy Report
      </Button>
      <Button variant="outline" className="flex-1">
        <BarChart3 className="h-4 w-4 mr-2" />
        View Economic Impact
      </Button>
      <Button variant="outline" className="flex-1">
        <Users className="h-4 w-4 mr-2" />
        Community Feedback
      </Button>
    </div>
  </div>
);

// Insurance Dashboard Component
const InsuranceDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">86</div>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-green-600 dark:text-green-500 mr-1">52 approved</span>
            <span className="text-red-600 dark:text-red-500 ml-2">14 rejected</span>
            <span className="text-amber-600 dark:text-amber-500 ml-2">20 pending</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Payout Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">$54,820</div>
          <div className="text-sm text-muted-foreground mt-1">Average $1,054 per claim</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Fraud Detection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">9</div>
          <div className="text-sm text-muted-foreground mt-1">Suspected fraudulent claims</div>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Claims Assessment</CardTitle>
        <CardDescription>Claims requiring review</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID</TableHead>
              <TableHead>Claimant</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Incident Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#1082</TableCell>
              <TableCell>Joseph Mutua</TableCell>
              <TableCell>$1,250</TableCell>
              <TableCell>May 15, 2023</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  Pending Review
                </Badge>
              </TableCell>
              <TableCell>Low</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#1083</TableCell>
              <TableCell>Sarah Olekina</TableCell>
              <TableCell>$780</TableCell>
              <TableCell>May 16, 2023</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  Pending Review
                </Badge>
              </TableCell>
              <TableCell>Medium</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#1085</TableCell>
              <TableCell>Daniel Kipchoge</TableCell>
              <TableCell>$2,100</TableCell>
              <TableCell>May 18, 2023</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  Flagged
                </Badge>
              </TableCell>
              <TableCell>High</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Assessment Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <ToggleGroup type="single" defaultValue="ai">
              <ToggleGroupItem value="ai">AI Assessment</ToggleGroupItem>
              <ToggleGroupItem value="manual">Manual Review</ToggleGroupItem>
              <ToggleGroupItem value="photos">Photo Evidence</ToggleGroupItem>
            </ToggleGroup>
            
            <div className="mt-4 flex space-x-3">
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Selected
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Request More Info
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payout Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">This Week</span>
              <span className="font-medium">$12,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">This Month</span>
              <span className="font-medium">$32,680</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">This Quarter</span>
              <span className="font-medium">$54,820</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Annual Budget</span>
              <span className="font-medium">$250,000</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-medium">Remaining</span>
              <span className="font-medium">$195,180</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default RoleDashboard;
