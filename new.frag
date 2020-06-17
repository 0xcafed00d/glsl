#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, - s, s, c);
}

void main() {
	vec2 p = (gl_FragCoord.xy / u_resolution) + vec2(0.5, 0.5);
	
	vec3 rgb = vec3(1.0, 1.0, 1.0);
	gl_FragColor = vec4(rgb, 1.0);
}
