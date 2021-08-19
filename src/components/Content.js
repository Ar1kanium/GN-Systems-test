import React from "react";
import {airCompaniesDataProcess, filterAndSort, produceAirCompanyFormString, sortAscPrice} from '../services/services'
import useDebounce from "../services/useDebounce";
import FlightCard from "./FlightCard";
import {styles} from "../styles";

const Content = ({data}) => {

    const [filteredData, setFilteredData] = React.useState(sortAscPrice(data))
    const [sortWay, setSortWay] = React.useState('По возрастанию цены')
    const [transferFilter, setTransferFilter] = React.useState({
        '1 пересадка': true,
        'без пересадок': true,
    })
    const [priceFilter, setPriceFilter] = React.useState({
        from: '',
        to: '',
    })
    const [cardsCount, setCardsCount] = React.useState(5)
    const [airCompaniesList, setAirCompaniesList] = React.useState(airCompaniesDataProcess(filteredData, sortWay))
    const [airCompaniesCheck, setAirCompaniesCheck] = React.useState(() => {
        const state = {}
        Object.keys(airCompaniesList).forEach(el => state[el] = true)
        return state
    })
    const debouncedPriceFilter = useDebounce(priceFilter, 1000)
    React.useEffect(() => {
        setCardsCount(5)
        setFilteredData(filterAndSort(data, sortWay, transferFilter, debouncedPriceFilter))
        window.scrollTo(0, 0)
    }, [debouncedPriceFilter, sortWay, transferFilter, data])
    React.useEffect(() => {
        setAirCompaniesList(airCompaniesDataProcess(filteredData,sortWay))
    }, [filteredData, sortWay])
    const transferChange = (e) => {
        const target = e.target.name
        const val = e.target.checked
        const state = {...transferFilter}
        state[target] = val
        setTransferFilter(state)
    }
    const changePriceHandler = (e) => {
        if (!isNaN(e.target.value)) {
            const state = {...priceFilter}
            state[e.target.name] = e.target.value
            setPriceFilter(state)
        }
    }
    const airCompaniesCheckHandler = (e) => {
        const target = e.target.name
        const val = e.target.checked
        const state = {...airCompaniesCheck}
        state[target] = val
        setAirCompaniesCheck(state)
    }

    return(
        <>
            <div className={styles.menuContainer}>
                <form className={styles.formContainer} onChange={(e) => setSortWay(e.target.value)}>
                    <label className={styles.title}> Сортировать </label>
                    <div className={styles.formItem}>
                        <input type="radio" value="По возрастанию цены" name="sort" className={styles.input} defaultChecked />
                        <span> - по возрастанию цены</span>
                    </div>
                    <div className={styles.formItem}>
                        <input type="radio" value="По убыванию цены" name="sort" className={styles.input} />
                        <span>- по убыванию цены</span>
                    </div>
                    <div className={styles.formItem}>
                        <input type="radio" value="По времени в пути" name="sort" className={styles.input}/>
                        <span>- по времени в пути</span>
                    </div>
                </form>
                <form className={styles.formContainer}>
                    <label className={styles.title}> Фильтровать </label>
                    <div className={styles.formItem}>
                        <input type='checkbox' name='1 пересадка' checked={transferFilter['1 пересадка']} className={styles.input} onChange={transferChange}/>
                        <span>- 1 пересадка</span>
                    </div>
                    <div className={styles.formItem}>
                        <input type='checkbox' name='без пересадок' checked={transferFilter['без пересадок']} className={styles.input} onChange={transferChange}/>
                        <span>- без пересадок</span>
                    </div>
                </form>
                <form className={styles.formContainer}>
                    <label className={styles.title}> Цена </label>
                    <div className={styles.formItemPrice}>
                        <span>От </span>
                        <input value={priceFilter.from} onChange={changePriceHandler} className={styles.inputPrice} name='from'/>
                    </div>
                    <div className={styles.formItemPrice}>
                        <span>До </span>
                        <input value={priceFilter.to} onChange={changePriceHandler} className={styles.inputPrice} name='to'/>
                    </div>
                </form>
                <form className={styles.formContainer}>
                    <label className={styles.title}> Авиакомпании </label>
                    {Object.entries(airCompaniesList).sort((a, b) =>{
                        return sortWay === "По убыванию цены" ? b[1] - a[1] : a[1] - b[1]}).map(([company, value]) => {
                        return (
                            <div key={company} className={styles.formItem}>
                                <input
                                    name={company}
                                    type='checkbox'
                                    checked={airCompaniesCheck[company]}
                                    className={styles.input}
                                    onChange={airCompaniesCheckHandler}
                                /> <span>{produceAirCompanyFormString(sortWay, company, value)}</span>
                            </div>
                        )
                    })}
                </form>
            </div>
            <div className={styles.contentContainer}>
                {filteredData.filter(el => airCompaniesCheck[el.carrier]).slice(0, cardsCount).map((el,ind) => <FlightCard key={ind} flightData={el}/>)}
                <button className={styles.showMore} onClick={() => setCardsCount(cardsCount+5)}>Показать еще</button>
            </div>
        </>
    )
}

export default Content