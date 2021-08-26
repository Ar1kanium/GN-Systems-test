export const initializeData = (data) => {
    return data.result.flights.map((el) => {
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
    })
}

export const sortAscPrice = (data) => {
    return data.sort((a,b) => a.price-b.price)
}

export const sortDescPrice = (data) => {
    return data.sort((a,b) => b.price-a.price)
}

export const sortTravelTime = (data) => {
    return data.sort((a,b) => (a.there.duration + a.back.duration) - (b.there.duration + b.back.duration))
}

const choose = {
    'По возрастанию цены': sortAscPrice,
    "По убыванию цены": sortDescPrice,
    "По времени в пути": sortTravelTime,
}

export const filterAndSort = (data, sortMethod, transferFilter, priceFilter) => {
    console.log(priceFilter)
    return choose[sortMethod](data.filter(el => {
        if ((+priceFilter.from && +el.price < +priceFilter.from) || (+priceFilter.to && +el.price > +priceFilter.to)) return false
        if ((!transferFilter['1 пересадка'] && (el.back.transferQuantity === 1 || el.there.transferQuantity === 1)) ||
            (!transferFilter['без пересадок'] && (el.back.transferQuantity === 0 || el.there.transferQuantity === 0))) return false
        return true
    }))
}

export const airCompaniesDataProcess = (filteredData, sortMethod) => {
    const searchedValue = (el) => {
        if (sortMethod === "По времени в пути") return el.there.duration + el.back.duration
            return +el.price
    }
    return filteredData.reduce((acc,el) => {
        const compValue = searchedValue(el)
        if (!acc.hasOwnProperty(el.carrier) ||
            (sortMethod === "По убыванию цены" && acc[el.carrier] <= compValue) ||
            (sortMethod !== "По убыванию цены" && acc[el.carrier] >= compValue)) acc[el.carrier] = compValue
        return acc
        },{})
}

export const produceAirCompanyFormString = (sortMethod, company, value) => {
    const companyName = company.length > 19 ? company.slice(0, 14)+'....' : company
    if (sortMethod === "По убыванию цены") return ` - ${companyName} до ${value} р.`
    if (sortMethod === "По времени в пути") return ` - ${companyName} от ${Math.trunc(value/60)} ч ${value % 60} мин`
    if (sortMethod === 'По возрастанию цены') return ` - ${companyName} от ${value} р.`
}
