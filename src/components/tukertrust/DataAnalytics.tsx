import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar, FileText } from "lucide-react";

type UserRole = "admin" | "ranger" | "farmer" | "community_leader" | "government" | "insurance";

interface DataAnalyticsProps {
  userRole: UserRole;
}

// Mock data for the incident trends chart
const incidentTrendsData = [
  { month: "Jan", incidents: 12, compensation: 238000 },
  { month: "Feb", incidents: 15, compensation: 305000 },
  { month: "Mar", incidents: 18, compensation: 394000 },
  { month: "Apr", incidents: 22, compensation: 453000 },
  { month: "May", incidents: 28, compensation: 580000 },
  { month: "Jun", incidents: 20, compensation: 438000 },
  { month: "Jul", incidents: 24, compensation: 483000 },
  { month: "Aug", incidents: 30, compensation: 609000 },
  { month: "Sep", incidents: 25, compensation: 528000 },
  { month: "Oct", incidents: 20, compensation: 431000 },
  { month: "Nov", incidents: 18, compensation: 386000 },
  { month: "Dec", incidents: 14, compensation: 320000 },
];

// Mock data for compensation distribution
const compensationData = [
  { name: "Crop Damage", value: 65 },
  { name: "Livestock Loss", value: 20 },
  { name: "Property Damage", value: 10 },
  { name: "Other Claims", value: 5 },
];

// Mock data for incident types
const incidentTypesData = [
  { name: "Crop Raids", count: 145 },
  { name: "Human-Elephant Encounters", count: 65 },
  { name: "Infrastructure Damage", count: 40 },
  { name: "Livestock Attacks", count: 25 },
  { name: "Water Resource Conflicts", count: 35 },
];

// Mock data for regional analysis
const regionalData = [
  { region: "Amboseli", incidents: 78, resolved: 68 },
  { region: "Tsavo", incidents: 92, resolved: 75 },
  { region: "Maasai Mara", incidents: 54, resolved: 48 },
  { region: "Laikipia", incidents: 65, resolved: 55 },
  { region: "Samburu", incidents: 45, resolved: 38 },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DataAnalytics: React.FC<DataAnalyticsProps> = ({ userRole }) => {
  const [timeRange, setTimeRange] = useState<string>("yearly");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Data Analytics & Reports</CardTitle>
              <CardDescription>
                Comprehensive analytics on incidents, compensation, and conservation impact
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-3">
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Select Dates
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trends">
            <TabsList className="mb-6">
              <TabsTrigger value="trends">Incident Trends</TabsTrigger>
              <TabsTrigger value="compensation">Compensation</TabsTrigger>
              <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
              <TabsTrigger value="reports">Generated Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trends">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Incident & Compensation Trends (2023)</CardTitle>
                    <CardDescription>Monthly incident reports and associated compensation amounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={incidentTrendsData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip formatter={(value, name) => {
                          if (name === "Compensation (₹)") {
                            return [`₹${value.toLocaleString('en-IN')}`, name];
                          }
                          return [value, name];
                        }} />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="incidents"
                            name="Incidents"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                          />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="compensation" 
                            name="Compensation (₹)" 
                            stroke="#82ca9d" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Incident Types</CardTitle>
                      <CardDescription>Distribution of different types of human-elephant conflicts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={incidentTypesData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" name="Number of Incidents" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Compensation Distribution</CardTitle>
                      <CardDescription>Allocation of compensation funds by damage category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={compensationData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={130}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {compensationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="compensation">
              <Card>
                <CardHeader>
                  <CardTitle>Compensation Analytics</CardTitle>
                  <CardDescription>
                    Detailed analysis of compensation payouts and financial metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Total Compensation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-semibold">₹47,95,000</div>
                          <div className="flex items-center text-sm">
                            <span className="text-green-600 dark:text-green-500 font-medium">+15%</span>
                            <span className="text-muted-foreground ml-1">from last year</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Average Payout</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-semibold">₹65,000</div>
                          <div className="flex items-center text-sm">
                            <span className="text-green-600 dark:text-green-500 font-medium">+5%</span>
                            <span className="text-muted-foreground ml-1">from last year</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Claim Processing Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-semibold">7.2 days</div>
                          <div className="flex items-center text-sm">
                            <span className="text-green-600 dark:text-green-500 font-medium">-15%</span>
                            <span className="text-muted-foreground ml-1">from last year</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={regionalData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="region" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="incidents" name="Total Incidents" fill="#8884d8" />
                          <Bar dataKey="resolved" name="Resolved Cases" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="regional">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Analysis</CardTitle>
                  <CardDescription>
                    Geographic distribution of incidents and interventions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Hotspot Regions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {regionalData.map((region, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="font-medium">{region.region}</span>
                                  <span>{region.incidents} incidents</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-elephant-600 rounded-full"
                                    style={{ width: `${(region.incidents / 100) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Resolution Rate by Region</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={regionalData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, value }) => `${name}: ${value}%`}
                                  outerRadius={100}
                                  fill="#8884d8"
                                  dataKey="resolved"
                                  nameKey="region"
                                >
                                  {regionalData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>
                    Download comprehensive reports for stakeholders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-elephant-600" />
                        <div>
                          <div className="font-medium">Annual Incident Summary 2023</div>
                          <div className="text-sm text-muted-foreground">
                            Comprehensive overview of all incidents and resolutions
                          </div>
                        </div>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                    
                    <div className="rounded-md border p-4 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-elephant-600" />
                        <div>
                          <div className="font-medium">Compensation Distribution Report</div>
                          <div className="text-sm text-muted-foreground">
                            Financial breakdown of all compensation payments
                          </div>
                        </div>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                    
                    <div className="rounded-md border p-4 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-elephant-600" />
                        <div>
                          <div className="font-medium">Elephant Movement Patterns</div>
                          <div className="text-sm text-muted-foreground">
                            Analysis of tracking data and migration routes
                          </div>
                        </div>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                    
                    <div className="rounded-md border p-4 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-elephant-600" />
                        <div>
                          <div className="font-medium">Community Engagement Report</div>
                          <div className="text-sm text-muted-foreground">
                            Metrics on community participation and impact
                          </div>
                        </div>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                    
                    <div className="rounded-md border p-4 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-elephant-600" />
                        <div>
                          <div className="font-medium">Conservation Impact Assessment</div>
                          <div className="text-sm text-muted-foreground">
                            Evaluation of program effectiveness and wildlife conservation metrics
                          </div>
                        </div>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataAnalytics;
