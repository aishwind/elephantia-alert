
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, Clock, FileText, Search, Filter } from "lucide-react";

type UserRole = "admin" | "ranger" | "farmer" | "community_leader" | "government" | "insurance";

interface IncidentManagementProps {
  userRole: UserRole;
}

// Mock incident data
const incidentData = [
  {
    id: "INC-2023-001",
    date: "2023-05-12",
    location: "Amboseli Region, Kenya",
    reporter: "John Mbeki",
    severity: "high",
    status: "pending",
    compensation: "$1,200",
    aiScore: 89,
  },
  {
    id: "INC-2023-002",
    date: "2023-05-14",
    location: "Tsavo National Park",
    reporter: "Sarah Wanjiku",
    severity: "medium",
    status: "approved",
    compensation: "$800",
    aiScore: 92,
  },
  {
    id: "INC-2023-003",
    date: "2023-05-18",
    location: "Maasai Mara Reserve",
    reporter: "Daniel Kipchoge",
    severity: "low",
    status: "rejected",
    compensation: "$300",
    aiScore: 45,
  },
  {
    id: "INC-2023-004",
    date: "2023-05-21",
    location: "Laikipia County",
    reporter: "Elizabeth Auma",
    severity: "high",
    status: "pending",
    compensation: "$1,500",
    aiScore: 85,
  },
  {
    id: "INC-2023-005",
    date: "2023-05-23",
    location: "Samburu National Reserve",
    reporter: "Michael Lekishon",
    severity: "medium",
    status: "approved",
    compensation: "$950",
    aiScore: 91,
  },
];

const IncidentManagement: React.FC<IncidentManagementProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const filteredIncidents = incidentData.filter((incident) => {
    const matchesSearch = 
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Incident & Compensation Management</CardTitle>
          <CardDescription>
            Review and manage reported elephant incidents and compensation claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search incidents..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <span className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger>
                    <span className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Severity" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableCaption>List of reported incidents and their status</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Compensation</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.id}</TableCell>
                    <TableCell>{incident.date}</TableCell>
                    <TableCell>{incident.location}</TableCell>
                    <TableCell>{incident.reporter}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          incident.severity === "high"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : incident.severity === "medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          incident.status === "pending"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : incident.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }
                        variant="outline"
                      >
                        {incident.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                        {incident.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {incident.status === "rejected" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{incident.compensation}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          incident.aiScore >= 80
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : incident.aiScore >= 60
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }
                      >
                        {incident.aiScore}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedIncident(incident.id)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedIncident && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Incident Details: {selectedIncident}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedIncident(null)}
                >
                  Close
                </Button>
              </div>
              <CardDescription>
                Complete information about this incident and compensation claim
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Incident Information</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Date:</div>
                        <div className="col-span-2">May 12, 2023 at 15:45 EAT</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Location:</div>
                        <div className="col-span-2">Amboseli Region, Kenya (GPS: -2.652849, 37.260623)</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Reporter:</div>
                        <div className="col-span-2">John Mbeki (Local Farmer, ID: F-2365)</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Description:</div>
                        <div className="col-span-2">
                          Herd of 5 elephants trampled crops in the northeastern section of farm. 
                          Damaged approximately 3 acres of maize crops ready for harvest.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Damage Assessment</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Crop Type:</div>
                        <div className="col-span-2">Maize (3 acres)</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Est. Value:</div>
                        <div className="col-span-2">$1,200 USD</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Verified By:</div>
                        <div className="col-span-2">Samuel Kiprop (Local Ranger, May 13, 2023)</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Evidence:</div>
                        <div className="col-span-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">Photos (4)</Badge>
                            <Badge variant="outline">Video (1)</Badge>
                            <Badge variant="outline">GPS Data</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">AI Analysis & Verification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Validity Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-semibold text-green-600 dark:text-green-500">89%</div>
                        <p className="text-sm text-muted-foreground">Highly likely to be valid</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Image Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-semibold text-green-600 dark:text-green-500">92%</div>
                        <p className="text-sm text-muted-foreground">Photos match damage description</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Risk Factors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-semibold text-yellow-600 dark:text-yellow-500">2</div>
                        <p className="text-sm text-muted-foreground">Minor inconsistencies noted</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {(userRole === "admin" || userRole === "insurance") && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Compensation Approval</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
                        <div>
                          <p className="font-medium">Requested Amount: $1,200 USD</p>
                          <p className="text-sm text-muted-foreground">Based on market value of damaged crops</p>
                        </div>
                        <div className="flex gap-3 mt-3 md:mt-0">
                          <Button variant="destructive">
                            Reject Claim
                          </Button>
                          <Button variant="default">
                            Approve Compensation
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Adjuster Notes</label>
                        <textarea 
                          className="w-full border rounded-md p-2 text-sm"
                          rows={3}
                          placeholder="Add notes about this compensation decision..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default IncidentManagement;
