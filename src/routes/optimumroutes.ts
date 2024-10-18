const COMPUTEROUTESAPI = "https://routes.googleapis.com/directions/v2:computeRoutes"
import axios from "axios"
export default async function GetOptimumRoutes(origin: string, destination: string, travelMode?: string) {
  let reqbody;
  travelMode != "TRANSIT" ? reqbody = {
    origin: {
      address: origin
    },
    destination: {
      address: destination
    },
    travelMode: "DRIVE",
    languageCode: "en-US",
    units: "IMPERIAL",
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: true
  } : reqbody = {
    origin: {
      address: origin
    },
    destination: {
      address: destination
    },
    travelMode: "DRIVE",
    languageCode: "en-US",
    units: "IMPERIAL",
    // departureTime:,
    // arrivalTime:,
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: true
  }
  const getres = await axios.post(COMPUTEROUTESAPI, reqbody, {
    headers: {
      "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline",
      "X-Goog-Api-Key": process.env.GCP_MAPS_API,
      "Content-Type": "application/json"
    }
  })
  return getres.data

}


export async function findNearestMetroStation() {
  // const

  const purpleLineMetroStns = ["Nagasandra", "Dasarahalli", "Jalahalli", "Peenya INdustry", "Peenya", "Goreguntepalya", "Yeshwantpur", "Sampige Road",]
}


