#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
const float PI = 3.14159265359;
const int MAX_ITER = 70;

vec3 hue2rgb(float hue) {
	hue += fract(u_time / 4.0);
	return clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
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
	
	return hue2rgb(float(n) / float(MAX_ITER));
}

mat2 rotate(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, - s, s, c);
}

vec2 view(vec2 p, vec2 origin, float scale, float rot) {
	scale = 1.0 / scale;
	p = mix(origin - scale / 2.0, origin + scale / 2.0, p);
	return p;
}

void main() {
	vec2 p = (gl_FragCoord.xy / u_resolution); // * 2.0 - vec2(1.0, 1.0);
	
	float s = mix(0.01, 4000.0, pow(fract(u_time / 10.0), 6.0));
	
	p = view(p, vec2(0.015, 0.84926), s, u_time / 40.0);
	
	gl_FragColor = vec4(mandelbrot(p), 1.0);
}
