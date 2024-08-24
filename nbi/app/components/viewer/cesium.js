
'use client'
import { Cartesian3, Color } from 'cesium'
import { Viewer } from 'resium'
import { useRef } from 'react';
import Model from '../../model/nbi';

import { useSearchParams } from 'next/navigation'

// Layzy loading large dataset.
function lazyLoad(viewer, bridge, index) {
    setTimeout(() => {
        viewer.entities.add({
            position: Cartesian3.fromDegrees(bridge.longitude, bridge.latitude),
            point: {
                pixelSize: 10,
                color: Color.GREEN
            }
        });
    }, index * 1);
}

export default function Cesium() {
    const searchParams = useSearchParams()

    const structure = searchParams.get('STRUCTURE_NUMBER_008')
    const viewer = useRef(null);
    const model = new Model('http://localhost:3001/nbi/location' + (structure ? '?STRUCTURE_NUMBER_008=' + structure : ''));

    console.log("fetching data");
    model.fetchData().then((data) => {
        console.log(data.length)
        data.forEach((bridge, index) => {
            lazyLoad(viewer.current.cesiumElement, bridge, index);
        })
    })
    return (
        <>
            <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
            <Viewer ref={viewer} full={true}>
            </Viewer>
        </>
    )
}