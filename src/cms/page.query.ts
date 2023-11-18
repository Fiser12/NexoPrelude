
import { match } from 'path-to-regexp';
import { Optional } from '../core';
import { Page, PageContent } from './page.model';

interface IRoutePageGeneratorParams {
  lang: string
}

type AsyncFunction = (props: IRoutePageGeneratorParams) => Promise<Page<PageContent>>;
type IPageResolver<T extends Key> = Record<T, AsyncFunction>;

export type Key = string | number | symbol;
export type IRoutes<T extends Key> = Record<T, string>;

export type RoutesDefinitions<T extends Key> = {
    [locale: string]: IRoutes<T>;
    default: IRoutes<T>;
}

export type AsyncPageRoutes<T> = {
  [K in keyof T]: AsyncFunction;
};

export const buildPageLoader = <T extends Key>(routesDefinition: RoutesDefinitions<T>, pageByRoute: IPageResolver<T>) => {
  return async (pathname: string, lang: string): Promise<Optional<Page<PageContent>>> => {
      const routesDictionary = routesDefinition[lang] ?? routesDefinition.default;
      const key = findRouteKey<T>(routesDictionary, pathname);
      if (!key) return undefined;

      const foundRoutes = Object.entries(routesDictionary).flatMap(([key, routePattern]) => {
          const matcher = match(routePattern as string, { decode: decodeURIComponent });
          const matchResult = matcher(pathname);
          return matchResult ? [{ key, params: matchResult.params }] : [];
      });
      const foundRoute = foundRoutes[0];

      if (!foundRoute) return undefined;

      const pageParams = { lang, ...foundRoute.params };
      return pageByRoute[key](pageParams);
  };
}

export const findRouteKey = <T extends Key>(routes: IRoutes<T>, pathname: string): T | undefined => {

  for (const [key, routePattern] of Object.entries(routes)) {
      const matcher = match(routePattern as string, { decode: decodeURIComponent });
      if (matcher(pathname)) {
          return key as T;
      }
  }
  return undefined;
};

