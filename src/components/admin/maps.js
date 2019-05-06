import React from 'react'
import { Map } from 'react-amap';


const MyMapComponent = (props) => {
    // props.__ele__;
    // props.__map__;
    // your code here
    console.log(props.__map__)
    return (<div />)
};


export default () => {
    return (
        <div style={{ width: "100%", height: "480px" }}>
            <Map amapkey={"8bf3ec30591ac4b5080d47c365ebbd07"} version={"1.4.13"} zoom={16} center={{ longitude: 104.814631, latitude: 26.575885 }} >
                <MyMapComponent />
            </Map>
        </div>
    )
}