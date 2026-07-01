import * as maplibregl from './maplibre-gl-js/dist/maplibre-gl.mjs';

// const map = new maplibregl.Map({
//     container: 'map',
//         style: {
//         version: 8,
//         sources: {
//             cartodb_voyager: {
//                 type: "raster",
//                 tiles: [
//                     "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png"
//                 ],
//                 tileSize: 256,
//                 attribution:
//                     '© <a href="https://carto.com/attributions">CARTO</a>'
//             }
//         },
//         layers: [
//             {
//                 id: "cartodb_voyager",
//                 type: "raster",
//                 source: "cartodb_voyager",
//                 minzoom: 0,
//                 maxzoom: 20
//             },
//             {
//                 id: "film_ancre",
//                 type: "background",
//                 layout: {
//                     'visibility': 'none'
//                 },
//                 paint: {
//                     "background-color": "#ffffff",
//                     'background-opacity': 0.5,
                    
//                 }
//             }
//         ]
        
//     },
//     center: [2.3522, 48.8566], 
//     zoom: 6

    
// });





const map = new maplibregl.Map({
    container: 'map1',
    center: [2.35, 48.85],
    zoom: 8,
    minZoom: 5,
    maxZoom: 21,
    style: {
        version: 8,
        sources: {
            cartodb_voyager: {
                type: "raster",
                tiles: [
                    "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png"
                ],
                tileSize: 256,
                attribution:
                    '© <a href="https://carto.com/attributions">CARTO</a>'
            }
        },
        layers: [
            {
                id: "cartodb_voyager",
                type: "raster",
                source: "cartodb_voyager",
                minzoom: 0,
                maxzoom: 20
            }
        ]
    }
});






const zoomDiv = document.getElementById('zoom-indicator');


const menuSelect = document.getElementById('menu-select');
const btnParams = document.getElementById('btn-activate-params');
const inputVitesse = document.getElementById('param-vitesse');
const inputMolette = document.getElementById('param-molette');
const inputPad = document.getElementById('param-pad');
const uiParams = document.getElementById('ui-params');

const uiGravite = document.getElementById('ui-gravite');
const btnGravite2 = document.getElementById('btn-gravite2');
const btnGravite3 = document.getElementById('btn-gravite3');
const inputGravite = document.getElementById('param-force');
const inputPopulation = document.getElementById('param-population');
const inputPoidsCapitales = document.getElementById('param-poids-capitales');
const inputPoidsCommunes = document.getElementById('param-poids-communes');
const inputDeltaThreshold = document.getElementById('param-delta-threshold');

const uiCenter = document.getElementById('ui-center');
const btnCenter = document.getElementById('btn-center');


const uiAncre = document.getElementById('ui-ancre');
const btnAncre = document.getElementById('btn-ancre');
const inputOpacite = document.getElementById('param-opacite');
const inputBlancGris = document.getElementById('param-blanc-gris');
const inputVitesseAnimation = document.getElementById('param-vitesse-animation');
const inputMoletteAncre = document.getElementById('param-molette-ancre');
const inputAnimationFilm = document.getElementById('param-animation-film');



const uiSequentiel = document.getElementById('ui-sequentiel');
const btnSequentiel = document.getElementById('btn-sequentiel');
const inputPallier = document.getElementById('param-paliers-zoom');



const btnReset = document.getElementById('btn-reset');


const divMap1 = document.getElementById('map1');
const divMap2 = document.getElementById('map2');

let etatbtnCenter = false;

menuSelect.addEventListener('change', (e) => {
    reset();
    const val = e.target.value;
    
    uiParams.classList.add('hidden');
    uiGravite.classList.add('hidden');
    uiCenter.classList.add('hidden');
    uiAncre.classList.add('hidden');
    uiSequentiel.classList.add('hidden');
    if (val === 'mode-params') uiParams.classList.remove('hidden');
    if (val === 'mode-gravite') uiGravite.classList.remove('hidden');
    if (val === 'mode-center') uiCenter.classList.remove('hidden');
    if (val === 'mode-ancre') uiAncre.classList.remove('hidden');
    if (val === 'mode-sequentiel') uiSequentiel.classList.remove('hidden');
    if (val === 'mode-ancre') {
        console.log('seq');
        divMap1.classList.add('hidden');
        divMap2.classList.remove('hidden');

    } else {
        
        divMap2.classList.add('hidden');
        divMap1.classList.remove('hidden');
        

    }
});


function paramZoom(s_w,s_p) {
    map.scrollZoom.setWheelZoomRate(s_w);
    map.scrollZoom.setZoomRate(s_p);

}

btnParams.addEventListener('click', () => {
    if (btnParams.classList.contains('off')) {

        const sensibilite_m = parseFloat(inputMolette.value);
        const sensibilite_p = parseFloat(inputPad.value);
        paramZoom( sensibilite_m,sensibilite_p);
        btnParams.textContent = 'Activé';
        btnParams.classList.replace('off', 'on');

    } else {
        btnParams.textContent = 'Désactivé';
        btnParams.classList.replace('on', 'off');
        map.scrollZoom.setWheelZoomRate(1/450);
        map.scrollZoom.setZoomRate(1/450);

    }


});



const affichageValeur_mol = document.getElementById('valeur-molette');
inputMolette.addEventListener('input', (e) => {
    const val = e.target.value;
    affichageValeur_mol.textContent = val;
});

const affichageValeur_pad = document.getElementById('valeur-pad');
inputPad.addEventListener('input', (e) => {
    const val = e.target.value;
    affichageValeur_pad.textContent = val;
});
inputOpacite.addEventListener('input', (e) => {
    document.getElementById('valeur-opacite').textContent = e.target.value;

});
inputBlancGris.addEventListener('input', (e) => {
    document.getElementById('valeur-blanc-gris').textContent = e.target.value;

});
inputVitesseAnimation.addEventListener('input', (e) => {
    document.getElementById('valeur-vitesse-animation').textContent = e.target.value;

});

inputMoletteAncre.addEventListener('input', (e) => {
    document.getElementById('valeur-molette-ancre').textContent = e.target.value;

});
inputAnimationFilm.addEventListener('input', (e) => {
    document.getElementById('valeur-animation-film').textContent = e.target.value;      

});
let cities = [];

fetch('/assets/villes.json')
  .then(response => response.json())
  .then(data => {
    cities = data;
    console.log("Donnéesok ");
    window.cities = cities;

  });



// ############################################################  GRAVITE 

let isGravEnabled = false;
let isGravEnabled2 = false;
btnGravite2.addEventListener('click', () => {
    if (btnGravite2.classList.contains('off')) {
        btnGravite2.textContent = 'Activé';
        btnGravite2.classList.replace('off', 'on');
        console.log('test')
        isGravEnabled2 = true;
        isGravEnabled3 = false;


        map.scrollZoom.enable({
            around: 'gravite',
            gravityConfig: {
                type_ville: { capitale: parseFloat(inputPoidsCapitales.value), 
                                commune: parseFloat(inputPoidsCommunes.value) },
                seuilPop: parseFloat(inputPopulation.value),
                attractionPower: parseFloat(inputGravite.value)// 0.8 = forte aspiration, 0.1 = léger décalage
            }
        });

    } else {
        btnGravite2.textContent = 'Désactivé';
        btnGravite2.classList.replace('on', 'off');
        isGravEnabled2 = false;
        map.scrollZoom.disable();
        map.scrollZoom.enable();
    }
});


let isGravEnabled3 = false;
btnGravite3.addEventListener('click', () => {
    if (btnGravite3.classList.contains('off')) {
        btnGravite3.textContent = 'Activé';
        btnGravite3.classList.replace('off', 'on');
        isGravEnabled3 = true;
        isGravEnabled2 =  false;

                map.scrollZoom.enable({
            around: 'gravite',
            gravityConfig: {
                type_ville: { capitale: parseFloat(inputPoidsCapitales.value), 
                                commune: parseFloat(inputPoidsCommunes.value) },
                seuilPop: parseFloat(inputPopulation.value),
                attractionPower: parseFloat(inputGravite.value),
                deltaThreshold: parseFloat(inputDeltaThreshold.value)
            }
        });

    } else {
        btnGravite3.textContent = 'Désactivé';
        btnGravite3.classList.replace('on', 'off');
        isGravEnabled3 = false;
    }
});



// ############################################################  centrer 






btnCenter.addEventListener('click', () => {
    if (btnCenter.classList.contains('off')) {

        btnCenter.textContent = 'Activé';
        btnCenter.classList.replace('off', 'on');
        console.log('Zoom centré activé');

        map.scrollZoom.disable();
        map.scrollZoom.enable({ around: 'center' });

        etatbtnCenter = true;

    } else {
        btnCenter.textContent = 'Désactivé';
        btnCenter.classList.replace('on', 'off');
        etatbtnCenter= false;
        map.scrollZoom.disable();
        map.scrollZoom.enable();

    }
});


// ############################################################  sequentiel 




let etatbtnSequentiel = false;
let intervals = [];
let intervalIndex = -1;
let lockZoom = false;
let comportement;
let index;


btnSequentiel.addEventListener('click', () => {
    if (btnSequentiel.classList.contains('off')) {
        comportement =document.querySelector('input[name="comportement-palier"]:checked').value;
        btnSequentiel.textContent = 'Activé';
        btnSequentiel.classList.replace('off', 'on');
        etatbtnSequentiel = true;
        intervals = genererIntervalles(inputPallier.value);
        console.log(intervals);
        findIndexZoom();
        changementIntervalles(index);
    } else {
        btnSequentiel.textContent = 'Désactivé';
        btnSequentiel.classList.replace('on', 'off');
        etatbtnSequentiel = false;
        map.setMinZoom(0);
        map.setMaxZoom(24);
    }
});




function genererIntervalles(inputStr) {
    let points = inputStr.split(/[\s,]+/)
                         .map(Number)
                         .filter(n => !isNaN(n)); 

    points = [...new Set(points)];
    points.push(0, 24);
    points.sort((a, b) => a - b);

    
    let intervalles = [];
    for (let i = 0; i < points.length - 1; i++) {

        intervalles.push([points[i], points[i+1]]);
    }
    return intervalles;
}
 
 
function changementIntervalles(nouvelIndex){
    intervalIndex = nouvelIndex;
    const [min, max] = intervals[intervalIndex];   

    if (min !== 0 && (comportement === 'min' || comportement === 'both')) {
        map.setMinZoom(min +   0.01);
    }else {
        map.setMinZoom(min);
    }
    if (max !== 24 && (comportement === 'max' || comportement === 'both')) {
        map.setMaxZoom(max - 0.01);
    }else { 
       map.setMaxZoom(max);
    } 

}
function findIndexZoom() {
    const z = map.getZoom();
    
    index = intervals.findIndex(inter => z >= inter[0] && z <= inter[1]);

}



map.on('zoom', () => {
    const zRaw = map.getZoom();

    const zoomDiv = document.getElementById('zoom-indicator');
    zoomDiv.innerHTML = `
        Zoom MapLibre : ${zRaw.toFixed(2)}<br>
    `;
    
    if(etatbtnSequentiel ){
        const currentZoom = map.getZoom();
        const currentMin = intervals[index][0];
        const currentMax = intervals[index][1];

        if(!lockZoom){
            if ( comportement === 'max' ){
                if (currentZoom >= currentMax-0.01) {
                    lockZoom = true;
                    console.log('detection mur max');
                    console.log(currentZoom);
                    map.setMinZoom(0);
                    map.setMaxZoom(24);
                    

                }else if (currentZoom <= currentMin) {
                    lockZoom = true;
                    console.log('detection mur min');
                    map.setMinZoom(0);
                    map.setMaxZoom(24);
                    console.log(currentZoom);
                    

                }
            }
            else if (comportement === 'min'){
                if (currentZoom >= currentMax ) {
                    lockZoom = true;
                    console.log('detection mur max');
                    console.log(currentZoom);
                    map.setMinZoom(0);
                    map.setMaxZoom(24);
                    

                }else if (currentZoom <= currentMin+0.01) {
                    lockZoom = true;
                    console.log('detection mur min');
                    map.setMinZoom(0);
                    map.setMaxZoom(24);
                    console.log(currentZoom);
                    

                }
            }
            if ( comportement === 'both'){
                if (currentZoom >= currentMax -0.01) {
                    lockZoom = true;
                    console.log('detection mur max');
                    console.log(currentZoom);
                    map.setMinZoom(0);
                    map.setMaxZoom(24);
                    

                }else if (currentZoom <= currentMin+0.01) {
                    lockZoom = true;
                    console.log('detection mur min');
                    map.setMinZoom(0);
                    map.setMaxZoom(24);
                    console.log(currentZoom);           
                }
            }
        }else{
            findIndexZoom();
            lockZoom = false;
            changementIntervalles(index);

        }

    }
});




map.on('zoom', () => {
    const zRaw = map.getZoom();


    zoomDiv.innerHTML = `
        Zoom MapLibre : ${zRaw.toFixed(2)}<br>
    `;
});







// ############################################################  reset


btnReset.addEventListener('click', () => {
    menuSelect.value = 'none';

    reset();

});


function reset(){
    uiParams.classList.add('hidden');
    uiGravite.classList.add('hidden');
    uiCenter.classList.add('hidden');
    uiAncre.classList.add('hidden');
    uiSequentiel.classList.add('hidden');

    btnGravite2.textContent = 'Désactivé';
    btnGravite2.classList.replace('on', 'off');
    btnGravite3.textContent = 'Désactivé';
    btnGravite3.classList.replace('on', 'off');

    btnCenter.textContent = 'Désactivé';
    btnCenter.classList.replace('on', 'off');
    btnAncre.textContent = 'Désactivé';
    btnAncre.classList.replace('on', 'off');    
    btnSequentiel.textContent = 'Désactivé';
    btnSequentiel.classList.replace('on', 'off'); 


    etatbtnCenter = false;
    isGravEnabled2 = false;
    isGravEnabled3 = false;
    etatbtnSequentiel   = false;
    map.setMinZoom(0);
    map.setMaxZoom(24);

    map.scrollZoom.setWheelZoomRate(1/450);
    map.scrollZoom.setZoomRate(1/450);
    map.scrollZoom.disable();
    map.scrollZoom.enable();
    map.zoomDelta = 1;    
    map.zoomSnap = 0.1;
    

}



//############################################################  ancre



// let opaciteAncre;
// let blancGris;
// let vitesseAnimation;
// let illuminationAncre;
// let moletteAncre;
// let couchesRoutes;
// let animationFilmTemps;
// let animationEnCours = false;
// let ancre = false;
// let ancreProgress;
// let progressionTemps = 0;

// function showAncre(on = true) {

//     if (ancreProgress == "desactiver" ){
//         if(on){
//             map.setPaintProperty('film_ancre', 'background-opacity', opaciteAncre);

//             map.setLayoutProperty("film_ancre", "visibility", "visible");
//             couchesRoutes.forEach(route => {
//                 if (map.getLayer(route.id)) {

//                     map.moveLayer(route.id); 
                    
//                     map.setPaintProperty(route.id, 'line-color', '#ff0000'); 
//                 }
//             });
//         }else{
//             map.setLayoutProperty("film_ancre", "visibility", "none");
//             couchesRoutes.forEach(route => {
//                 if (map.getLayer(route.id)) {
//                     map.setPaintProperty(route.id, 'line-color', route.couleurOrigine); 
//                 if (route.idsup && map.getLayer(route.idsup)) {
//                         map.moveLayer(route.id, route.idsup);
//                     } else {
//                         // Si elle n'avait rien au-dessus d'elle au départ, on la remet tout en haut
//                         map.moveLayer(route.id); 
//                     }
//                 }
//             });
//         }
//     }else{
//         if(on){
//             map.setLayoutProperty("film_ancre", "visibility", "visible");
//             //mettre ici ce qui permet l'oppacité dynamique
//             const limiteMontage = Math.min(0.5, animationFilmTemps / 100);
//             let opaciteDynamique = 0;
//             // premier partie opacité augment, puis stagne et diminue
//             if (progressionTemps <= limiteMontage) {
//                 opaciteDynamique = (progressionTemps / limiteMontage) * opaciteAncre;
//             } else if (progressionTemps >= (1 - limiteMontage)) {
//                 let distanceFin = (1 - progressionTemps) / limiteMontage;
//                 opaciteDynamique = distanceFin * opaciteAncre;
//             } else {
//                 opaciteDynamique = opaciteAncre;
//             }
//             opaciteDynamique = Math.max(0, Math.min(opaciteAncre, opaciteDynamique));
//             map.setPaintProperty('film_ancre', 'background-opacity', opaciteDynamique);


//             couchesRoutes.forEach(route => {
//                 if (map.getLayer(route.id)) {

//                     map.moveLayer(route.id); 
                    
//                     map.setPaintProperty(route.id, 'line-color', '#ff0000'); 
//                 }
//             });
//         }else{
//             map.setLayoutProperty("film_ancre", "visibility", "none");
//             map.setPaintProperty('film_ancre', 'background-opacity', 0);
//             progressionTemps = 0;
//             couchesRoutes.forEach(route => {
//                 if (map.getLayer(route.id)) {
//                     map.setPaintProperty(route.id, 'line-color', route.couleurOrigine); 
//                 if (route.idsup && map.getLayer(route.idsup)) {
//                         map.moveLayer(route.id, route.idsup);
//                     } else {
//                         map.moveLayer(route.id); 
//                     }
//                 }
//             });
//         }

//     }

// }

// btnAncre.addEventListener('click', () => {
//     ancre = !ancre;
//     ancreProgress =  document.querySelector('input[name="ancre-active"]:checked').value;

//     if (ancre) {
//         btnAncre.textContent = 'Activé';
//         btnAncre.classList.replace('off', 'on');
//         opaciteAncre = parseFloat(inputOpacite.value);
//         blancGris = parseFloat(inputBlancGris.value);
//         vitesseAnimation = parseFloat(inputVitesseAnimation.value);
//         illuminationAncre = parseFloat(inputIlluminationAncre.value);
//         moletteAncre = parseFloat(inputMoletteAncre.value);
//         animationFilmTemps = parseFloat(inputAnimationFilm.value);
//         map.setPaintProperty('film_ancre', 'background-color', `rgb(${blancGris}, ${blancGris}, ${blancGris})`);
//         map.scrollZoom.disable();


//     } else {
//         btnAncre.textContent = 'Désactivé';
//         btnAncre.classList.replace('on', 'off');
//         map.scrollZoom.enable();

//     }
// });



// map.getCanvas().addEventListener('wheel', (e) => {

//     if (!ancre) return; 
//     console.log('molette détectée');
//     if (animationEnCours) return;
//     console.log("pas d'animatione")
//     e.preventDefault(); 
//     animationEnCours = true;

//     const deltaZoom = e.deltaY < 0 ? moletteAncre : -moletteAncre;
//     const zoomCible = map.getZoom() + deltaZoom;

//     if (zoomCible < 0 || zoomCible > 24) return;
//     const rect = map.getCanvas().getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;    
//     const coordonneesSouris = map.unproject([mouseX, mouseY]);

//     showAncre();
    
//     console.log("animation start")
    
//     map.easeTo({
//         zoom: zoomCible,
//         duration: vitesseAnimation*1000, 
//         around: coordonneesSouris,  
//         easing: (t) => {
//                     progressionTemps = t; 
//                     return t * (2 - t);   
//                 }   
//     });

// }, { passive: false });

// map.on('render', () => {
//     if (animationEnCours && ancreProgress !== "desactiver") {
//         showAncre(true);
//     }
// });

// map.on('moveend', () => {
//     if (ancre) {
//         console.log("animation end");
//         animationEnCours = false;
//         showAncre(false);

//     }
// });


