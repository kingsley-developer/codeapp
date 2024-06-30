import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./assets/globalcss/headers.css"
import "./assets/globalcss/global.css"
import {Store} from "./codeapp-redux-store/store.ts"
import {Provider} from "react-redux"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={Store}>
    <App />
    </Provider>
)
