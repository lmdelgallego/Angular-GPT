import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [
    RouterModule,
  ],
  template: `
    <a
      class="flex justify-center items-center hover:bg-gray-800 rounded-md transition-colors"
      [routerLink]="path"
      routerLinkActive="bg-gray-800"
    >
      <i class="mr-4 text-indigo-400 text-2xl" [class]="icon"></i>
      <div class="flex flex-col flex-grow">
        <span class="text-lg text-white font-semibold">{{ title }}</span>
        <span class="text-sm text-gray-400">{{ description }}</span>
      </div>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItemComponent {

  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) path!: string;


}
