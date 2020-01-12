import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConverter'
})
export class TimeConverterPipe implements PipeTransform {

  transform(minutes: number): string {
    const hours: number = Math.floor(minutes / 60);
    const minutesLeft: number = minutes % 60;

    return `${hours} h ${minutesLeft}m`;
  }

}
