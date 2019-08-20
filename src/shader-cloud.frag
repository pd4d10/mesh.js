precision mediump float;

varying vec4 vColor;
varying float flagBackground;

#ifdef TEXTURE
varying float frameIndex;
varying vec2 vTextureCoord;
uniform int u_texFlag;
uniform int u_repeat;
uniform vec4 u_srcRect;
#endif

#ifdef FILTER
uniform int u_filterFlag;
uniform float u_colorMatrix[20];
#endif

#ifdef CLOUDFILTER
uniform int u_cloudFilterFlag;
varying vec4 colorCloud0;
varying vec4 colorCloud1;
varying vec4 colorCloud2;
varying vec4 colorCloud3;
varying vec4 colorCloud4;
#endif

#ifdef GRADIENT
uniform float u_colorSteps[40];
uniform float u_radialGradientVector[6];

void radial_gradient(inout vec4 color, float vector[6], float colorSteps[40]) {
  // center circle
  float cx = vector[0];
  float cy = vector[1];
  float cr = vector[2];
  
  // focal circle
  float fx = vector[3];
  float fy = vector[4];
  float fr = vector[5];

  vec2 center = vec2(cx, cy);
  vec2 focal = vec2(fx, fy);

  float x = focal.x - gl_FragCoord.x;
  float y = focal.y - gl_FragCoord.y;
  float dx = focal.x - center.x;
  float dy = focal.y - center.y;
  float dr = cr - fr;
  
  float a = dx * dx + dy * dy - dr * dr;
  float b = -2.0 * (y * dy + x * dx + fr * dr);
  float c = x * x + y * y - fr * fr;
  float t = 0.5 * (1.0 / a) * (-b + sqrt(b * b - 4.0 * a * c));
  t = 1.0 - t;
  
  vec4 colors[8];
  colors[0] = vec4(colorSteps[1], colorSteps[2], colorSteps[3], colorSteps[4]);
  colors[1] = vec4(colorSteps[6], colorSteps[7], colorSteps[8], colorSteps[9]);
  colors[2] = vec4(colorSteps[11], colorSteps[12], colorSteps[13], colorSteps[14]);
  colors[3] = vec4(colorSteps[16], colorSteps[17], colorSteps[18], colorSteps[19]);
  colors[4] = vec4(colorSteps[21], colorSteps[22], colorSteps[23], colorSteps[24]);
  colors[5] = vec4(colorSteps[26], colorSteps[27], colorSteps[28], colorSteps[29]);
  colors[6] = vec4(colorSteps[31], colorSteps[32], colorSteps[33], colorSteps[34]);
  colors[7] = vec4(colorSteps[36], colorSteps[37], colorSteps[38], colorSteps[39]);
  
  float steps[8];
  steps[0] = colorSteps[0];
  steps[1] = colorSteps[5];
  steps[2] = colorSteps[10];
  steps[3] = colorSteps[15];
  steps[4] = colorSteps[20];
  steps[5] = colorSteps[25];
  steps[6] = colorSteps[30];
  steps[7] = colorSteps[35];
  
  for (int i = 1; i < 8; i++) {
    if (steps[i] <= 0.0 || steps[i] > 1.0) {
      break;
    }
    color = mix(color, colors[i], clamp((t - steps[i - 1]) / (steps[i] - steps[i - 1]), 0.0, 1.0));
  }
}
#endif

void transformColor(inout vec4 color, in float colorMatrix[20]) {
  float r = color.r, g = color.g, b = color.b, a = color.a;
  color[0] = colorMatrix[0] * r + colorMatrix[1] * g + colorMatrix[2] * b + colorMatrix[3] * a + colorMatrix[4];
  color[1] = colorMatrix[5] * r + colorMatrix[6] * g + colorMatrix[7] * b + colorMatrix[8] * a + colorMatrix[9];
  color[2] = colorMatrix[10] * r + colorMatrix[11] * g + colorMatrix[12] * b + colorMatrix[13] * a + colorMatrix[14];
  color[3] = colorMatrix[15] * r + colorMatrix[16] * g + colorMatrix[17] * b + colorMatrix[18] * a + colorMatrix[19];
}

#ifdef CLOUDFILTER
void buildCloudColor(inout float colorCloudMatrix[20]) {
  colorCloudMatrix[0] = colorCloud0[0];
  colorCloudMatrix[1] = colorCloud1[0];
  colorCloudMatrix[2] = colorCloud2[0];
  colorCloudMatrix[3] = colorCloud3[0];
  colorCloudMatrix[4] = colorCloud4[0];

  colorCloudMatrix[5] = colorCloud0[1];
  colorCloudMatrix[6] = colorCloud1[1];
  colorCloudMatrix[7] = colorCloud2[1];
  colorCloudMatrix[8] = colorCloud3[1];
  colorCloudMatrix[9] = colorCloud4[1];

  colorCloudMatrix[10] = colorCloud0[2];
  colorCloudMatrix[11] = colorCloud1[2];
  colorCloudMatrix[12] = colorCloud2[2];
  colorCloudMatrix[13] = colorCloud3[2];
  colorCloudMatrix[14] = colorCloud4[2];

  colorCloudMatrix[15] = colorCloud0[3];
  colorCloudMatrix[16] = colorCloud1[3];
  colorCloudMatrix[17] = colorCloud2[3];
  colorCloudMatrix[18] = colorCloud3[3];
  colorCloudMatrix[19] = colorCloud4[3];
}
#endif

void main() {
  vec4 color = vColor;

#ifdef TEXTURE
  if(u_texFlag > 0 && flagBackground > 0.0) {
    vec2 texCoord = vTextureCoord;

    if(u_repeat == 1) {
      texCoord = fract(texCoord);
    }

    if(texCoord.x <= 1.0 && texCoord.x >= 0.0
      && texCoord.y <= 1.0 && texCoord.y >= 0.0) {
      if(u_srcRect.z > 0.0) {
        texCoord.x = u_srcRect.x + texCoord.x * u_srcRect.z;
        texCoord.y = 1.0 - (u_srcRect.y + (1.0 - texCoord.y) * u_srcRect.w);
      }
      if(frameIndex < 0.0) {
        vec4 texColor = texture2D(u_texSampler, texCoord);
        color = mix(color, texColor, texColor.a);
      } else {
        int index = int(floor(clamp(0.0, 11.0, frameIndex)));
        vec4 texColor;
        if(index == 0) texColor = texture2D(u_texFrame0, texCoord);
        else if(index == 1) texColor = texture2D(u_texFrame1, texCoord);
        else if(index == 2) texColor = texture2D(u_texFrame2, texCoord);
        else if(index == 3) texColor = texture2D(u_texFrame3, texCoord);
        else if(index == 4) texColor = texture2D(u_texFrame4, texCoord);
        else if(index == 5) texColor = texture2D(u_texFrame5, texCoord);
        else if(index == 6) texColor = texture2D(u_texFrame6, texCoord);
        else if(index == 7) texColor = texture2D(u_texFrame7, texCoord);
        else if(index == 8) texColor = texture2D(u_texFrame8, texCoord);
        else if(index == 9) texColor = texture2D(u_texFrame9, texCoord);
        else if(index == 10) texColor = texture2D(u_texFrame10, texCoord);
        else texColor = texture2D(u_texFrame11, texCoord);
        color = mix(color, texColor, texColor.a);
      }
    }
  }
#endif

#ifdef GRADIENT
// r0 > 0 && r1 > 0
  if (u_radialGradientVector[2] > 0.0 || u_radialGradientVector[5] > 0.0) {
    radial_gradient(color, u_radialGradientVector, u_colorSteps);
  }
#endif
/* gradient branch */

/* filter branch */

#ifdef FILTER
  if(u_filterFlag > 0) {
    transformColor(color, u_colorMatrix);
  }
#endif

#ifdef CLOUDFILTER
  if(u_cloudFilterFlag > 0) {
    float colorCloudMatrix[20];
    buildCloudColor(colorCloudMatrix);
    transformColor(color, colorCloudMatrix);
  }
#endif

  gl_FragColor = color;
}