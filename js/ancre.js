const btnReset = window.parent.document.getElementById('btn-reset');
const uiAncre = window.parent.document.getElementById('ui-ancre');
const btnAncre = window.parent.document.getElementById('btn-ancre');
const inputOpacite = window.parent.document.getElementById('param-opacite');
const inputBlancGris = window.parent.document.getElementById('param-blanc-gris');
const inputVitesseAnimation = window.parent.document.getElementById('param-vitesse-animation');
const inputMoletteAncre = window.parent.document.getElementById('param-molette-ancre');
const inputAnimationFilm = window.parent.document.getElementById('param-animation-film');

const inputsRoutes = window.parent.document.querySelectorAll('input[name="type-route"]');
const inputsToponymes = window.parent.document.querySelectorAll('input[name="type-toponyme"]');
const inputsHydro = window.parent.document.querySelectorAll('input[name="type-hydro"]');




let opaciteAncre;
let blancGris;
let vitesseAnimation;
let moletteAncre;
let animationFilmTemps;
let animationEnCours = false;
let ancre = false;
let ancreProgress;
let progressionTemps = 0;

let couchesToponymes = [];
let couchesHydro = [];
let couchesRoutes = [];

let couchesHydroPaul = [];
let couchesHydroIGN = []

const menuSelect = document.getElementById('menu-select');




menuSelect.addEventListener('change', (e) => {
    map.scrollZoom.enable();

});











const toponymesACloner = [
        "toponyme localite importance 2 avec point",
        "toponyme localite importance 1  avec point",
        "toponyme localite importance 1",
        "toponyme localite importance 2",
        "toponyme localite n0 typoA1 commune",
        "toponyme localite n0 typoA2 commune",
        "toponyme localite n0 typoA3 commune"
    ];
const toponymesAll= [
        "toponyme continent",
        "toponyme pays 1 et 2",
        "toponyme pays 3",
        "toponyme localite importance 3 avec point",
        "toponyme localite importance 2 avec point",
        "toponyme localite importance 1  avec point",
        "toponyme localite importance 1",
        "toponyme localite importance 2",
        "toponyme localite importance 3",
        "toponyme localite importance 4",
        "toponyme localite importance 5",
        "toponyme localite importance 6et7 - Special DOM",
        "toponyme localite n0 typoA1 commune",
        "toponyme localite n0 typoA2 commune",
        "toponyme localite n0 typoA3 commune",
        "toponyme localite n0 typoA4 commune",
        "toponyme localite n0 typoA5etA6 commune",
        "toponyme localite n0 typoA7 commune",
        "toponyme localite n0 typoA8 commune"
    ];


const containerListeTopo = window.parent.document.getElementById('topo-layers-list');
if (containerListeTopo) {
    containerListeTopo.innerHTML = ''; 
    toponymesAll.forEach(idCouche => {
        const cochee = toponymesACloner.includes(idCouche) ? 'checked' : '';
        
        containerListeTopo.innerHTML += `
            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px; font-size: 0.8rem;">
                <input type="checkbox" class="sub-topo-checkbox" data-layer-id="${idCouche}" ${cochee}>
                <label style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${idCouche.replace('toponyme ', '')}</label>
            </div>
        `;
    });
}



const configCouchesHydro = [
        { id: "river_line_z6", layer: "river_z6_imp1", width: ["interpolate", ["linear"], ["zoom"], 6, 1, 8, 2] },
       { id: "river_line_z8_imp2", layer: "river_z8_imp2", width: ["interpolate", ["linear"], ["zoom"], 7, 0.5, 10, 2], opacity: ["interpolate", ["linear"], ["zoom"], 7, 0, 7.5, 1] },
        { id: "river_line_z8_imp1", layer: "river_z8_imp1", width: ["interpolate", ["linear"], ["zoom"], 8, 2, 10, 3] },
        { id: "river_line_z10_imp3", layer: "river_z10_imp3", width: ["interpolate", ["linear"], ["zoom"], 9, 0.5, 11, 1.5], opacity: ["interpolate", ["linear"], ["zoom"], 9, 0, 9.5, 1] },
        { id: "river_line_z10_imp2", layer: "river_z10_imp2", width: ["interpolate", ["linear"], ["zoom"], 10, 2, 11, 2.5] },
        { id: "river_line_z10_imp1", layer: "river_z10_imp1", width: ["interpolate", ["linear"], ["zoom"], 10, 3, 11, 3.5] },
        { id: "river_line_z11_imp3", layer: "river_z11_imp3", width: ["interpolate", ["linear"], ["zoom"], 11, 1.5, 12, 2] },
        { id: "river_line_z11_imp2", layer: "river_z11_imp2", width: ["interpolate", ["linear"], ["zoom"], 11, 2.5, 12, 3] },
        { id: "river_line_z11_imp1", layer: "river_z11_imp1", width: ["interpolate", ["linear"], ["zoom"], 11, 3.5, 12, 4] },
        { id: "river_line_z12_imp3", layer: "river_z12_imp3", width: ["interpolate", ["linear"], ["zoom"], 12, 2, 13, 2.5] },
        { id: "river_line_z12_imp2", layer: "river_z12_imp2", width: ["interpolate", ["linear"], ["zoom"], 12, 3, 13, 3.5] },
        { id: "river_line_z12_imp1", layer: "river_z12_imp1", width: ["interpolate", ["linear"], ["zoom"], 12, 4, 13, 4.5] },
        { id: "river_line_z13_imp4", layer: "river_z13_imp4", width: ["interpolate", ["linear"], ["zoom"], 13, 1.5, 14, 2] },
        { id: "river_line_z13_imp3", layer: "river_z13_imp3", width: ["interpolate", ["linear"], ["zoom"], 13, 2.5, 14, 3] },
        { id: "river_line_z13_imp2", layer: "river_z13_imp2", width: ["interpolate", ["linear"], ["zoom"], 13, 3.5, 14, 4] },
        { id: "river_line_z13_imp1", layer: "river_z13_imp1", width: ["interpolate", ["linear"], ["zoom"], 13, 4.5, 14, 5] },
        { id: "river_line_z14_imp3", layer: "river_z14_imp3", width: ["interpolate", ["linear"], ["zoom"], 14, 3, 15, 3.5] },
        { id: "river_line_z14_imp2", layer: "river_z14_imp2", width: ["interpolate", ["linear"], ["zoom"], 14, 4, 15, 4.5] },
        { id: "river_line_z14_imp1", layer: "river_z14_imp1", width: ["interpolate", ["linear"], ["zoom"], 14, 5, 15, 5.5] },
        { id: "river_line_z14_imp5", layer: "river_z14_imp5", width: ["interpolate", ["linear"], ["zoom"], 13, 0.5, 15, 1.5], opacity: ["interpolate", ["linear"], ["zoom"], 13, 0, 13.5, 1] },
        { id: "river_line_z14_imp4", layer: "river_z14_imp4", width: ["interpolate", ["linear"], ["zoom"], 14, 2, 15, 2.5] }

    ];


const containerPaul = window.parent.document.getElementById('hydro-layers-list');
if (containerPaul) {
    containerPaul.innerHTML = '';
    configCouchesHydro.forEach(item => {
        containerPaul.innerHTML += `
            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px; font-size: 0.8rem;">
                <input type="checkbox" class="sub-hydro-checkbox" data-layer-id="${item.id}">
                <label style="font-weight: normal; margin-bottom:0; cursor: pointer;">${item.id}</label>
            </div>
        `;
    });
}


const map = new maplibregl.Map({
  container: 'map',
  style: CarteFacile.mapStyles.simple,
  center: [2.35, 48.85],
  zoom: 8,
  minZoom: 5,
  maxZoom: 21,

});

window.mapV55 = map;


function majbouton(btn) {
    if (btn && btn.classList.contains('on')) {
        parametresModifies = true;
        let langueActuelle = document.body.classList.contains('lang-en') ? 'en' : 'fr';
        const texteMaj = btn.getAttribute(`data-${langueActuelle}-maj`);
        if (texteMaj) {
            btn.textContent = texteMaj;
        }

        btn.classList.add('needs-update'); 
    }
}
const sections = ['#ui-ancre'];
sections.forEach(selector => {
    const container = document.querySelector(selector);
    if (!container) return;

    const boutonsDeLaSection = container.querySelectorAll('button');
    const inputsDeLaSection = container.querySelectorAll('input');

    inputsDeLaSection.forEach(input => {
        input.addEventListener('input', () => {
            boutonsDeLaSection.forEach(btn => {
                if (btn.classList.contains('on')) {
                    majbouton(btn); 
                }
            });
        });
    });
});


map.on('load', () => {
    map.addLayer({
        id: "film_ancre",
        type: "background",
        layout: {
            visibility: "none"
        },
        paint: {
            "background-color": "#5e5e5e",
            "background-opacity": 0
        }
    });
    map.addSource('river', {
        type: 'vector',
        tiles: [
            'https://lostinzoom.huma-num.fr/vtiles/river_z8_imp1,river_z10_imp1,river_z11_imp1,river_z12_imp1,river_z13_imp1,river_z14_imp1/{z}/{x}/{y}'
        ]
    });
    const toutesLesCouches = map.getStyle().layers;


    toutesLesCouches.forEach(layer => {
        const estUneRoute = layer.metadata && layer.metadata['cartefacile:group'] === 'streets';
        if (estUneRoute && layer.type === 'line') {
            let typeSpecifique = null;
            const idLower = layer.id.toLowerCase();
            if (idLower.includes('autoroute')) map.setPaintProperty(layer.id, 'line-color', '#ddc977');
            if (idLower.includes('autoroute')) typeSpecifique = 'autoroute';
            if (idLower.includes('regionale')) typeSpecifique = 'regionale';
            if (idLower.includes('principale')) typeSpecifique = 'principale';


            if (typeSpecifique) {
                const new_id = layer.id + '_ancre';
                const coucheOriginale = map.getLayer(layer.id);

                if (coucheOriginale) {
                    map.addLayer({
                        id: new_id,
                        type: 'line',
                        source: coucheOriginale.source,
                        'source-layer': coucheOriginale.sourceLayer,
                        filter: map.getFilter(layer.id), 
                        layout: {
                            'visibility': 'none', 
                            'line-cap': map.getLayoutProperty(layer.id, 'line-cap') || 'butt',
                            'line-join': map.getLayoutProperty(layer.id, 'line-join') || 'miter'
                        },
                        paint: {
                            'line-color': '#ff0000', 
                            'line-width': map.getPaintProperty(layer.id, 'line-width') || 2
                        },
                        maxzoom: 16
                    });

                    couchesRoutes.push({ new_id: new_id, type: typeSpecifique,minzoom: coucheOriginale.minzoom, maxzoom: coucheOriginale.maxzoom });
                }
            }
        }
    });

    configCouchesHydro.forEach(cfg => {

        const idMiroir = cfg.id + '_ancre';
        let paintStyle = {
            'line-color': '#003cff',
            'line-width': cfg.width
        };
        if (cfg.opacity) {
            paintStyle['line-opacity'] = cfg.opacity;
        }
        map.addLayer({
            id: idMiroir,
            type: 'line',
            source: 'river',
            'source-layer': cfg.layer,
            layout: {
                'visibility': 'none', 
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: paintStyle
        });
        couchesHydroPaul.push({ new_id: idMiroir, id_origine: cfg.id, type: 'hydro', minzoom: cfg.minzoom?.minzoom ?? 0, maxzoom: cfg.maxzoom?.maxzoom ?? 24 });
    })




    toponymesAll.forEach(idOrigine => {
        const coucheOriginale = map.getLayer(idOrigine);

        if (coucheOriginale) {
            const new_id = idOrigine + '_ancre';

            map.addLayer({
                id: new_id,
                type: 'symbol',
                source: coucheOriginale.source,
                'source-layer': coucheOriginale.sourceLayer,
                minzoom: coucheOriginale.minzoom,
                maxzoom: coucheOriginale.maxzoom,
                filter: map.getFilter(idOrigine), 
                layout: {
                    'visibility': 'none', 
                    'symbol-placement': map.getLayoutProperty(idOrigine, 'symbol-placement')?? 'point',
                    'text-field': map.getLayoutProperty(idOrigine, 'text-field')?? ['get', 'texte'],
                    'text-size': map.getLayoutProperty(idOrigine, 'text-size')?? 12,
                    'text-anchor': map.getLayoutProperty(idOrigine, 'text-anchor')?? 'center',
                    'text-font': map.getLayoutProperty(idOrigine, 'text-font')?? ['Open Sans Regular'],
                    'text-justify': map.getLayoutProperty(idOrigine, 'text-justify')?? 'center',
                    'text-offset': map.getLayoutProperty(idOrigine, 'text-offset')?? [0, 0],
                    'text-padding': map.getLayoutProperty(idOrigine, 'text-padding')?? 2
                },
                paint: {
                    'text-color': '#000000',            
                    'text-halo-color': '#ffffff',       
                    'text-halo-width': 3,               
                    'text-halo-blur': 4                 
                }
            });

            couchesToponymes.push({ 
                        id_origine: idOrigine, 
                        new_id: new_id, 
                        type: 'toponyme',
                        minzoom: coucheOriginale.minzoom,
                        maxzoom: coucheOriginale.maxzoom
                    });

        }
    });
    
    // const coucheHydroIGN = map.getLayer('toponyme - hydro lineaire 4');
    // console.log("Source d'origine :", coucheHydroIGN.source, " | Source-Layer :", coucheHydroIGN.sourceLayer);
    // if (coucheHydroIGN) {
    //     map.addLayer({
    //             id: 'toponyme_hydro_lin_ancre',
    //             type: 'line', 
    //             source: coucheHydroIGN.source,
    //             'source-layer': coucheHydroIGN.sourceLayer,
    //           //  filter: ['literal', false], 
    //             layout: {
    //             //    'visibility': 'none',
    //                 'line-join': 'round',
    //                 'line-cap': 'round'
    //             },
    //             paint: {
    //                 'line-color': '#0000ff',
    //                 'line-width': 2          
    //             }
    //         });

    //     couchesHydroIGN.push({ new_id: 'toponyme_hydro_lin_ancre', type: 'hydro-ign',minzoom: coucheOriginale.minzoom, maxzoom: coucheOriginale.maxzoom  });
    // }


});


function visibilityCouche(couches, input, proprieteCouleur = 'line-color') {
    couches.forEach(couche => {
        if (!map.getLayer(couche.new_id)) return;

        let inputAssocie = Array.from(input).find(i => i.value === couche.type);
        if (!inputAssocie && input.length > 0) inputAssocie = input[0];

        if (inputAssocie && inputAssocie.checked && animationEnCours) {
            if (couche.type === 'toponyme') {
                const subCheckbox = window.parent.document.querySelector(`.sub-topo-checkbox[data-layer-id="${couche.id_origine}"]`);
                if (subCheckbox && !subCheckbox.checked) {
                    map.setLayoutProperty(couche.new_id, 'visibility', 'none');
                    return; 
            }}
            if (couche.type === 'hydro') {
                const subCheckbox = window.parent.document.querySelector(`.sub-hydro-checkbox[data-layer-id="${couche.id_origine}"]`);
                if (subCheckbox && !subCheckbox.checked) {
                    map.setLayoutProperty(couche.new_id, 'visibility', 'none');
                    console.log(couche.new_id)
                    return; 
                }
            }

            // if (couche.type === 'hydro-ign') {
            //     const typosCochees = Array.from(window.parent.document.querySelectorAll('.sub-hydroign-checkbox:checked'))
            //                               .map(cb => cb.getAttribute('data-typo-id'));
                
            //     if (typosCochees.length === 0) {
            //         map.setLayoutProperty(couche.new_id, 'visibility', 'none');
            //         return;
            //     } else {
            //         //map.setFilter(couche.new_id, ['match', ['get', 'text_typo'], typosCochees, true, false]);
            //     }
            // }
            const minZoomInput = window.parent.document.getElementById('minzoom-' + couche.type);
            const maxZoomInput = window.parent.document.getElementById('maxzoom-' + couche.type);

            const minZoomUser = minZoomInput ? parseFloat(minZoomInput.value) : 0;
            const maxZoomUser = maxZoomInput ? parseFloat(maxZoomInput.value) : 24;

            const minZoomNative = couche.minzoom ?? 0;
            const maxZoomNative = couche.maxzoom ?? 24;    

            const minZoomFinal = Math.max(minZoomUser, minZoomNative); 
            const maxZoomFinal = Math.min(maxZoomUser, maxZoomNative);


            map.setLayerZoomRange(couche.new_id, minZoomFinal, maxZoomFinal);
            map.setLayoutProperty(couche.new_id, 'visibility', 'visible');

            let idCouleur = 'couleur-' + inputAssocie.id.split('-')[1];

            const color = window.parent.document.getElementById(idCouleur);
            if (color) {
                map.setPaintProperty(couche.new_id, proprieteCouleur, color.value);
            }
        } else {
            map.setLayoutProperty(couche.new_id, 'visibility', 'none');
        }
    });
}

function showAncre(on = true) {
    if (!on) {
        map.setLayoutProperty("film_ancre", "visibility", "none");
        map.setPaintProperty('film_ancre', 'background-opacity', 0);
        progressionTemps = 0;
        animationEnCours = false;
        visibilityCouche(couchesRoutes, inputsRoutes, 'line-color');
        visibilityCouche(couchesToponymes, inputsToponymes, 'text-color');
        visibilityCouche(couchesHydroPaul, inputsHydro, 'line-color');
        // visibilityCouche(couchesHydroIGN, inputsHydro, 'line-color');
        return;
    }

    map.setLayoutProperty("film_ancre", "visibility", "visible");
    if (ancreProgress === "desactiver") {
        map.setPaintProperty('film_ancre', 'background-opacity', opaciteAncre);
    } else {
        const limiteMontage = Math.min(0.5, animationFilmTemps / 100);
        let opaciteDynamique = 0;
        if (progressionTemps <= limiteMontage) {
            opaciteDynamique = (progressionTemps / limiteMontage) * opaciteAncre;
        } else if (progressionTemps >= (1 - limiteMontage)) {
            let distanceFin = (1 - progressionTemps) / limiteMontage;
            opaciteDynamique = distanceFin * opaciteAncre;
        } else {
            opaciteDynamique = opaciteAncre;
        }
        opaciteDynamique = Math.max(0, Math.min(opaciteAncre, opaciteDynamique));
        map.setPaintProperty('film_ancre', 'background-opacity', opaciteDynamique);
    }

    visibilityCouche(couchesRoutes, inputsRoutes, 'line-color');
    visibilityCouche(couchesToponymes, inputsToponymes, 'text-color');
    visibilityCouche(couchesHydroPaul, inputsHydro, 'line-color');
    // visibilityCouche(couchesHydroIGN, inputsHydro, 'line-color');
}

btnAncre.addEventListener('click', () => {
    if (btnAncre.classList.contains('needs-update')) {
        btnAncre.classList.remove('needs-update');
        let langueActuelle = document.body.classList.contains('lang-en') ? 'en' : 'fr';
        btnAncre.textContent = langueActuelle === 'fr' ? 'Activé' : 'Enabled';

        opaciteAncre = parseFloat(inputOpacite.value);
        blancGris = parseFloat(inputBlancGris.value);
        vitesseAnimation = parseFloat(inputVitesseAnimation.value);
        moletteAncre = parseFloat(inputMoletteAncre.value);
        animationFilmTemps = parseFloat(inputAnimationFilm.value);
        map.setPaintProperty('film_ancre', 'background-color', `rgb(${blancGris}, ${blancGris}, ${blancGris})`);
        map.scrollZoom.disable();
        

        return; 
    }
    ancre = !ancre;
    ancreProgress =  window.parent.document.querySelector('input[name="ancre-active"]:checked').value;

    if (btnAncre.classList.contains('off')) {
        let langueActuelle = document.body.classList.contains('lang-en') ? 'en' : 'fr';
        btnAncre.textContent = langueActuelle === 'fr' ? 'Activé' : 'Enabled';
        btnAncre.classList.replace('off', 'on');
        opaciteAncre = parseFloat(inputOpacite.value);
        blancGris = parseFloat(inputBlancGris.value);
        vitesseAnimation = parseFloat(inputVitesseAnimation.value);
        moletteAncre = parseFloat(inputMoletteAncre.value);
        animationFilmTemps = parseFloat(inputAnimationFilm.value);
        map.setPaintProperty('film_ancre', 'background-color', `rgb(${blancGris}, ${blancGris}, ${blancGris})`);
        map.scrollZoom.disable();


    } else {
        let langueActuelle = document.body.classList.contains('lang-en') ? 'en' : 'fr';
        btnAncre.textContent =langueActuelle === 'fr' ? 'Désactivé' : 'Disabled';
        btnAncre.classList.replace('on', 'off');
        map.scrollZoom.enable();

    }
});
map.on('zoom', () => {
    const zRaw = map.getZoom();

    window.parent.document.getElementById('zoom-indicator').innerHTML = `
        Zoom MapLibre : ${zRaw.toFixed(2)}<br>
    `;
});







map.getCanvas().addEventListener('wheel', (e) => {

    if (!ancre) return; 
    console.log('molette détectée');
    if (animationEnCours) return;
    console.log("pas d'animatione")
    e.preventDefault(); 
    animationEnCours = true;

    const deltaZoom = e.deltaY < 0 ? moletteAncre : -moletteAncre;
    const zoomCible = map.getZoom() + deltaZoom;

    if (zoomCible < 0 || zoomCible > 24) return;
    const rect = map.getCanvas().getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;    
    const coordonneesSouris = map.unproject([mouseX, mouseY]);

    showAncre();
    
    console.log("animation start")
    
    map.easeTo({
        zoom: zoomCible,
        duration: vitesseAnimation*1000, 
        around: coordonneesSouris,  
        easing: (t) => {
                    progressionTemps = t; 
                    return t * (2 - t);   
                }   
    });

}, { passive: false });

map.on('render', () => {
    if (animationEnCours && ancreProgress !== "desactiver") {
        showAncre(true);
    }
});

map.on('moveend', () => {
    if (ancre) {
        console.log("animation end");
        animationEnCours = false;
        showAncre(false);

    }
});

