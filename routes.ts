export interface IRoute {
    slug: string;
    title: string;
}

export const testRoutes: IRoute[] = [
    { slug: "vitebsk", title: "Витебск" },
    { slug: "brest", title: "Брест" },
    { slug: "grodno", title: "Гродно" },
    { slug: "gomel", title: "Гомель" },
    { slug: "minsk", title: "Минск" },
    { slug: "minskcity", title: "город Минск" },
    { slug: "mogilev", title: "Могилев" }
];