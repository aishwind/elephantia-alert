
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilePenLine, Send, Download, Check, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const ElephantReportGenerator = ({ elephantData }) => {
  const [reportOptions, setReportOptions] = useState({
    includeHealth: true,
    includeActivity: true,
    includeBehavior: true,
    includeLocation: true,
    includeRecommendations: true
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const { toast } = useToast();
  
  const handleOptionChange = (option) => {
    setReportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };
  
  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      
      toast({
        title: "Report Generated",
        description: "The health report has been successfully generated.",
      });
    }, 2000);
  };
  
  const handleSendReport = () => {
    setIsSubmitting(true);
    
    // Simulate sending report to forest department
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Report Sent",
        description: "The report has been sent to Tamil Nadu Forest Department officials.",
        variant: "default",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FilePenLine className="h-5 w-5 mr-2 text-elephant-500" />
            Health Report Generator
          </CardTitle>
          <CardDescription>
            Create and send detailed health reports to Tamil Nadu Forest Department officials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Report Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="health" 
                    checked={reportOptions.includeHealth}
                    onCheckedChange={() => handleOptionChange('includeHealth')}
                  />
                  <label htmlFor="health" className="text-sm cursor-pointer">
                    Health Vitals
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="activity" 
                    checked={reportOptions.includeActivity}
                    onCheckedChange={() => handleOptionChange('includeActivity')}
                  />
                  <label htmlFor="activity" className="text-sm cursor-pointer">
                    Activity Patterns
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="behavior" 
                    checked={reportOptions.includeBehavior}
                    onCheckedChange={() => handleOptionChange('includeBehavior')}
                  />
                  <label htmlFor="behavior" className="text-sm cursor-pointer">
                    Behavior Analysis
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="location" 
                    checked={reportOptions.includeLocation}
                    onCheckedChange={() => handleOptionChange('includeLocation')}
                  />
                  <label htmlFor="location" className="text-sm cursor-pointer">
                    Location History
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="recommendations" 
                    checked={reportOptions.includeRecommendations}
                    onCheckedChange={() => handleOptionChange('includeRecommendations')}
                  />
                  <label htmlFor="recommendations" className="text-sm cursor-pointer">
                    Recommendations
                  </label>
                </div>
              </div>
            </div>
            
            {reportGenerated && (
              <div className="p-4 bg-elephant-100 dark:bg-elephant-800/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-success-100 dark:bg-success-900/30 rounded-full">
                    <Check className="h-4 w-4 text-success-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Report Ready</h4>
                    <p className="text-sm text-elephant-600 dark:text-elephant-400 mb-2">
                      Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            disabled={isGenerating || isSubmitting}
            onClick={handleGenerateReport}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin mr-2">◌</span>
                Generating...
              </>
            ) : (
              "Generate Report"
            )}
          </Button>
          <Button
            disabled={!reportGenerated || isSubmitting}
            onClick={handleSendReport}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">◌</span>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send to Forest Department
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Report History</CardTitle>
          <CardDescription>
            Previously generated and sent reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {elephantData.reportHistory.map((report, index) => (
              <div 
                key={index}
                className="p-3 border border-elephant-200 dark:border-elephant-800 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium">{report.title}</h4>
                  <div className="flex items-center space-x-2 text-xs text-elephant-500 dark:text-elephant-400">
                    <span>{report.date}</span>
                    <span>•</span>
                    <span>{report.recipient}</span>
                    <Badge variant={report.status === 'Delivered' ? 'success' : 'warning'} className="text-xs">
                      {report.status}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElephantReportGenerator;
