#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.14159265359;

mat2 rotate(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, - s, s, c);
}

float positive(float v) {
	if (v < 0.0) {
		return 0.0;
	}
	return v;
}

vec3 hue2rgb(float hue) {
	return clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

void main() {
	vec2 p = (gl_FragCoord.xy / u_resolution) * 2.0 - vec2(1.0, 1.0);
	
	float a = atan(p.x, p.y) / (2.0 * PI);
	vec3 rgb = hue2rgb(a + u_time / 10.0);
	
	gl_FragColor = vec4(rgb, length(p)) * step(length(p), 1.0);
}
