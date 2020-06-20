
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture_0;

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rgb2hsv(vec3 c)
{
	vec4 K = vec4(0.0, - 1.0 / 3.0, 2.0 / 3.0, - 1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
	
	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main() {
	vec2 p = (gl_FragCoord.xy / u_resolution);
	vec2 pixstep = vec2(1.0 / 320.0, 0.0);

	vec3 rgb = texture2D(u_texture_0, p).rgb;
	vec3 hsv = rgb2hsv(rgb);

	vec3 rgb1 = texture2D(u_texture_0, p+pixstep).rgb;
	vec3 rgb2 = texture2D(u_texture_0, p+pixstep*2.0).rgb;
	vec3 rgb3 = texture2D(u_texture_0, p+pixstep*3.0).rgb;
	vec3 rgb4 = texture2D(u_texture_0, p+pixstep*4.0).rgb;

	vec3 argb = (rgb + rgb1 + rgb2 + rgb3 + rgb4) / 5.0;
	vec3 ahsv = rgb2hsv(argb);

	hsv[2] = ahsv[2];


	gl_FragColor = vec4(hsv2rgb(hsv), 1.0);
}