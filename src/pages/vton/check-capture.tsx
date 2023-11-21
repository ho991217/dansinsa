import { useUserImgSrc } from ".";

export default function CheckCapture() {
  const { userImgSrc } = useUserImgSrc();
  return (
    <div>
      <img src={userImgSrc} />
    </div>
  );
}
