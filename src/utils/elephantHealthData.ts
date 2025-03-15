export const elephantHealthData = [
  {
    id: "TNELE2021021",
    name: "Mathura",
    age: 25,
    gender: "Male",
    location: {
      current: "Madukkarai Forest Range, Coimbatore",
      coordinates: { lat: 10.9129, lng: 76.9416 }
    },
    vitals: {
      heartRate: 52,
      temperature: 36.2,
      respiration: 8,
      weight: 4850
    },
    activity: {
      currentState: "Foraging",
      dailyActiveHours: 17,
      restPeriods: 4,
      avgRestDuration: 1.5,
      peakActivityTime: "04:00 - 08:00",
      isNormalPattern: true,
      feedingPattern: "normal", // Added feeding pattern
      hourlyData: [
        { hour: "00:00", level: 20, isResting: true },
        { hour: "01:00", level: 15, isResting: true },
        { hour: "02:00", level: 10, isResting: true },
        { hour: "03:00", level: 25, isResting: false },
        { hour: "04:00", level: 60, isResting: false },
        { hour: "05:00", level: 75, isResting: false },
        { hour: "06:00", level: 85, isResting: false },
        { hour: "07:00", level: 90, isResting: false },
        { hour: "08:00", level: 80, isResting: false },
        { hour: "09:00", level: 70, isResting: false },
        { hour: "10:00", level: 65, isResting: false },
        { hour: "11:00", level: 60, isResting: false },
        { hour: "12:00", level: 50, isResting: false },
        { hour: "13:00", level: 30, isResting: true },
        { hour: "14:00", level: 25, isResting: true },
        { hour: "15:00", level: 40, isResting: false },
        { hour: "16:00", level: 55, isResting: false },
        { hour: "17:00", level: 65, isResting: false },
        { hour: "18:00", level: 70, isResting: false },
        { hour: "19:00", level: 60, isResting: false },
        { hour: "20:00", level: 50, isResting: false },
        { hour: "21:00", level: 40, isResting: false },
        { hour: "22:00", level: 30, isResting: false },
        { hour: "23:00", level: 20, isResting: true }
      ]
    },
    behavior: {
      normalityScore: 85,
      indicators: [
        {
          name: "Feeding Patterns",
          description: "Normal feeding behavior with typical durations",
          isNormal: true
        },
        {
          name: "Social Interaction",
          description: "Regular interaction with herd members",
          isNormal: true
        },
        {
          name: "Movement Range",
          description: "Staying within expected territory boundaries",
          isNormal: true
        },
        {
          name: "Water Consumption",
          description: "Slightly lower than average water intake",
          isNormal: false
        },
        {
          name: "Response to Stimuli",
          description: "Normal reactions to environmental stimuli",
          isNormal: true
        }
      ],
      recommendations: [
        "Monitor water consumption over the next 48 hours",
        "Consider additional vegetation monitoring in current range",
        "Maintain regular tracking schedule"
      ],
      anomalies: []
    },
    collarStatus: {
      batteryLevel: 78,
      lastSync: "Today, 09:15 AM",
      signalStrength: "Good"
    },
    reportHistory: [
      {
        title: "Monthly Health Report - April 2023",
        date: "30 Apr 2023",
        recipient: "TN Forest Dept, Coimbatore Division",
        status: "Delivered"
      },
      {
        title: "Special Assessment - Migration Pattern",
        date: "15 Mar 2023",
        recipient: "TN Forest Dept, Research Wing",
        status: "Delivered"
      },
      {
        title: "Quarterly Health Summary - Q1 2023",
        date: "31 Mar 2023",
        recipient: "TN Forest Dept, Coimbatore Division",
        status: "Delivered"
      }
    ]
  },
  {
    id: "TNELE2016060",
    name: "Lakshmi",
    age: 15,
    gender: "Female",
    location: {
      current: "Attappadi Reserve Forest, Coimbatore",
      coordinates: { lat: 11.1024, lng: 76.6982 }
    },
    vitals: {
      heartRate: 56,
      temperature: 35.9,
      respiration: 9,
      weight: 3200
    },
    activity: {
      currentState: "Moving",
      dailyActiveHours: 14,
      restPeriods: 6,
      avgRestDuration: 1.7,
      peakActivityTime: "05:00 - 09:00",
      isNormalPattern: true,
      feedingPattern: "normal", // Added feeding pattern
      hourlyData: [
        { hour: "00:00", level: 10, isResting: true },
        { hour: "01:00", level: 10, isResting: true },
        { hour: "02:00", level: 15, isResting: true },
        { hour: "03:00", level: 20, isResting: true },
        { hour: "04:00", level: 30, isResting: false },
        { hour: "05:00", level: 70, isResting: false },
        { hour: "06:00", level: 80, isResting: false },
        { hour: "07:00", level: 85, isResting: false },
        { hour: "08:00", level: 75, isResting: false },
        { hour: "09:00", level: 65, isResting: false },
        { hour: "10:00", level: 50, isResting: false },
        { hour: "11:00", level: 30, isResting: true },
        { hour: "12:00", level: 25, isResting: true },
        { hour: "13:00", level: 45, isResting: false },
        { hour: "14:00", level: 60, isResting: false },
        { hour: "15:00", level: 65, isResting: false },
        { hour: "16:00", level: 55, isResting: false },
        { hour: "17:00", level: 60, isResting: false },
        { hour: "18:00", level: 50, isResting: false },
        { hour: "19:00", level: 40, isResting: false },
        { hour: "20:00", level: 30, isResting: false },
        { hour: "21:00", level: 20, isResting: true },
        { hour: "22:00", level: 15, isResting: true },
        { hour: "23:00", level: 10, isResting: true }
      ]
    },
    behavior: {
      normalityScore: 92,
      indicators: [
        {
          name: "Feeding Patterns",
          description: "Normal feeding behavior with typical durations",
          isNormal: true
        },
        {
          name: "Social Interaction",
          description: "Regular interaction with herd members",
          isNormal: true
        },
        {
          name: "Movement Range",
          description: "Staying within expected territory boundaries",
          isNormal: true
        },
        {
          name: "Water Consumption",
          description: "Normal water intake at regular intervals",
          isNormal: true
        },
        {
          name: "Response to Stimuli",
          description: "Normal reactions to environmental stimuli",
          isNormal: true
        }
      ],
      recommendations: [
        "Continue regular monitoring",
        "No immediate interventions needed"
      ],
      anomalies: []
    },
    collarStatus: {
      batteryLevel: 65,
      lastSync: "Today, 10:22 AM",
      signalStrength: "Good"
    },
    reportHistory: [
      {
        title: "Monthly Health Report - April 2023",
        date: "30 Apr 2023",
        recipient: "TN Forest Dept, Coimbatore Division",
        status: "Delivered"
      },
      {
        title: "Quarterly Health Summary - Q1 2023",
        date: "31 Mar 2023",
        recipient: "TN Forest Dept, Coimbatore Division",
        status: "Delivered"
      }
    ]
  },
  {
    id: "TNELE2021103",
    name: "Sunita",
    age: 17,
    gender: "Female",
    location: {
      current: "Sirumugai Forest Range, Coimbatore",
      coordinates: { lat: 11.2318, lng: 77.0106 }
    },
    vitals: {
      heartRate: 68,
      temperature: 37.4,
      respiration: 12,
      weight: 3450
    },
    activity: {
      currentState: "Resting",
      dailyActiveHours: 12,
      restPeriods: 5,
      avgRestDuration: 2.2,
      peakActivityTime: "18:00 - 22:00",
      isNormalPattern: false,
      feedingPattern: "reduced irregular", // Added feeding pattern with issues
      hourlyData: [
        { hour: "00:00", level: 60, isResting: false },
        { hour: "01:00", level: 45, isResting: false },
        { hour: "02:00", level: 30, isResting: false },
        { hour: "03:00", level: 15, isResting: true },
        { hour: "04:00", level: 10, isResting: true },
        { hour: "05:00", level: 15, isResting: true },
        { hour: "06:00", level: 20, isResting: true },
        { hour: "07:00", level: 35, isResting: false },
        { hour: "08:00", level: 45, isResting: false },
        { hour: "09:00", level: 50, isResting: false },
        { hour: "10:00", level: 40, isResting: false },
        { hour: "11:00", level: 30, isResting: false },
        { hour: "12:00", level: 15, isResting: true },
        { hour: "13:00", level: 10, isResting: true },
        { hour: "14:00", level: 25, isResting: false },
        { hour: "15:00", level: 40, isResting: false },
        { hour: "16:00", level: 50, isResting: false },
        { hour: "17:00", level: 65, isResting: false },
        { hour: "18:00", level: 80, isResting: false },
        { hour: "19:00", level: 90, isResting: false },
        { hour: "20:00", level: 85, isResting: false },
        { hour: "21:00", level: 75, isResting: false },
        { hour: "22:00", level: 70, isResting: false },
        { hour: "23:00", level: 65, isResting: false }
      ]
    },
    behavior: {
      normalityScore: 68,
      indicators: [
        {
          name: "Feeding Patterns",
          description: "Reduced feeding during daylight hours",
          isNormal: false
        },
        {
          name: "Social Interaction",
          description: "Regular interaction with herd members",
          isNormal: true
        },
        {
          name: "Movement Range",
          description: "Increased nocturnal movement near settlement areas",
          isNormal: false
        },
        {
          name: "Water Consumption",
          description: "Normal water intake at regular intervals",
          isNormal: true
        },
        {
          name: "Response to Stimuli",
          description: "Heightened alertness to human sounds",
          isNormal: false
        }
      ],
      recommendations: [
        "Increase monitoring frequency during night hours",
        "Assess food availability in current range",
        "Consider temporary patrolling near settlement boundaries",
        "Prepare for possible intervention if settlement approach continues"
      ],
      anomalies: [
        {
          title: "Abnormal Nocturnal Activity",
          description: "Unusual spike in activity between 18:00-22:00, coinciding with proximity to agricultural areas.",
          date: "May 10, 2023",
          time: "21:15",
          severity: "medium"
        },
        {
          title: "Reduced Daytime Feeding",
          description: "Significant reduction in daytime feeding behavior over the past week.",
          date: "May 8, 2023",
          time: "14:30",
          severity: "low"
        }
      ]
    },
    collarStatus: {
      batteryLevel: 82,
      lastSync: "Today, 08:45 AM",
      signalStrength: "Excellent"
    },
    alert: {
      type: "boundary_fence",
      description: "Detected crossing of boundary fence near agricultural settlement",
      timestamp: "Today, 02:15 AM",
      location: "Northern perimeter, Sirumugai Range"
    },
    reportHistory: [
      {
        title: "Special Behavior Assessment - Nocturnal Activity",
        date: "12 May 2023",
        recipient: "TN Forest Dept, Coimbatore Division",
        status: "Delivered"
      },
      {
        title: "Monthly Health Report - April 2023",
        date: "30 Apr 2023",
        recipient: "TN Forest Dept, Coimbatore Division",
        status: "Delivered"
      }
    ]
  }
];
