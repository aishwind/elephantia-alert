
import { ElephantIncident } from "@/types/elephant";

// Initial hardcoded data from the provided CSV
export const initialElephantIncidents: ElephantIncident[] = [
  {
    id: "1",
    idNo: "TNELE2013017",
    detectionDate: "2013-02-04",
    circle: "Dharmapuri",
    division: "Hosur",
    range: "Rayakotta",
    gender: "Calf",
    category: "Category E",
    subCategory: "Train Accidents",
    age: 5,
    location: { lat: 12.5124, lng: 77.7296 }
  },
  {
    id: "2",
    idNo: "TNELE2013018",
    detectionDate: "2013-02-04",
    circle: "Dharmapuri",
    division: "Hosur",
    range: "Rayakotta",
    gender: "Calf",
    category: "Category E",
    subCategory: "Train Accidents",
    age: 5,
    location: { lat: 12.5124, lng: 77.7326 }
  },
  {
    id: "3",
    idNo: "TNELE2016047",
    detectionDate: "2016-06-20",
    circle: "Coimbatore",
    division: "Coimbatore",
    range: "Madukkarai",
    gender: "Female",
    category: "Category E",
    subCategory: "Train Accidents",
    age: 0,
    location: { lat: 10.9129, lng: 76.9426 }
  },
  {
    id: "4",
    idNo: "TNELE2016060",
    detectionDate: "2016-07-29",
    circle: "Coimbatore",
    division: "Coimbatore",
    range: "Madukkarai",
    gender: "Female",
    category: "Category E",
    subCategory: "Train Accidents",
    age: 15,
    location: { lat: 10.9149, lng: 76.9416 }
  },
  {
    id: "5",
    idNo: "TNELE2021021",
    detectionDate: "2021-03-15",
    circle: "Coimbatore",
    division: "Coimbatore",
    range: "Madukkarai",
    gender: "Male",
    category: "Category E",
    subCategory: "Train Accidents",
    age: 25,
    location: { lat: 10.9159, lng: 76.9456 }
  },
  {
    id: "6",
    idNo: "TNELE2021103",
    detectionDate: "2021-11-26",
    circle: "Coimbatore",
    division: "Coimbatore",
    range: "Madukkarai",
    gender: "Female",
    category: "Category E",
    subCategory: "Train Accidents",
    age: 17,
    location: { lat: 10.9109, lng: 76.9436 }
  },
  {
    id: "7",
    idNo: "TNELE2021104",
    detectionDate: "2021-11-26",
    circle: "Coimbatore",
    division: "Coimbatore",
    range: "Madukkarai",
    gender: "Calf",
    category: "Category E",
    subCategory: "Train Accidents",
    age: 6,
    location: { lat: 10.9119, lng: 76.9426 }
  },
  {
    id: "8",
    idNo: "TNELE2021105",
    detectionDate: "2021-11-26",
    circle: "Coimbatore",
    division: "Coimbatore",
    range: "Madukkarai",
    gender: "Makhna",
    category: "Category E",
    subCategory: "Train Accidents",
    age: 26,
    location: { lat: 10.9139, lng: 76.9416 }
  }
];

// Mock train schedules data
export const mockTrainSchedules = [
  {
    id: "1",
    trainNumber: "12671",
    name: "Nilagiri Express",
    route: "Chennai - Coimbatore",
    departureTime: "2023-05-10T06:00:00",
    arrivalTime: "2023-05-10T14:30:00",
    currentLocation: { lat: 10.9729, lng: 77.0416 },
    speed: 70,
    status: "on-time" as const
  },
  {
    id: "2",
    trainNumber: "12678",
    name: "Ernakulam Express",
    route: "Bangalore - Coimbatore",
    departureTime: "2023-05-10T08:30:00",
    arrivalTime: "2023-05-10T16:00:00",
    currentLocation: { lat: 12.6409, lng: 77.5253 },
    speed: 65,
    status: "delayed" as const
  },
  {
    id: "3",
    trainNumber: "16526",
    name: "Island Express",
    route: "Bangalore - Kanyakumari",
    departureTime: "2023-05-10T10:15:00",
    arrivalTime: "2023-05-11T04:30:00",
    currentLocation: { lat: 11.5168, lng: 76.8558 },
    speed: 75,
    status: "on-time" as const
  }
];

// Function to prepare data for upload to Supabase
export function prepareElephantDataForUpload() {
  return initialElephantIncidents.map(incident => ({
    id_no: incident.idNo,
    detection_date: incident.detectionDate,
    circle: incident.circle,
    division: incident.division,
    range: incident.range,
    gender: incident.gender.toLowerCase(),
    category: incident.category,
    sub_category: incident.subCategory,
    age: incident.age,
    weight: incident.weight || null,
    location: incident.location ? `POINT(${incident.location.lng} ${incident.location.lat})` : null,
    created_at: new Date().toISOString()
  }));
}
