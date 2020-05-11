/// <reference path="webgl.d.ts" />

let train = class {
    constructor(gl, pos, exx, exy, ezz) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.lgt = 0;
        this.lighton = 0;

        this.positions = [
             // Front face
             -1.0 + exx , -1.0 + exy, 100.0 - ezz,
             1.0 - exx , -1.0 + exy, 100.0 - ezz,
             1.0 - exx, 1.0 - exy, 100.0 - ezz,
             -1.0 + exx, 1.0 - exy, 100.0 - ezz,
             //Back Face
             -1.0 + exx, -1.0 + exy, -100.0 + ezz,
             1.0 - exx, -1.0 + exy, -100.0 + ezz,
             1.0 - exx, 1.0 - exy, -100.0 + ezz,
             -1.0 + exx, 1.0 - exy, -100.0 + ezz,
             //Top Face
             -1.0 + exx, 1.0 - exy, -100.0 + ezz,
             1.0 - exx, 1.0 - exy, -100.0 + ezz,
             1.0 - exx, 1.0 - exy, 100.0 - ezz,
             -1.0 + exx, 1.0 - exy, 100.0 - ezz,
             //Bottom Face
             -1.0 + exx, -1.0 + exy, -100.0 + ezz,
             1.0 - exx, -1.0 + exy, -100.0 + ezz,
             1.0 - exx, -1.0 + exy, 100.0 - ezz,
             -1.0 + exx, -1.0 + exy, 100.0 - ezz,
             //Left Face
             -1.0 + exx, -1.0 + exy, -100.0 + ezz,
             -1.0 + exx, 1.0 - exy, -100.0 + ezz,
             -1.0 + exx, 1.0 - exy, 100.0 - ezz,
             -1.0 + exx, -1.0 + exy, 100.0 - ezz,
             //Right Face
             1.0 - exx, -1.0 + exy, -100.0 + ezz,
             1.0 - exx, 1.0 - exy, -100.0 + ezz,
             1.0 - exx, 1.0 - exy, 100.0 - ezz,
             1.0 - exx, -1.0 + exy, 100.0 - ezz,
        ];

        this.rotation = 0;

        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        // this.faceColors = [
        //     col1,
        //     col2,
        // ];

        // var colors = [];



        // for (var j = 0; j < 6; ++j) {
        //     const c = this.faceColors[0];
        //     const c1 = this.faceColors[1];

        //     // Repeat each color four times for the four vertices of the face
        //     colors = colors.concat(c1, c, c, c);
        // }

        // const colorBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

        const textureCoordinates = [
            // Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);

        this.vertexNormals = [
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,

            // Back
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,

            // Top
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,

            // Bottom
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,

            // Right
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,

            // Left
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0
        ];

        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexNormals),gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        const indices = [
            0, 1, 2,    0, 2, 3, // front
            4, 5, 6,    4, 6, 7,
            8, 9, 10,   8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23, 
        ];

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
            normal: normalBuffer,
        }

    }

    drawTrain(gl, projectionMatrix, programInfo, texture, deltaTime) {
        const modelViewMatrix = mat4.create();

        this.lgt++;
        
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );

        var xx = 16;
        
        this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [0, 0, 0]);

            const normalMatrix = mat4.create();
            //console.log(this.pos[0]);
            if((this.lgt%xx < (xx/2)) && (this.pos[0] == 6 || this.pos[0] == -6) && this.lighton == 1)
            {
                //console.log(this.pos[0]);
                mat4.invert(normalMatrix, modelViewMatrix);
                mat4.transpose(normalMatrix, normalMatrix);
            }

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
            gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoord,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.textureCoord);
        }

        if((this.lgt%xx < (xx/2)) && (this.pos[0] == 6 || this.pos[0] == -6) && this.lighton == 1)
        // Tell WebGL how to pull out the normals from
        // the normal buffer into the vertexNormal attribute.
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexNormal);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        if((this.lgt%xx < (xx/2)) && (this.pos[0] == 6 || this.pos[0] == -6) && this.lighton == 1)
        {
            gl.uniformMatrix4fv(
                    programInfo.uniformLocations.normalMatrix,
                    false,
                    normalMatrix);
        }

        gl.activeTexture(gl.TEXTURE0);

            // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, texture);
          
            // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
};