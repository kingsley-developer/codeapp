"use client"
import ReactDOM from 'react-dom/client'
import "./Components/declarefiles/declaremodules.d.ts"
import App from './App.tsx'
import "./assets/globalcss/headers.css"
import "./assets/globalcss/global.css"
import {Store} from "./codeapp-redux-store/store.ts"
import { Provider } from "react-redux"
import {transitions, positions, Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    transition: transitions.FADE
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={Store}>
        <AlertProvider template={AlertTemplate} {...options}>
        <App />
        </AlertProvider>   
    </Provider>
)
