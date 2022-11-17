<<<<<<< HEAD
=======
// import React, { useEffect, useState } from "react";
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7

const impactValue = ["?", "Small", "Medium", "Large", "Xlarge"];
const confidenceValue = ["?", "Small", "Medium", "Large", "Xlarge"];
const effortValue = ["?", "Xlarge", "Large", "Medium", "Small"];

<<<<<<< HEAD
=======

>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
function iceScoreCalculation(impactVar, confidenceVar, effortVar) {
    const impact = impactValue.indexOf(impactVar);
    const confidence = confidenceValue.indexOf(confidenceVar);
    const effort = effortValue.indexOf(effortVar);

    return (
        impact * confidence * effort
    );

    }

    export default iceScoreCalculation;
<<<<<<< HEAD

   
=======
         
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
