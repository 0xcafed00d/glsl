#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, - s, s, c);
	return m * v;
}

void main() {
	vec2 p = (gl_FragCoord.xy / u_resolution) + vec2(0.5, 0.5);
	
	float t = u_time * 3.0;
	p = rotate(p, 0.4 + t / 24.0);
	float r = cos(p.x * 8.0 + t) + sin(p.y * 6.0 + t);
	p = rotate(p, 0.7 + t / 14.0);
	float g = cos(p.x * 12.0 - t) + sin(p.y * 11.0 + t);
	p = rotate(p, 0.4 - t / 14.0);
	float b = cos(p.x * 7.0 - t) + sin(p.y * 8.0 - t);
	
	r = (r + 2.0) / 4.0;
	g = (g + 2.0) / 4.0;
	b = (b + 2.0) / 4.0;
	
	vec3 rgb = vec3(r, g, b);
	gl_FragColor = vec4(rgb, 1.0);
}
