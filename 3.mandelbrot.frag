#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
const float PI = 3.14159265359;
const int MAX_ITER = 80;

vec3 hue(float v) {
	v += u_time / 4.0;
	v = mod(v, 1.0);
	
	if (v < 0.33333333) {
		return mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), v * 3.0);
	}
	if (v < 0.66666666) {
		return mix(vec3(0.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0), (v - 0.3333333) * 3.0);
	}
	return mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), (v - 0.6666666) * 3.0);
}

vec3 mandelbrot(vec2 p) {
	float zx = 0.0;
	float zy = 0.0;
	
	int n = 0;
	
	for(int count = 0; count < MAX_ITER; count ++ ) {
		if ((zx * zx + zy * zy) >= 4.0) {
			n = count;
			break;
		}
		
		// Calculate Mandelbrot function
		// z = z*z + c where z is a complex number
		
		// tempx = z_real*_real - z_imaginary*z_imaginary + c_real
		float tempx = zx * zx - zy * zy + p.x;
		
		// 2*z_real*z_imaginary + c_imaginary
		zy = 2.0 * zx * zy + p.y;
		
		// Updating z_real = tempx
		zx = tempx;
	}
	
	if (n == 0) {
		return vec3(0.0);
	}
	
	return hue(float(n) / float(MAX_ITER));
}

mat2 rotate(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, - s, s, c);
}

vec2 view(vec2 p, vec2 origin, float scale, float rotate) {
	
	return (p / scale + origin / scale);
}

void main() {
	vec2 p = (gl_FragCoord.xy / u_resolution) * 2.0 - vec2(1.0, 1.0);
	//p *= rotate(u_time);
	
	float s = (sin(u_time / 4.0) + 1.0) / 2.0;
	
	//p = view(p, vec2(1.0, 1.0), 1.0, 0.0);
	p = view(p, vec2(mix(0.0, 10.0, s), mix(0.0, 13.0, s)), mix(0.5, 30.0, s), 0.0);
	
	gl_FragColor = vec4(mandelbrot(p), 1.0);
}
