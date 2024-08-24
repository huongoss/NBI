import dynamic from 'next/dynamic'

const Cesium = dynamic(
  () => import('./components/viewer/cesium'),
  { ssr: false }
)

export default function Home() {
  return(
    <Cesium />
  );
}
