import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  ChatMessageComponent,
  MyMessageComponent,
  TypingLoaderComponent,
  TextMessageSelectEvent,
  TextMessageBoxSelectComponent,
} from "@components/index";
import { Message } from "@interfaces/message.interface";
import { OpenAiService } from "app/presentation/services/openai.service";

@Component({
  selector: "app-text-to-audio-page",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: "./textToAudioPage.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public opneAiService = inject(OpenAiService);

  public voices = signal([
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ]);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent) {
    const message = `${selectedOption} - ${prompt}`;

    this.messages.update((prev) => [...prev, { text: message, isGpt: false }]);
    this.isLoading.set(true);

    this.opneAiService
      .textToAudio(prompt, selectedOption)
      .subscribe(({ message, audioUrl }) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { text: message, isGpt: true, audioUrl },
        ]);
      });
  }
}
