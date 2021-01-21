import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated, AppRegistry } from 'react-native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';

import { Renderer, THREE } from 'expo-three';
import { GLView } from 'expo-gl';
import { StereoCamera } from 'three';

global.THREE = global.THREE || THREE;

export default function App() {
    const [animTimeout, setAnimTimeout] = useState();
    const [cube, setCube] = useState();
    const [scene, setScene] = useState();
    const [camera, setCamera] = useState();
    const [_renderer, setRenderer] = useState();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center'
        }
    });

    console.log('render');

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Appbar style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                    <Appbar.Action icon="archive" />
                </Appbar>
                <View style={{ flex: 1 }}>
                    <Text>Paina mulq kuutioo!</Text>
                </View>
                <GLView
                    style={{ width: 500, height: 500 }}
                    onClick={() => {
                        if (animTimeout) {
                            cancelAnimationFrame(animTimeout);
                        } else {
                            animate();
                        }
                    }}
                    onContextCreate={create}
                />
            </View>
        </PaperProvider>
    );


    function animate() {
        setAnimTimeout(requestAnimationFrame(animate))
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        _renderer.render(scene, camera);
    }

    function create(gl) {
        console.log('context');

        const _scene = new THREE.Scene();
        const _camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
        const _renderer = new Renderer({ gl });
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const _cube = new THREE.Mesh(geometry, material);

        _scene.add(cube);
        _camera.position.z = 5;

        setRenderer(_renderer);
        setCamera(_camera);
        setScene(_scene);
        setCube(_cube);

        animate();
    }
}

AppRegistry.registerComponent('foo', () => App);