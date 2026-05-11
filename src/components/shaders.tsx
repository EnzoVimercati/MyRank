import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export function Shader(){
    return (
         <div className='gradient'>   <ShaderGradientCanvas style={{ pointerEvents: 'none' }}>
<ShaderGradient
  animate="on"
  brightness={1.2}
  cAzimuthAngle={180}
  cDistance={3.6}
  cPolarAngle={90}
  cameraZoom={1}
  color1="#ff5005"
  color2="#000000"
  color3="#ff5005"
  envPreset="city"
  grain="on"
  lightType="3d"
  positionX={-1.4}
  positionY={0}
  positionZ={0}
  rotationX={0}
  rotationY={10}
  rotationZ={50}
/>
</ShaderGradientCanvas></div>
    )
}