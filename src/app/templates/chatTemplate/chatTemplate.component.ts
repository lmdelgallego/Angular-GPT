import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  TypingLoaderComponent,
  MyMessageComponent,
  ChatMessageComponent,
  TextMessageBoxComponent,
  TextMessageSelectEvent,
} from "@components/index";
import { Message } from "@interfaces/message.interface";
import { OpenAiService } from "app/presentation/services/openai.service";

@Component({
  selector: "app-chat-template",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: "./chatTemplate.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public opneAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log({ prompt });
  }

  handleMessageWithSelect(event: TextMessageSelectEvent) {
    console.log({ event });
  }
}
