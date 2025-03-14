
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Settings, BellRing, Cloud, Lock, Shield, Database, MessageSquare } from "lucide-react";

type UserRole = "admin" | "ranger" | "farmer" | "community_leader" | "government" | "insurance";

interface SystemIntegrationsProps {
  userRole: UserRole;
}

// Mock integrations data
const integrations = [
  { 
    id: 1,
    name: "Weather API",
    provider: "WeatherData Inc.",
    status: "active",
    lastSync: "15 minutes ago",
    type: "Data Source"
  },
  { 
    id: 2,
    name: "SMS Gateway",
    provider: "Twilio",
    status: "active",
    lastSync: "32 minutes ago",
    type: "Communication"
  },
  { 
    id: 3,
    name: "Financial Processing",
    provider: "PaymentHub",
    status: "active",
    lastSync: "1 hour ago",
    type: "Payment"
  },
  { 
    id: 4,
    name: "Satellite Imagery",
    provider: "EarthView",
    status: "active",
    lastSync: "2 hours ago",
    type: "Data Source"
  },
  { 
    id: 5,
    name: "AI Analysis Engine",
    provider: "TensorCorp",
    status: "maintenance",
    lastSync: "6 hours ago",
    type: "Analysis"
  },
  { 
    id: 6,
    name: "Government Database",
    provider: "National Wildlife Service",
    status: "active",
    lastSync: "12 hours ago",
    type: "Data Source"
  },
];

// Mock notification settings
const notificationSettings = [
  {
    id: 1,
    channel: "SMS",
    admin: true,
    ranger: true,
    farmer: true, 
    community: true,
    government: false
  },
  {
    id: 2,
    channel: "Email",
    admin: true,
    ranger: true,
    farmer: false, 
    community: true,
    government: true
  },
  {
    id: 3,
    channel: "Push Notifications",
    admin: true,
    ranger: true,
    farmer: true, 
    community: false,
    government: false
  },
  {
    id: 4,
    channel: "WhatsApp",
    admin: true,
    ranger: false,
    farmer: true, 
    community: true,
    government: false
  },
];

const SystemIntegrations: React.FC<SystemIntegrationsProps> = ({ userRole }) => {
  const canConfigureSystem = userRole === "admin";
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Integrations & Configuration</CardTitle>
          <CardDescription>
            Manage external API connections, notification preferences, and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="integrations">
            <TabsList className="mb-6">
              <TabsTrigger value="integrations">API Integrations</TabsTrigger>
              <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
              <TabsTrigger value="security">Security & Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="integrations">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Connected Services</h3>
                  <Button disabled={!canConfigureSystem}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configure New Integration
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Integration</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Sync</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {integrations.map((integration) => (
                        <TableRow key={integration.id}>
                          <TableCell className="font-medium">{integration.name}</TableCell>
                          <TableCell>{integration.provider}</TableCell>
                          <TableCell>{integration.type}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                integration.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : integration.status === "maintenance"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                              }
                            >
                              {integration.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{integration.lastSync}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" disabled={!canConfigureSystem}>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Sync
                            </Button>
                            <Button variant="ghost" size="sm" disabled={!canConfigureSystem}>
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">API Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">8,542</div>
                      <p className="text-sm text-muted-foreground">Last 24 hours</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Average Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">187ms</div>
                      <p className="text-sm text-muted-foreground">Across all integrations</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Error Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">0.2%</div>
                      <p className="text-sm text-muted-foreground">Below acceptable threshold</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <Button disabled={!canConfigureSystem}>
                    <BellRing className="h-4 w-4 mr-2" />
                    Test Notifications
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Channel</TableHead>
                        <TableHead>Administrators</TableHead>
                        <TableHead>Rangers</TableHead>
                        <TableHead>Farmers</TableHead>
                        <TableHead>Community Leaders</TableHead>
                        <TableHead>Government Officials</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notificationSettings.map((channel) => (
                        <TableRow key={channel.id}>
                          <TableCell className="font-medium">{channel.channel}</TableCell>
                          <TableCell>
                            <Switch
                              checked={channel.admin}
                              disabled={!canConfigureSystem}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={channel.ranger}
                              disabled={!canConfigureSystem}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={channel.farmer}
                              disabled={!canConfigureSystem}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={channel.community}
                              disabled={!canConfigureSystem}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={channel.government}
                              disabled={!canConfigureSystem}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Notification Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Elephant Movement Alerts</div>
                            <div className="text-sm text-muted-foreground">
                              Notify when elephants enter defined risk zones
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">New Incident Reports</div>
                            <div className="text-sm text-muted-foreground">
                              Alert when new incident is reported in system
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Compensation Status Updates</div>
                            <div className="text-sm text-muted-foreground">
                              Notify stakeholders about claim status changes
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">System Maintenance</div>
                            <div className="text-sm text-muted-foreground">
                              Notify about planned downtime and updates
                            </div>
                          </div>
                          <Switch checked={false} disabled={!canConfigureSystem} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Message Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border p-3">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Elephant Alert</div>
                            <Button variant="ghost" size="sm" disabled={!canConfigureSystem}>
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <div className="text-sm bg-muted p-2 rounded-md">
                            ALERT: Elephant herd detected near {'{location}'} moving {'{direction}'}. Estimated {'{count}'} elephants. Take precautions.
                          </div>
                        </div>
                        <div className="rounded-md border p-3">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Compensation Approval</div>
                            <Button variant="ghost" size="sm" disabled={!canConfigureSystem}>
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <div className="text-sm bg-muted p-2 rounded-md">
                            Your claim #{'{claim_id}'} for {'{amount}'} has been APPROVED. Payment will be processed within 5-7 business days.
                          </div>
                        </div>
                        <div className="rounded-md border p-3">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Community Meeting</div>
                            <Button variant="ghost" size="sm" disabled={!canConfigureSystem}>
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <div className="text-sm bg-muted p-2 rounded-md">
                            REMINDER: Community conservation meeting tomorrow at {'{time}'} at {'{location}'}. Topic: {'{topic}'}.
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>Security Settings</CardTitle>
                          <CardDescription>System protection and access control</CardDescription>
                        </div>
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-muted-foreground">
                              Require 2FA for all administrative users
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">API Access Logging</div>
                            <div className="text-sm text-muted-foreground">
                              Track all API requests and access patterns
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Session Timeout</div>
                            <div className="text-sm text-muted-foreground">
                              Automatically log out inactive users (30 minutes)
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">IP Restriction</div>
                            <div className="text-sm text-muted-foreground">
                              Limit access to specific IP addresses
                            </div>
                          </div>
                          <Switch checked={false} disabled={!canConfigureSystem} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>Data Protection</CardTitle>
                          <CardDescription>Privacy and data handling policies</CardDescription>
                        </div>
                        <Shield className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Data Encryption</div>
                            <div className="text-sm text-muted-foreground">
                              End-to-end encryption for sensitive information
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Automated Backups</div>
                            <div className="text-sm text-muted-foreground">
                              Daily database and configuration backups
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">GDPR Compliance</div>
                            <div className="text-sm text-muted-foreground">
                              Follow data protection regulations
                            </div>
                          </div>
                          <Switch checked={true} disabled={!canConfigureSystem} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Data Retention</div>
                            <div className="text-sm text-muted-foreground">
                              Automatically archive data older than 3 years
                            </div>
                          </div>
                          <Switch checked={false} disabled={!canConfigureSystem} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">System Audit</CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">94%</div>
                      <p className="text-sm text-muted-foreground">Security compliance score</p>
                      <Button variant="link" size="sm" className="mt-2 p-0" disabled={!canConfigureSystem}>
                        View full audit report
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Last Security Scan</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-semibold">June 14, 2023</div>
                      <p className="text-sm text-muted-foreground">No critical issues found</p>
                      <Button variant="link" size="sm" className="mt-2 p-0" disabled={!canConfigureSystem}>
                        Schedule new scan
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Support Access</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-semibold text-orange-500">Enabled</div>
                      <p className="text-sm text-muted-foreground">For troubleshooting (48 hours)</p>
                      <Button variant="link" size="sm" className="mt-2 p-0" disabled={!canConfigureSystem}>
                        Disable support access
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemIntegrations;
