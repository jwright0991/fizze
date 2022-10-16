import * as React  from 'react';
import  * as CSS from 'csstype';

interface GridProps {
    children?:any;
    direction?: CSS.FlexDirectionProperty;
    wrap?:CSS.FlexWrapProperty;
    columnSpacing?:number;
    rowSpacing?:number;
    justifyContent?: string;
    spanContainer?:boolean;
    height?:string;
    style?:any;
    id?:any;
    events?:any;
    className?:string;
}
const GridThemeContext = React.createContext({columnSpacing: 0,rowSpacing: 0});

export const Grid: React.FunctionComponent<GridProps> = ({
    children,
    direction,
    wrap,
    columnSpacing=0,
    rowSpacing=0,
    justifyContent='flex-start',
    spanContainer=false,
    height,
    style,
    events,
    className,
    id
}) => {
    const _style: any = {
        display: 'flex',
        flexDirection: direction || 'row',
        flexWrap: wrap || 'no-wrap',
        boxSizing: 'border-box',
        justifyContent,
        height: spanContainer && '100%' || height || 'auto',
        ...style,
    };
    const grid_theme = {
        columnSpacing,
        rowSpacing,
    };
    return (
        <div
        style={_style}
        className={className}
        id={id}
        >
        <GridThemeContext.Provider value={grid_theme} {...events}>
            {children}
        </GridThemeContext.Provider>
        

        </div>
    )
}

interface GridItemProps {
    children?:any;
    span?:number;
    basis?:number;
    shrink?:number;
    grow?:number;
    px?:number;
    py?:number;
    style?:React.CSSProperties;
    events?:any;
    id?:string;
    className?:string;
}

export const GridItem: React.FunctionComponent<GridItemProps> = ({
    children,
    span=12,
    basis=12,
    shrink=0,
    grow=0,
    px,
    py,
    style,
    events,
    id,
    className,
}) => {
    const {columnSpacing, rowSpacing} = React.useContext(GridThemeContext);
    const _style:any = {
        padding: `${py}px ${px}px`,
        ...style,
        margin:`${rowSpacing ||0}px ${columnSpacing || 0}px`,
        boxSizing: 'border-box',
        flex: `${grow} ${shrink} calc(${(span/basis) * 100}%  - ${columnSpacing * 2}px)`,
    }
    const props = {
        style: _style,
        className,
        id,
        ...events,

    }
    return (
        <div
        {...props} 
        >{children}</div>
    )
}