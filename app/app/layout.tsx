import AppWrapper from "./app_wrapper";
import GrapholioContextProvider from "./grapholio_context";

interface IappLayout {
    visual : React.ReactNode ,
    dashboard : React.ReactNode ,
}
export default function appLayout ({visual,dashboard}:IappLayout){
    return (
        <GrapholioContextProvider>
        <AppWrapper>
            <div className="grid grid-cols-12 divide-x-2  divide-green-600">
                {dashboard}
                {visual}
            </div>
        </AppWrapper>
        </GrapholioContextProvider>
    )
}