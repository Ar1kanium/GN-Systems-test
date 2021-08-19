import React from "react";
import * as dayjs from "dayjs";
import {styles} from "../styles";

const FlightCard = ({flightData}) => {
    const [departureTimeThere, departureTimeBack, arrivalTimeThere, arrivalTimeBack] = [
        dayjs(flightData.there.departureDate),
        dayjs(flightData.back.departureDate),
        dayjs(flightData.there.arrivalDate),
        dayjs(flightData.back.arrivalDate)
    ]
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <span className={styles.cardPrice}>{flightData.price} ₽</span>
                <span className={styles.cardHeaderText}>Стоимость для одного взрослого пассажира</span>
            </div>
            <div className={styles.cardDestination}>
                <span>{`${flightData.there.departurePoint.city ?
                    flightData.there.departurePoint.city+', ':
                ''}${flightData.there.departurePoint.airportCaption} `}</span>
                <span className={styles.cardBlueText}>{`(${flightData.there.departurePoint.airportUid}) ⟶`}</span>
                <span>{`${flightData.there.arrivalPoint.city ?
                    flightData.there.arrivalPoint.city+', ':
                    ''}${flightData.there.arrivalPoint.airportCaption} `}</span>
                <span className={styles.cardBlueText}>{`(${flightData.there.arrivalPoint.airportUid})`}</span>
            </div>
            <hr/>
            <div className={styles.cardTime}>
                <div>
                    <span>{departureTimeThere.format('HH:mm')}</span>
                    <span className={styles.cardBlueTime}>{departureTimeThere.format('D MMM ddd').toLowerCase().slice(0, -1)}</span>
                </div>
                <span className={styles.cardDuration}>{`🕓 ${Math.trunc(flightData.there.duration/60)} ч ${flightData.there.duration % 60} мин`}</span>
                <div>
                    <span className={styles.cardBlueTime}>{arrivalTimeThere.format('D MMM ddd').toLowerCase().slice(0, -1)}</span>
                    <span>{arrivalTimeThere.format('HH:mm')}</span>
                </div>
            </div>
            <div className={styles.cardTransfersWrapper}>
                <div className={styles.cardLineSm}></div>
                {!!flightData.there.transferQuantity &&
                <div className={styles.cardTransfers}> 1 пересадка</div>
                }
            </div>
            <div>
                <span className={styles.cardCarrier}>Рейс выполняет: {flightData.there.operatingAirline}</span>
            </div>
            <div className={styles.cardBlueLine}></div>
            <div className={styles.cardDestination}>
                <span>{`${flightData.back.departurePoint.city ?
                    flightData.back.departurePoint.city+', ':
                    ''}${flightData.back.departurePoint.airportCaption} `}</span>
                <span className={styles.cardBlueText}>{`(${flightData.back.departurePoint.airportUid}) ⟶`}</span>
                <span>{`${flightData.back.arrivalPoint.city ?
                    flightData.back.arrivalPoint.city+', ':
                    ''}${flightData.back.arrivalPoint.airportCaption} `}</span>
                <span className={styles.cardBlueText}>{`(${flightData.back.arrivalPoint.airportUid})`}</span>
            </div>
            <hr/>
            <div className={styles.cardTime}>
                <div>
                    <span>{departureTimeBack.format('HH:mm')}</span>
                    <span className={styles.cardBlueTime}>{departureTimeBack.format('D MMM ddd').toLowerCase().slice(0, -1)}</span>
                </div>
                <span className={styles.cardDuration}>{`🕓 ${Math.trunc(flightData.back.duration/60)} ч ${flightData.back.duration % 60} мин`}</span>
                <div>
                    <span className={styles.cardBlueTime}>{arrivalTimeBack.format('D MMM ddd').toLowerCase().slice(0, -1)}</span>
                    <span>{arrivalTimeBack.format('HH:mm')}</span>
                </div>
            </div>
            <div className={styles.cardTransfersWrapper}>
                <div className={styles.cardLineSm}></div>
                {!!flightData.back.transferQuantity &&
                <div className={styles.cardTransfers}> 1 пересадка</div>
                }
            </div>
            <div>
                <span className={styles.cardCarrier}>Рейс выполняет: {flightData.back.operatingAirline}</span>
            </div>
            <button className={styles.cardButton} onClick={() => {}}>ВЫБРАТЬ</button>
        </div>
    )
}

export default FlightCard