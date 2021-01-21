
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, THREE } from 'expo-three';

export default () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
        },
    });

    return (
        <View style={styles.container}>
            <GLView
                style={{ flex: 1 }}
                onContextCreate={(gl: ExpoWebGLRenderingContext) => {
                    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
                    camera.position.z = 1;

                    const scene = new THREE.Scene();

                    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
                    const material = new THREE.MeshNormalMaterial();

                    const mesh = new THREE.Mesh(geometry, material);
                    scene.add(mesh);

                    const renderer = new Renderer({ gl, antialias: true });
                    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

                    renderer.setAnimationLoop(time => {
                        mesh.rotation.x = time / 2000;
                        mesh.rotation.y = time / 1000;
                        renderer.render(scene, camera);
                    });
                }}
            />
        </View>
    );
}