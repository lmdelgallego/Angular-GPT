import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SelectableGridComponent } from "@components/slectable-grid/selectable-grid.component";

@Component({
  selector: "app-audio-to-text-page",
  standalone: true,
  imports: [CommonModule, SelectableGridComponent],
  templateUrl: "./audioToTextPage.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  handleSelectionChange(selection: string[]): void {
    console.log("Selected items:", selection);
  }
}
