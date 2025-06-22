import { Optional } from "../core/optional.type";
import { ComponentUtilitiesSeo } from "./meta.model";

export interface PageContent {  
    __typename: string;
}
  
export type Page<T extends PageContent> = {
    pageId?: string;
    title: String;
    content: Array<T>;
    SEO: Optional<ComponentUtilitiesSeo>;
    locale?: "es" | "eu";
    publishedAt?: Optional<Date>;
    showFooter: Boolean;
};
