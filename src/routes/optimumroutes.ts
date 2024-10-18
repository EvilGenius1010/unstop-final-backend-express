const COMPUTEROUTESAPI = "https://routes.googleapis.com/directions/v2:computeRoutes"
import axios from "axios"
export default async function GetOptimumRoutes(origin: string, destination: string, travelMode?: string) {

  const reqbody = {
    origin: {
      address: origin
    },
    destination: {
      address: destination
    },
    travelMode: "DRIVE",
    languageCode: "en-US",
    units: "IMPERIAL",
    computeAlternativeRoutes: true
  }
  const getres = await axios.post(COMPUTEROUTESAPI, reqbody, {
    headers: {
      "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
      "X-Goog-Api-Key": process.env.GCP_MAPS_API,
      "Content-Type": "application/json"
    }
  })
  return getres.data

}


export async function findNearestMetroStation() {
  // const


}


