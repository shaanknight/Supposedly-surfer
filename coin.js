/// <reference path="webgl.d.ts" />

let coin = class {
    constructor(gl,pos,col1,col2,radius,ezz,k){
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.positionBuffer);
        this.pos = pos;

        var n = 20;
        this.nlen = n;
        
        this.positions = [];

        var ang = (2*3.14159/n)*k;

        for(var i = 0; i < n; ++i)
        {   
            this.positions.push(radius*Math.sin(ang*(i+1)),radius*Math.cos(ang*(i+1)),-ezz);
            this.positions.push(radius*Math.sin(ang*(i)),radius*Math.cos(ang*(i)),-ezz);
            this.positions.push(radius*Math.sin(ang*(i)),radius*Math.cos(ang*(i)),ezz);
        
            this.positions.push(radius*Math.sin(ang*(i+1)),radius*Math.cos(ang*(i+1)),ezz);
            this.positions.push(radius*Math.sin(ang*(i)),radius*Math.cos(ang*(i)),ezz);
            this.positions.push(radius*Math.sin(ang*(i)),radius*Math.cos(ang*(i)),-ezz);    
        }

        for(var i = 0; i < n; ++i)
        {   
            this.positions.push(radius*Math.sin(ang*(i+1)),radius*Math.cos(ang*(i+1)),-ezz);
            this.positions.push(radius*Math.sin(ang*(i)),radius*Math.cos(ang*(i)),-ezz);
            this.positions.push(0,0,-ezz);
        
            this.positions.push(radius*Math.sin(ang*(i+1)),radius*Math.cos(ang*(i+1)),ezz);
            this.positions.push(radius*Math.sin(ang*(i)),radius*Math.cos(ang*(i)),ezz);
            this.positions.push(0,0,ezz);
        }

        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.positions),gl.STATIC_DRAW);

        this.faceColors = [
            col1,
            col2,
        ];

        var colors = [];

        for(var i = 0; i < n; ++i)
        {
            const c = this.faceColors[0];
            const c1 = this.faceColors[1];

            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c1,c,c1,c);
            colors = colors.concat(c1,c,c1,c);
            colors = colors.concat(c1,c1,c1,c1);
            colors = colors.concat(c1,c1,c1,c1);
        }

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);

        this.indices = [];
        for(var i = 0; i < 4*n; ++i)
        {
            this.indices.push(3*i);
            this.indices.push(3*i+1);
            this.indices.push(3*i+2);
        }

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.indices),gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            color: colorBuffer,
            indices: indexBuffer,
        };

        this.rotation = 0;
    }

    drawCoin(gl, projectionMatrix, programInfo, deltaTime) {
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
            [0, 1, 0]);

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
            const vertexCount = 12*this.nlen;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
};

