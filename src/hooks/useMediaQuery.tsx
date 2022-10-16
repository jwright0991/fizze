import {useEffect, useState } from 'react';

const watch = (query:string) => {return window.matchMedia(query)}
const mapToObject = (arr:any[], transform:(value:any)=>any) => arr.reduce((a,b)=> (a[b]=transform(b),a),{});
/**
 *  Curried Function
 *  Sets a value if a media query matches a watcher 
 * @param watcher 
 * @param set setter function from React.UseState
 * @param breakpoint string that represents the breakpoint
 */
const setIfMatch = (watcher:any) => (set:any) => (breakpoint:any) => () => { watcher.matches && set(breakpoint)}
type Breakpoint = string 
type Watcher = {
    watcher:  MediaQueryList,
    breakpoint: Breakpoint
}
const getInitialBreakpoint = (reduced:Watcher, curr:Watcher): Watcher => curr.watcher.matches ? curr : reduced;

interface Listeners {
    [key:string]: () => void
}
interface QueryValues {
    [key:string]: any
}
interface MediaQueries {
    [key:string]: string
}

/**
 * Returns a value depending on the width of the screen.
 * @param queryValues 
 * @param queries 
 */
export const useMediaQueryValue =(
    queryValues: QueryValues, 
        queries:MediaQueries={
        xs: 'screen and (max-width: 600px)', 
        sm: 'screen and (min-width: 600px) and (max-width: 960px)', 
        md: 'screen and (min-width: 960px) and (max-width: 1280px)',
        lg: 'screen and (min-width: 1280px) and (max-width: 1920px)',
        xl: 'screen and (min-width: 1920px)'
        }
    ) =>{
    const [breakpoints] = useState<string[]>(Object.keys(queries))
    const [watchers] = useState(mapToObject(breakpoints, (value:any)=> watch(queries[value])))
    const [breakpoint, setBreakpoint] = useState<Breakpoint>( breakpoints.map((br:Breakpoint):Watcher =>({watcher:watchers[br], breakpoint: br})).reduce(getInitialBreakpoint).breakpoint);
    const [listeners]:any = useState<Listeners>(mapToObject(breakpoints,(value:any)=> setIfMatch(watchers[value])(setBreakpoint)(value) ))
    const [value, setValue] = useState(queryValues[breakpoint]);
     // When the breakpoint is updated, update 'value' with the appropriate value from queryValues
    useEffect(()=>{
        setValue(queryValues[breakpoint])
    },[breakpoint])

    // For each query watcher, add a listener that updates the breakpoint when the query matches
    useEffect(()=>{
        breakpoints.map((bp:any)=> {watchers[bp].addListener(listeners[bp])})
        return () => {
            breakpoints.map((bp:any)=> {watchers[bp].removeListener(listeners[bp])})
        }
    },[])

    return value;
}