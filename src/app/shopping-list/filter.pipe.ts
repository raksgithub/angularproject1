import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../header/shared/ingredients.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString?: string, filterProp?: string): any {
    if(value.length === 0 || filterString === "") {
      return value;
    }
    let filter = new RegExp(filterString);
    const filteredServers = [];
    value.forEach((server) => {
      if(filter.test((server[filterProp] as string).toLocaleLowerCase())) {
        filteredServers.push(server);
      }
    });
    return filteredServers;
  }

}
