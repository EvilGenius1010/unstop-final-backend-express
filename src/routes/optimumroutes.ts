const COMPUTEROUTESAPI = "https://routes.googleapis.com/directions/v2:computeRoutes"
import axios from "axios"
export default async function GetOptimumRoutes(origin: string, destination: string, travelModes: string) {

  let reqbody
  if (travelModes == "TRANSIT" || travelModes == "WALK") {
    reqbody = {
      origin:
      {
        address: origin
      },
      destination: {
        address: destination
      },
      travelMode: travelModes,
      languageCode: "en-US",
      units: "IMPERIAL",
      // departureTime:,
      // arrivalTime:,
    }
  }
  else if (travelModes == "DRIVE" || travelModes == "TWO_WHEELER") {
    reqbody = {
      origin:
      {
        address: origin
      },
      destination: {
        address: destination
      },
      travelMode: travelModes,
      languageCode: "en-US",
      units: "IMPERIAL",
      // departureTime:,
      // arrivalTime:,
      routingPreference: "TRAFFIC_AWARE",
      computeAlternativeRoutes: true
    }
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

  const greenLineMetroStns = ["Nagasandra",
    "Dasarahalli",
    "Jalahalli",
    "Peenya INdustry",
    "Peenya",
    "Goreguntepalya",
    "Yeshwantpur",
    "Sandal Soap Factory",
    "Mahalakshmi",
    " Rajajinagar",
    "Kuvempu Road",
    "Srirampura",
    "Sampige Road",
    "Nadaprabhu Kempegowda Station",
    "Chickpet",
    "Krishnarajendra Market",
    "National College",
    "Lalbagh",
    "South End Circle",
    "Jayanagara",
    "Rashtreeya Vidyalaya Road",
    "Banashankari",
    "Jayaprakash Nagara",
    "Yelachenahalli",
    "Konanakunte Cross",
    "Doddakallasandra",
    "Vajarahalli",
    "Talaghattapura",
    "Silk Institute"]

  const purpleLineMetroStns = [
    "Baiyappanahalli",
    "Malleswaram",
    "Trinity Circle",
    "MG Road",
    "Cubbon Park",
    "Nimbana Park",
    "Vasanthapura",
    "HAL",
    "Indiranagar",
    "Kalyan Nagar",
    "Swami Vivekananda Road",
    "Hebbal",
    "Kasturi Nagar",
    "Nagawara",
    "Koppal",
    "Banjara Hills",
    "Hennur Road",
    "Jaibhim Nagar",
    "Hennur",
    "Silk Institute"
  ];



}


