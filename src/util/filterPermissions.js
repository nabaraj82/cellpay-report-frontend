import { privateRoutes } from "../routes/privateRoutes";

export const filterPermissions = (permissions, nav_items) => {
  return nav_items.map((screen) => {
    if (screen.to === privateRoutes.base) {
      return screen;
    }
    if (!permissions || Object.keys(permissions).length === 0) {
      return null;
    }
    if (!screen.children && screen.screenName) {
      return permissions[screen.screenName] ? screen : null;
    }
    if (screen.children) {
      const filteredModules = screen.children.filter((module) => {
        return (
          screen?.screenName &&
          module?.moduleName &&
          screen.screenName in permissions &&
          permissions[screen?.screenName][module?.moduleName]
        );
      });

      if (filteredModules.length > 0) {
        return {
          text: screen.text,
          path: screen.path,
          Icon: screen.Icon,
          screenName: screen.screenName,
          children: filteredModules,
        };
      }
    } else {
      return screen;
    }
    return null
  }).filter((c) => !!c);
};
