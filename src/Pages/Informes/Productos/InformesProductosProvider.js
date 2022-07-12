import  { createContext, useContext, useState,useCallback,useEffect } from 'react';
import { useLang } from '../../../Contexts/LangProvider';
import { APICALLER } from '../../../Services/api';
import { funciones } from '../../../Functions';

const Contexto = createContext();

function InformesProductosProvider({children}) {
    
    const {lang} = useLang()
    
    const initialDatos = {
        lucro: 0, vendido:0
    }
    const initialLoadings = {
        general:false,
        listas:true
    }
    const initialListas = {
        lista: []
    }
    const initialFechas = {
        desde: funciones.fechaActualYMD(),
        hasta:funciones.fechaActualYMD()
    }

    const [fechas,setFechas] = useState(initialFechas)

    const [loadings,setLoadings] = useState(initialLoadings)
    const [listas,setListas] = useState(initialListas)
    const [datos,setDatos] = useState(initialDatos) 
    
    const getData = useCallback(async()=>{
        setLoadings({listas:true})
        let res = await APICALLER.get({table:"productos_vendidos",include:"productos",on:"id_producto,id_producto_vendido",
        fields:"id_productos_vendido,nombre_producto,fecha_vendido,precio_vendido,costo_producto_vendido,cantidad_vendido",
        where:`fecha_vendido,between,'${fechas.desde} 00:00:00',and,'${fechas.hasta} 23:59:59'`});
        if(res.response==="ok"){
            let result = [...res.results];
            let newresult = [];
            let lucro = 0, costo = 0, vendido = 0,lucro_vendido=0;
            result.forEach(elem => {
                vendido += parseFloat(elem.precio_vendido);
                costo += parseFloat(elem.costo_producto_vendido);
                lucro_vendido = parseFloat(elem.precio_vendido) - parseFloat(elem.costo_producto_vendido); 
                newresult.push({
                    ...elem,lucro_vendido
                })
            });
            lucro = vendido - costo;

            setDatos({lucro,vendido})
            setListas({lista:newresult})

        }else {console.log(res);}
        setLoadings({listas:false})
    },[fechas])
    
    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) {
          getData();
        }
        return () => {
          isActive = false;
          ca.abort();
        };
      }, [getData]);
    
    const values = {
        loadings,lang,listas,fechas,setFechas,funciones,datos
    }
    return (
    <Contexto.Provider value={values}>
        {children}
    </Contexto.Provider> );
}


export function useInformesProductos(){

    const {loadings,lang,listas,fechas,setFechas,funciones,datos} = useContext(Contexto)
    return {loadings,lang,listas,fechas,setFechas,funciones,datos}
}

export default InformesProductosProvider;