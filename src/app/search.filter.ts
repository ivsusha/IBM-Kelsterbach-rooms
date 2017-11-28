import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
    transform(items: any[], criteria: any): any {
        return items.filter(item => {
            if(criteria == undefined) return false;
           // tslint:disable-next-line:prefer-const
           for (let key in item ) {
             if(key== 'geb'){ 
             if (('' + item[key]).toUpperCase().includes(criteria.toUpperCase())) {
                return true;
             }
            }
           }
           return false;
        });
    }
}