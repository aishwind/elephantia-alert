
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertCircle, TrendingUp, Clock, LineChart } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  bgColor: string;
  textColor: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  trend,
  bgColor,
  textColor,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className={cn(
        "rounded-xl p-5 shadow-card relative overflow-hidden",
        bgColor
      )}
    >
      <div className="absolute top-0 right-0 opacity-10 p-4">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className={cn("text-sm font-medium", textColor)}>{title}</h3>
        <p className={cn("text-2xl font-bold mt-1", textColor)}>{value}</p>
        {change && (
          <div className="flex items-center mt-2 text-xs">
            <span
              className={cn(
                "flex items-center",
                trend === "up"
                  ? "text-success-500"
                  : trend === "down"
                  ? "text-alert-500"
                  : "text-elephant-500"
              )}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "–"} {change}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Alerts"
        value="4"
        change="2 more than yesterday"
        icon={<AlertCircle className="h-16 w-16" />}
        trend="up"
        bgColor="bg-alert-50 dark:bg-alert-950"
        textColor="text-alert-800 dark:text-alert-100"
        delay={0.1}
      />
      <StatCard
        title="Elephants Tracked"
        value="27"
        change="5 new sightings today"
        icon={<TrendingUp className="h-16 w-16" />}
        trend="up"
        bgColor="bg-nature-50 dark:bg-nature-950"
        textColor="text-nature-800 dark:text-nature-100"
        delay={0.2}
      />
      <StatCard
        title="Response Time"
        value="3.5 min"
        change="12% faster than average"
        icon={<Clock className="h-16 w-16" />}
        trend="up"
        bgColor="bg-elephant-50 dark:bg-elephant-950"
        textColor="text-elephant-800 dark:text-elephant-100"
        delay={0.3}
      />
      <StatCard
        title="Incidents Prevented"
        value="18"
        change="This month"
        icon={<LineChart className="h-16 w-16" />}
        trend="neutral"
        bgColor="bg-success-50 dark:bg-success-950"
        textColor="text-success-800 dark:text-success-100"
        delay={0.4}
      />
    </div>
  );
};

export default Stats;
