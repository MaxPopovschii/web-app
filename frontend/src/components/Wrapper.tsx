import { APIProvider } from "@vis.gl/react-google-maps"
import TravelMap from "./TravelMap"


const  Wrapper = ()  => {
    const key = "AIzaSyBlF7YCQMhpBMZyPjGIntok5Ksw-zrVg44";
  return (
    <div className="wrapper" style={{display: "flex",  justifyContent: "space-evenly"}}>
        <APIProvider apiKey={key}>
            <TravelMap></TravelMap>
        </APIProvider>
    </div>
  ) 
}

export default Wrapper

