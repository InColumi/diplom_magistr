import React, { ReactElement, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { testA } from './store/test/actions'
import { isFetchingS, testListS } from './store/test/selectors'
import './App.css'

type AppProps = {
    isFetching: boolean
    testList: any
    test: () => void
}

const App = ({ isFetching, testList, test }: AppProps): ReactElement => {
    const [array, setArray] = useState<any>([])

    useEffect(() => {
        test()
    }, [])

    useEffect(() => {
        setArray(testList)
    }, [testList])

    return (
        <div className="App">
            {array.map((item: any) => {
                return (
                    <div className="card" key={item.id}>
                        <div className="card-image__wrapper">
                            <svg
                                height="80px"
                                width="80px"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 273.052 273.052"
                            >
                                <g>
                                    <circle cx="138.173" cy="73.52" r="73.52" />
                                    <path
                                        d="M126.381,171.369c6.728,3.236,17.65,3.236,24.378,0l67.047-32.243
		c6.734-3.236,13.989-0.082,16.208,7.054l20.032,64.35c2.219,7.136,0.234,17.65-4.433,23.48l-1.137,1.425
		c-3.807,4.759-11.058,8.784-17.661,24.797c-2.85,6.913-10.378,12.82-17.846,12.82H63.043c-7.473,0-14.99-5.901-17.873-12.793
		c-6.679-15.947-14.163-19.776-18.259-24.291l-3.263-3.612c-5.015-5.537-6.995-15.719-4.427-22.735L42.5,145.974
		c2.567-7.016,10.106-10.079,16.839-6.842L126.381,171.369z"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div>Name: {item.name}</div>
                        <div>Email: {item.email}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
        testList: testListS(state),
    }),
    {
        test: testA.request,
    }
)(App)
