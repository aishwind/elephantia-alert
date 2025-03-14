
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Award, ArrowUpRight, Gift, Download } from "lucide-react";

type UserRole = "admin" | "ranger" | "farmer" | "community_leader" | "government" | "insurance";

interface CommunityEngagementProps {
  userRole: UserRole;
}

// Mock community members data
const communityLeaders = [
  { 
    id: 1, 
    name: "Mary Wanjiku", 
    role: "Community Leader", 
    area: "Amboseli North", 
    points: 850, 
    contributions: 32, 
    rank: 1, 
    avatar: "M",
    rewards: "$250"
  },
  { 
    id: 2, 
    name: "Joseph Mutua", 
    role: "Wildlife Guide", 
    area: "Tsavo East", 
    points: 720, 
    contributions: 28, 
    rank: 2, 
    avatar: "J",
    rewards: "$175"
  },
  { 
    id: 3, 
    name: "Sarah Olekina", 
    role: "School Teacher", 
    area: "Mara Region", 
    points: 685, 
    contributions: 25, 
    rank: 3, 
    avatar: "S",
    rewards: "$150"
  },
  { 
    id: 4, 
    name: "Daniel Kipchoge", 
    role: "Farmer", 
    area: "Laikipia", 
    points: 610, 
    contributions: 24, 
    rank: 4, 
    avatar: "D",
    rewards: "$125"
  },
  { 
    id: 5, 
    name: "Elizabeth Auma", 
    role: "Conservation Officer", 
    area: "Samburu", 
    points: 590, 
    contributions: 22, 
    rank: 5, 
    avatar: "E",
    rewards: "$100"
  },
];

// Mock engagement metrics
const engagementMetrics = [
  { 
    id: 1,
    metric: "Alert Reporting",
    thisMonth: 128,
    lastMonth: 104,
    change: "+23%",
    positive: true
  },
  { 
    id: 2,
    metric: "Educational Workshops",
    thisMonth: 18,
    lastMonth: 15,
    change: "+20%",
    positive: true
  },
  { 
    id: 3,
    metric: "Deterrent System Usage",
    thisMonth: 87,
    lastMonth: 92,
    change: "-5%",
    positive: false
  },
  { 
    id: 4,
    metric: "New Participants",
    thisMonth: 45,
    lastMonth: 32,
    change: "+41%",
    positive: true
  },
  { 
    id: 5,
    metric: "Community Meetings",
    thisMonth: 12,
    lastMonth: 10,
    change: "+20%",
    positive: true
  },
];

const CommunityEngagement: React.FC<CommunityEngagementProps> = ({ userRole }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Engagement & Gamification</CardTitle>
          <CardDescription>
            Manage community participation through incentives and rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="leaderboard">
            <TabsList className="mb-4">
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="metrics">Engagement Metrics</TabsTrigger>
              <TabsTrigger value="rewards">Reward Distribution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leaderboard">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Contributions</TableHead>
                      <TableHead>Rewards</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {communityLeaders.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {member.rank === 1 ? (
                              <Trophy className="h-5 w-5 text-yellow-500" />
                            ) : member.rank === 2 ? (
                              <Trophy className="h-5 w-5 text-gray-400" />
                            ) : member.rank === 3 ? (
                              <Trophy className="h-5 w-5 text-amber-700" />
                            ) : (
                              <span className="font-medium">{member.rank}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.role}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.area}</TableCell>
                        <TableCell>
                          <div className="font-medium">{member.points}</div>
                          <Progress value={member.points / 10} className="h-1 mt-1" />
                        </TableCell>
                        <TableCell>{member.contributions}</TableCell>
                        <TableCell>{member.rewards}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="sr-only">View profile</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="metrics">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Total Participants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">428</div>
                      <div className="flex items-center text-sm">
                        <span className="text-green-600 dark:text-green-500 font-medium">+12%</span>
                        <span className="text-muted-foreground ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Active Communities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">18</div>
                      <div className="flex items-center text-sm">
                        <span className="text-green-600 dark:text-green-500 font-medium">+2</span>
                        <span className="text-muted-foreground ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Rewards Distributed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">$2,450</div>
                      <div className="flex items-center text-sm">
                        <span className="text-green-600 dark:text-green-500 font-medium">+20%</span>
                        <span className="text-muted-foreground ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>This Month</TableHead>
                        <TableHead>Last Month</TableHead>
                        <TableHead>Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {engagementMetrics.map((metric) => (
                        <TableRow key={metric.id}>
                          <TableCell className="font-medium">{metric.metric}</TableCell>
                          <TableCell>{metric.thisMonth}</TableCell>
                          <TableCell>{metric.lastMonth}</TableCell>
                          <TableCell>
                            <span className={metric.positive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}>
                              {metric.change}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rewards">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Available Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">$5,250</div>
                      <p className="text-sm text-muted-foreground">Current reward pool</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Pending Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">$1,735</div>
                      <p className="text-sm text-muted-foreground">Awaiting distribution</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Top Reward</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">$250</div>
                      <p className="text-sm text-muted-foreground">Current top earner</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Next Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">3 days</div>
                      <p className="text-sm text-muted-foreground">Until next payout</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button className="flex-1">
                    <Gift className="h-4 w-4 mr-2" />
                    Distribute Rewards
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export Reward History
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Recipients
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityEngagement;
