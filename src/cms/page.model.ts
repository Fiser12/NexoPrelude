import { Optional } from "../optional.type";
import { ComponentUtilitiesSeo } from "./meta.model";

export interface PageContent {  

}
  
export type Page<T extends PageContent> = {
    title: String;
    content: Array<T>;
    SEO: Optional<ComponentUtilitiesSeo>;
    locale?: "es" | "eu";
    publishedAt?: Optional<Date>;
    showFooter: Boolean;
};
