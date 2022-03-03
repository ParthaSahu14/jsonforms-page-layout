import React, { Suspense, useEffect } from 'react';
import ReactGridLayout from 'react-grid-layout';
import './App.css';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { PageLayout } from "./Layouts/Dashboard/dashboardLayout";
import { ILayoutComponent } from './ILayout';
import { getReactComponent } from "./Utils/LayoutUtility";

const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(ReactGridLayout.Responsive);


function App() {
  const containerBreakpoints = {
    lg: 1280, md: 992, sm: 767, xs: 480, xxs: 320
  }
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState('lg');
  const [currentLayoutComponent, setCurrentLayoutComponent] = React.useState<ILayoutComponent[]>([]);


  useEffect(() => {
    let components = generateComponentArray();
    setCurrentLayoutComponent(components);
    console.log(currentLayoutComponent);
    //eslint-disable-next-line
  }, [currentBreakpoint]);

  const handleBreakPointChange = (newbreakpoint: string, newcol: number) => {
    setCurrentBreakpoint(newbreakpoint);
  };

  const generateComponentArray = () => {
    let components: ILayoutComponent[] = []
    if (currentBreakpoint) {
      const layoutComponents = PageLayout.layoutComponents;
      switch (currentBreakpoint) {
        case 'lg':
          components = layoutComponents.lg;
          break;
        case 'md':
          components = layoutComponents.md;
          break;
        case 'sm':
          components = layoutComponents.sm;
          break;
        case 'xs':
          components = layoutComponents.xs;
          break;
        default:
          break;
      };
    }
    return components;
  }


  return (

    <div className="App">
      <div
        style={{ backgroundColor: 'lightcyan', height: '100px', textAlign: 'center' }}
      >Header</div>
      {currentBreakpoint ?
        <ResponsiveReactGridLayout
          layouts={PageLayout.layoutBreakpoints}
          measureBeforeMount={true}
          className="layout"
          isDraggable={false}
          isResizable={false}
          margin={[5, 5]}
          breakpoints={containerBreakpoints}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          onBreakpointChange={handleBreakPointChange}
        >
          {currentLayoutComponent.map((item, i) => {
            if (item.comp) {
              let Comp = getReactComponent(item.comp);
              return (
                <div key={item.key} className={item.cssClass}>
                  {/* {React.createElement(item.comp, {}, null)} */}
                  {item.title}- {currentBreakpoint}
                  <Suspense fallback={<div>Loading...</div>}>
                    <Comp />
                  </Suspense>
                </div>
              );
            }
            else {
              return (
                <div key={item.key} className={item.cssClass}>
                  {item.title}- {currentBreakpoint}
                </div>
              );
            }

          })}
        </ResponsiveReactGridLayout>
        : "Loading..."}
    </div>
  );
}

export default App;
