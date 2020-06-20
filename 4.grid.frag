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

vec2 view(vec2 p, vec2 origin, float scale, float rot) {
	scale = 1.0 / scale;
	p -= vec2(origin + scale / 2.0);
	p *= rotate(rot);
	p += vec2(origin + scale / 2.0);
	p = mix(origin - scale / 2.0, origin + scale / 2.0, p);
	return p;
}

vec3 grid(vec2 p, float freq) {
	vec2 mp = mod(p * freq, vec2(1.0, 1.0));
	vec3 rgb = vec3(0.0);
	if (mp.x < 0.04) {
		rgb += vec3(0.0, 1.0, 0.0);
	}
	if (mp.y < 0.04) {
		rgb += vec3(0.0, 0.0, 1.0);
	}
	return rgb;
}

void main() {
	vec2 p = (gl_FragCoord.xy / u_resolution);
	
	p = view(p, vec2(0.0, 0.0), 1.0, u_time / 10.0);
	
	gl_FragColor = vec4(grid(p, 10.0), 1.0);
	
	if (length(p) < 0.03) {
		gl_FragColor += vec4(vec3(1.0, 0.0, 0.0), 1.0);
	}
}
