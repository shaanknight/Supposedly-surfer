/// <reference path="webgl.d.ts" />

let cylinder = class {
    constructor(gl, pos, col1, col2, exx, eyy, ezz) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        var n = 20;
        this.nlen = n;

        this.positions = [];

        for(var i = 0; i < 18*n; ++i)
            this.positions.push(0.0);

        var ang = 2*3.14159/n;
        var ind = 0,cx , cy, cz;

        for(var i = 0; i < n; ++i)
        {
            cx = exx*Math.cos(ang)-ezz*Math.sin(ang);
            cz = exx*Math.sin(ang)+ezz*Math.cos(ang);

            this.positions[ind++] =  exx;
            this.positions[ind++] = -eyy;
            this.positions[ind++] =  ezz;

            this.positions[ind++] =  exx;
            this.positions[ind++] =  eyy;
            this.positions[ind++] =  ezz;

            this.positions[ind++] =  cx;
            this.positions[ind++] =  eyy;
            this.positions[ind++] =  cz;

            this.positions[ind++] =  exx;
            this.positions[ind++] = -eyy;
            this.positions[ind++] =  ezz;

            this.positions[ind++] =  cx;
            this.positions[ind++] = -eyy;
            this.positions[ind++] =  cz;

            this.positions[ind++] =  cx;
            this.positions[ind++] =  eyy;
            this.positions[ind++] =  cz;

            exx = cx;
            ezz = cz;

        }

             
        this.rotation = 0;

        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        this.faceColors = [
            col1,
            col2,
        ];

        var colors = [];



        for (var j = 0; j < n; ++j) {
            const c = this.faceColors[0];
            const c1 = this.faceColors[1];

            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c1, c, c, c1, c, c);
        }

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        this.indices = [];

        for(var i = 0; i < n ; ++i)
        {
            this.indices.push(6*i);
            this.indices.push(6*i+1);
            this.indices.push(6*i+2);
            this.indices.push(6*i+3);
            this.indices.push(6*i+4);
            this.indices.push(6*i+5);
        }

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            color: colorBuffer,
            indices: indexBuffer,
        }

    }

    drawCylinder(gl, projectionMatrix, programInfo, deltaTime) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        
        this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [0, 0, 0]);

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
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.color);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
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

        {
            const vertexCount = 6*this.nlen;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
};