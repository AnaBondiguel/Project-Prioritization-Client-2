import {getImpacts, getConfidences, getEfforts} from '../src/services/selectionServices'

test ( 'getImpacts', () => {
    const expectedImpacts = [
        {name:"?"},
        {name:"Small"},
        {name:"Medium"},
        {name:"Large"},
        {name:"Xlarge"},
    ]
    const impacts = getImpacts()
    expect(impacts).toEqual(expectedImpacts)
}

)

test ( 'getConfidences', () => {
    const expectedConfidences = [
        {name:"?"},
        {name:"Small"},
        {name:"Medium"},
        {name:"Large"},
        {name:"Xlarge"},
    ]
    const confidences = getConfidences()
    expect(confidences).toEqual(expectedConfidences)
}

)

test ( 'getEfforts', () => {
    const expectedEfforts = [
        {name:"?"},
        {name:"Small"},
        {name:"Medium"},
        {name:"Large"},
        {name:"Xlarge"},
    ]
    const efforts = getEfforts()
    expect(efforts).toEqual(expectedEfforts)
}

)