'use client';

import * as React from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';

interface DesignerCanvasProps {
  text: string;
  image: HTMLImageElement | null;
  stageRef: React.Ref<any>;
}

const DesignerCanvas: React.FC<DesignerCanvasProps> = ({ text, image, stageRef }) => {
  return (
    <Stage width={600} height={600} ref={stageRef}>
      <Layer>
        <Text
          text={text}
          fontSize={40}
          fontFamily="Impact, sans-serif"
          fill="#000000"
          draggable
          x={100}
          y={100}
        />
        {image && (
          <Image
            image={image}
            draggable
            width={200}
            height={200}
            x={150}
            y={150}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default DesignerCanvas;
