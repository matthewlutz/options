import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';




function GreekModel({ selectedOption, selectedGreek, selectedCustoms }) {
    const mount = useRef(null);

    const textOptionsSmall = useRef({
        font: null, 
        size: 3,
        height: 0.001,
    });
    const textOptions = useRef({
        font: null, 
        size: 5,
        height: 0.001,
    });

    useEffect(() => {
        if (!selectedOption) {
            console.log('No selected option');
            return;
        }
        

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(35, 50, 110);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const width = mount.current.clientWidth;
        const height = mount.current.clientHeight;
        renderer.setSize(width, height);
        mount.current.appendChild(renderer.domElement);

        const fontLoader = new FontLoader();
        fontLoader.load('fonts.json', function (font) {
            textOptions.current.font = font;
            textOptionsSmall.current.font = font;

            // Create text geometry for the axis labels
            const xAxisGeo = new TextGeometry('Price', textOptions.current);
            const yAxisGeo = new TextGeometry(selectedGreek, textOptions.current);
            const zAxisGeo = new TextGeometry('DTE', textOptions.current);        

            // Material for the text
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

            // Create mesh with geometry and material
            const xAxisMesh = new THREE.Mesh(xAxisGeo, textMaterial);
            const yAxisMesh = new THREE.Mesh(yAxisGeo, textMaterial);
            const zAxisMesh = new THREE.Mesh(zAxisGeo, textMaterial);

            zAxisMesh.rotation.x = -Math.PI / 2;
            zAxisMesh.rotation.z = Math.PI / 2;
            xAxisMesh.rotation.x = -Math.PI / 2;
            

            // Position the axis labels
            xAxisMesh.position.set(15, 0, 75);
            yAxisMesh.position.set(0, 62, -5);
            zAxisMesh.position.set(70, 0, 30);

            // Add axis labels to the scene
            scene.add(xAxisMesh);
            scene.add(yAxisMesh);
            scene.add(zAxisMesh);
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        scene.add(new THREE.AmbientLight(0x404040));

        const fetchGreeksData = async () => {
            try {
                const params = new URLSearchParams({
                    optionType: selectedOption.optionType,
                    underlyingPrice: selectedOption.underlyingPrice,
                    strike: selectedOption.strike,
                    expirationDate: selectedOption.expirationDate,
                    impliedVolatility: selectedOption.impliedVolatility,
                    priceDelta: selectedCustoms.priceDelta,
                    interestRate: selectedCustoms.interestRate,
                });
                console.log(params.toString());
                const response = await fetch(`http://localhost:8000/api/get-greeks/?${params.toString()}`, {
                    method: 'GET', 
                    headers: { 'Accept': 'application/json' },
                });
                const data = await response.json();
                console.log(data);
                visualizeGreeks(data, selectedGreek);
            } catch (error) {
                
                console.error('Error fetching Greeks data:', error);
            }
        };

        const mapValueToAxis = (value, [minValue, maxValue], [minAxis, maxAxis]) => {
            return ((value - minValue) / (maxValue - minValue)) * (maxAxis - minAxis) + minAxis;
        };
        
        
        const visualizeGreeks = (data, selectedGreek) => {
            const { greeksData, priceRange, expiration_range } = data;
            const maxPrice = Math.max(...priceRange);
            const maxDTE = Math.max(...expiration_range);
            const minPrice = Math.min(...priceRange);
            const minDTE = Math.min(...expiration_range);
            const maxGreekValue = Math.max(...greeksData.map(greek => greek[selectedGreek]));

            const calculateMean = array => array.reduce((sum, value) => sum + value, 0) / array.length;

            const meanPrice = calculateMean(priceRange);
            const meanDTE = calculateMean(expiration_range);
            //const minGreekValue = Math.min(...greeksData.map(greek => greek[selectedGreek]));

            const minDTEgeo = new TextGeometry(`${minDTE.toFixed(2)}`, textOptionsSmall.current);
            const maxDTEgeo = new TextGeometry(`${maxDTE.toFixed(2)}`, textOptionsSmall.current);
            const maxPricegeo = new TextGeometry(`${maxPrice.toFixed(2)}`, textOptionsSmall.current);
            const minPricegeo = new TextGeometry(`${minPrice.toFixed(2)}`, textOptionsSmall.current);
            const maxGreekgeo = new TextGeometry(`${maxGreekValue.toFixed(2)}`, textOptionsSmall.current);
            const midPricegeo = new TextGeometry(`${meanPrice.toFixed(2)}`, textOptionsSmall.current);
            const midDTEgeo = new TextGeometry(`${meanDTE.toFixed(2)}`, textOptionsSmall.current);
            //const minGreekgeo = new TextGeometry(minGreekValue, textOptions.current);

            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

            
            const minDTELabelMesh = new THREE.Mesh(minDTEgeo, textMaterial);
            const maxDTELabelMesh = new THREE.Mesh(maxDTEgeo, textMaterial);
            const maxPriceLabelMesh = new THREE.Mesh(maxPricegeo, textMaterial);
            const minPriceLabelMesh = new THREE.Mesh(minPricegeo, textMaterial);
            const meanPriceLabelMesh = new THREE.Mesh(midPricegeo, textMaterial);
            const meanDTELabelMesh = new THREE.Mesh(midDTEgeo, textMaterial);
            //const minGreekLabelMesh = new THREE.Mesh(minGreekgeo, textMaterial);
            const maxGreekLabelMesh = new THREE.Mesh(maxGreekgeo, textMaterial);


            maxDTELabelMesh.rotation.x = -Math.PI / 2;
            meanDTELabelMesh.rotation.x = -Math.PI / 2;
            minDTELabelMesh.rotation.x = -Math.PI / 2;
            minPriceLabelMesh.rotation.x = -Math.PI / 2;
            meanPriceLabelMesh.rotation.x = -Math.PI / 2;
            maxPriceLabelMesh.rotation.x = -Math.PI / 2;
            maxPriceLabelMesh.rotation.z =  Math.PI / 2;
            minPriceLabelMesh.rotation.z = Math.PI / 2;
            meanPriceLabelMesh.rotation.z = Math.PI / 2;
            
            


            minDTELabelMesh.position.set(52, 0, 3);
            meanDTELabelMesh.position.set(52, 0, 25);
            maxDTELabelMesh.position.set(52, 0, 48);
            maxPriceLabelMesh.position.set(48, 0, 65);
            minPriceLabelMesh.position.set(3, 0, 65);
            meanPriceLabelMesh.position.set(25, 0, 65);
            //minGreekLabelMesh.position.set(0, 5, 10);
            maxGreekLabelMesh.position.set(0, 55, -5);

            scene.add(minDTELabelMesh);
            scene.add(maxDTELabelMesh);
            scene.add(maxPriceLabelMesh);
            scene.add(maxGreekLabelMesh);
            scene.add(minPriceLabelMesh);
            scene.add(minPriceLabelMesh);
            scene.add(meanPriceLabelMesh);
            scene.add(meanDTELabelMesh);

            
            const zOffset = maxDTE;
            const xOffset = maxPrice;

            const graphScale = 50; 

            // xz grid
            const gridHelperXZ = new THREE.GridHelper(graphScale, 10);
            gridHelperXZ.position.set(graphScale / 2, 0, graphScale / 2); // Center at the origin of Quadrant I.
            scene.add(gridHelperXZ);

            // xy grid
            const gridHelperXY = new THREE.GridHelper(graphScale, 10);
            gridHelperXY.rotation.x = Math.PI / 2; // Rotate 90 degrees to align with the (x, y) plane
            gridHelperXY.position.set(graphScale / 2, graphScale / 2, 0); // Position at the center of the grid on the (x, y) plane
            scene.add(gridHelperXY);

            // zy grid
            const gridHelperZY = new THREE.GridHelper(graphScale, 10);
            gridHelperZY.rotation.z = Math.PI / 2; // Rotate 90 degrees to align with the (z, y) plane
            gridHelperZY.position.set(0, graphScale / 2, graphScale / 2); // Position at the center of the grid on the (z, y) plane
            scene.add(gridHelperZY);
            const axesHelper = new THREE.AxesHelper(graphScale);
            scene.add(axesHelper);

            const geometry = new THREE.BufferGeometry();
            //const positions = new Float32Array(greeksData.length * 3);

            let positions = [];
            let indices = []; 
            let colors = [];
            let vertexIndex = 0;

            for (let i = 0; i < greeksData.length; i++) {
                const greek = greeksData[i];
        
                // Map price and DTE to graphScale.
                const x = mapValueToAxis(greek.underlying_price, [minPrice, maxPrice], [0, graphScale]) - mapValueToAxis(minPrice, [minPrice, maxPrice], [0, graphScale]);
                const z = mapValueToAxis(greek.days_to_expiration, [minDTE, maxDTE], [0, graphScale]) - mapValueToAxis(minDTE, [minDTE, maxDTE], [0, graphScale]);
                const y = (greek[selectedGreek]/ maxGreekValue) * graphScale; 

                const normalizedGreekValue = greek[selectedGreek] / maxGreekValue;

                const color = new THREE.Color(1, 1, 1);
                color.lerp(new THREE.Color(0, 1, 0), normalizedGreekValue);              
                colors.push(color.r, color.g, color.b);
                positions.push(x, y, z);

                let rowLength = 15;
                let colLength = 15;

                if (i % rowLength > 0 && i >= colLength) {
                    indices.push(
                        vertexIndex - 1, vertexIndex - rowLength - 1, vertexIndex - rowLength,
                        vertexIndex - 1, vertexIndex - rowLength, vertexIndex
                    );
                }

                vertexIndex++;
            }

            geometry.setIndex(indices);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); 
            geometry.computeVertexNormals();

            // Material for the mesh.
            const material = new THREE.MeshPhongMaterial({
                //color: 0x156289,
                emissive: 0x072534,
                side: THREE.DoubleSide,
                flatShading: true,
                vertexColors: true,
            });

            // Create the mesh and add it to the scene.
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        };

        // Update controls and render
        controls.update();
        renderer.render(scene, camera);
        

        fetchGreeksData();

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (renderer) renderer.dispose();
            if (mount.current) mount.current.removeChild(renderer.domElement);
        };
    }, [selectedOption, selectedGreek, selectedCustoms]);

    return <div ref={mount} style={{ width: '100%', height: '100vh' }} />;

}


export default GreekModel;