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

vec3 grid(vec2 p, float freq) {
	vec2 mp = mod(p * freq, vec2(1.0, 1.0));
	vec3 rgb = vec3(0.0);
	if ((mp.x < 0.04)||(mp.y < 0.04)) {
		rgb = vec3(1.0, 1.0, 1.0);
	}
	return rgb;
}

void main() {
	vec2 p = (gl_FragCoord.xy / u_resolution);
	
	gl_FragColor = vec4(grid(p, 10.0), 1.0);
}
