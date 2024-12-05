import { APIProvider } from "@vis.gl/react-google-maps"
import TravelMap from "./TravelMap"


const  Wrapper = ()  => {
    const key = process.env.GOOGLE_API_KEY || "";
  return (
    <div className="wrapper" style={{display: "flex", padding: "5rem", justifyContent: "space-evenly"}}>
        <APIProvider apiKey={key}>
            <TravelMap></TravelMap>
        </APIProvider>
    </div>
  ) 
}

export default Wrapper

