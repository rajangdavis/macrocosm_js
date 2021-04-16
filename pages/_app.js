import dynamic from "next/dynamic";
import '../public/main.css'
import '../public/knobs.css'
// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});