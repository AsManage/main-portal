import _ from "lodash";

export const showData = (data: any) => {
  if (_.isNaN(data) || _.isNull(data) || _.isUndefined(data)) return "-";
  else return data;
};
