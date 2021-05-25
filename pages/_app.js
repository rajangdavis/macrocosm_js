import dynamic from "next/dynamic";
import '../public/ywft-ultramagnetic-light.css'
import '../public/main.css'
import '../public/meris_enzo.css'
import HeaderNav from '../components/header'
// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return (<div className="main">
		<HeaderNav />
		<Component {...pageProps} />
	</div>)
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});