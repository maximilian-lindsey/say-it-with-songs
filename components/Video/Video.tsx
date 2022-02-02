type VideoProps = {
  src: string;
  width: number;
  height: number;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export const Video = (props: VideoProps) => (
  <video
    src={props.src}
    width={props.width}
    height={props.height}
    controls={props.controls}
    autoPlay={props.autoPlay}
    loop={props.loop}
    muted={props.muted}
  />
);
