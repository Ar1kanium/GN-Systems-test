import React from "react";
import data from './data/flights.json'
import Content from "./components/Content";
import {styles} from "./styles";

function App() {
    const [myData] = React.useState(data.result.flights.map((el) => {
        const transfersThere = el.flight.legs[0].segments.length - 1
        const transfersBack = el.flight.legs[1].segments.length - 1
        return {
            carrier: el.flight.carrier.caption,
            price: el.flight.price.total.amount,
            there: {
                departureDate: el.flight.legs[0].segments[0].departureDate,
                arrivalDate: el.flight.legs[0].segments[transfersThere].arrivalDate,
                duration: el.flight.legs[0].duration,
                transferQuantity: transfersThere,
                operatingAirline: el.flight.legs[0].segments[0].hasOwnProperty('operatingAirline') ?
                    el.flight.legs[0].segments[0].operatingAirline.caption :
                    el.flight.carrier.caption,
                departurePoint: {
                    city: el.flight.legs[0].segments[0].departureCity.caption,
                    airportUid: el.flight.legs[0].segments[0].departureAirport.uid,
                    airportCaption: el.flight.legs[0].segments[0].departureAirport.caption,
                },
                arrivalPoint: {
                    city: el.flight.legs[0].segments[transfersThere].hasOwnProperty('arrivalCity') ?
                        el.flight.legs[0].segments[transfersThere].arrivalCity.caption :
                        '',
                    airportUid: el.flight.legs[0].segments[transfersThere].arrivalAirport.uid,
                    airportCaption: el.flight.legs[0].segments[transfersThere].arrivalAirport.caption,
                },
            },
            back: {
                departureDate: el.flight.legs[1].segments[0].departureDate,
                arrivalDate: el.flight.legs[1].segments[transfersBack].arrivalDate,
                duration: el.flight.legs[1].duration,
                transferQuantity: transfersBack,
                operatingAirline: el.flight.legs[1].segments[0].hasOwnProperty('operatingAirline') ?
                    el.flight.legs[1].segments[0].operatingAirline.caption :
                    el.flight.carrier.caption,
                departurePoint: {
                    city: el.flight.legs[1].segments[0].hasOwnProperty('departureCity') ?
                        el.flight.legs[1].segments[0].departureCity.caption :
                        '',
                    airportUid: el.flight.legs[1].segments[0].departureAirport.uid,
                    airportCaption: el.flight.legs[1].segments[0].departureAirport.caption,
                },
                arrivalPoint: {
                    city: el.flight.legs[1].segments[transfersBack].arrivalCity.caption,
                    airportUid: el.flight.legs[1].segments[transfersBack].arrivalAirport.uid,
                    airportCaption: el.flight.legs[1].segments[transfersBack].arrivalAirport.caption,
                },
            },
        }
    }))



  return (
    <div className={styles.app}>
        <Content data={myData}/>
    </div>
  );
}

export default App;
