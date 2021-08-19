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
    return choose[sortMethod](data.filter(el => {
        if ((priceFilter.from && el.price < priceFilter.from) || (priceFilter.to && el.price > priceFilter.to)) return false
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
